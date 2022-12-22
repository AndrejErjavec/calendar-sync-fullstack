const fetch = require('node-fetch');
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const User = require('../models/UserModel');
const {deleteEventOccurances, getEventsTitles} = require('./icalutils/ical');

const browser_path = process.env.NODE_ENV === 'production' ? process.env.PROD_BROWSER_PATH : process.env.DEV_BROWSER_PATH;
if (!browser_path) {
  throw new Error("Path to the browser must be specified");
}

async function getTitles(page, filterId) {
  const subjectFilter = filterId.split(';', 4).pop();
  if (subjectFilter !== '0') {
    const ids = subjectFilter.split(',');
    return await page.evaluate((ids) => {
      return ids.map(id => document.querySelector(`tr[data-rk="${id}"]`).querySelector('span').innerHTML);
    }, ids);
  }
  return null;
}

async function clickExport(page) {
  await page.evaluate(() => {
    const node = document.querySelector('a[title="Izvoz celotnega urnika v ICS formatu  "]');
    if (node == null) {
      throw 'Export button not found';
    }
    const handler = node.getAttributeNode('onclick').nodeValue;
    node.setAttribute('onclick', handler.replace('_blank', '_self'));
    node.click();
  });
}

function setupDownloadHook(page, cookies) {
  return new Promise(resolve => {
    page.on('request', async request => {
      // console.log(request.url());

      if (request.url() === 'https://www.wise-tt.com/wtt_up_famnit/TextViewer') {
        const response = await fetch(request.url(), {
          headers: {
            ...request.headers(),
            'cookie': cookies.map(cookie => `${cookie.name}=${cookie.value}`).join(';'),
          }
        });
        const data = await response.text();
        resolve(data);
      } else {
        request.continue(); // Redirect 302
      }
    });
  });
}

async function fetchCalendar(url) {
  const browser = await puppeteer.launch({executablePath: browser_path, headless: true, args: ['--no-sandbox']
});
  try {
    const page = await browser.newPage();
    await page.goto(url);
  
    await page.setRequestInterception(true);
    const cookies = await page.cookies();
    const download = setupDownloadHook(page, cookies);
    const titles = await getTitles(page, url.split('=')[1]);

    await clickExport(page);
    let data = await download;

    if (titles != null) {
      data = data.replace(/\s*BEGIN:VEVENT[\s\S]*?END:VEVENT\s*/g, event => {
        return titles.some(title => event.includes(`SUMMARY:${title}`)) ? event : '';
      });
    }

    const position = data.indexOf('BEGIN:VEVENT');
    data = data.substr(0, position) + 'X-WR-TIMEZONE:Europe/Ljubljana\n' + data.substr(position);
    return data;
  } finally {
    await browser.close();
  }
}

const fetchAll = async (urls) => {
  let calendars = [];
  await Promise.all(urls.map(async (url) => {
    const cal = await fetchCalendar(url);
    calendars.push(cal);
  }))
  return calendars;
}

const formatCalendars = (calendars) => {
  let output = "";
  for (let i = 0; i < calendars.length; i++) {
    if (i != 0) {
      // calendars[i] = calendars[i].replace('BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:WISE TIMETABLE\nX-WR-TIMEZONE:Europe/Ljubljana', '');
      calendars[i] = calendars[i].replace('BEGIN:VCALENDAR', '');
      calendars[i] = calendars[i].replace('VERSION:2.0', '');
      calendars[i] = calendars[i].replace('PRODID:WISE TIMETABLE', '');
      calendars[i] = calendars[i].replace('X-WR-TIMEZONE:Europe/Ljubljana', '');
    }
    if (i != calendars.length - 1) {
      calendars[i] = calendars[i].replace('END:VCALENDAR', '');
    }
    output += calendars[i];
  }
  return output;
}

const getIcal = async (urls, subjects) => {
  const calendars = await fetchAll(urls);
  const formatted = formatCalendars(calendars);
  const filtered = deleteEventOccurances(formatted, subjects);
  return filtered;
}

const getSubjectsFromICal = async (urls) => {
  const calendars = await fetchAll(urls);
  const formatted = formatCalendars(calendars);
  return getEventsTitles(formatted);
}

const saveTxt = (text) => {
  fs.writeFile('calendars.txt', text, err => {
    if (err) console.log(err);
    return;
  });
}


module.exports = {
  getIcal,
  getSubjectsFromICal,
}