const express = require('express');
const router = express.Router();
const {getCalendar, getEventTitles} = require('../calendar');

router.get('/', (req, res) => { 
  res.redirect('https://github.com/brokenpylons/Calendar');
});

router.get('/up', (req, res) => { 
  res.set('content-type', 'text/plain');
  res.send('yes');
});

router.get('/calendar', getCalendar);
router.get('/events', getEventTitles);

module.exports = router;