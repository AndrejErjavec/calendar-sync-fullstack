const errorHandler = require('../middleware/errorMiddleware');
const User = require('../models/UserModel');

const getUserCalendars = async (req, res) => {
  const calendars = await User.findById(req.user.id).select('calendar_urls');
  res.status(200).json(calendars);
}


const getUserSubjects = async (req, res) => { 
  const subjects = await User.findById(req.user.id).select('subjects');
  res.status(200).json(subjects);
}


const addCalendarUrl = async (req, res) => {
  const {url} = req.body;
  if (!url) {
    return errorHandler({req, res, status: 400, err: "URL not specified"});
  }
  const user = await User.findById(req.user.id);
  if (user.calendar_urls.includes(url)) {
    return errorHandler({req, res, status: 400, err: "URL already added"});
  }

  const newUrl = await User.updateOne({_id: req.user.id}, {$push: {calendar_urls: url}});
  if(!newUrl) {
    return errorHandler({req, res, status: 400, err: "Failed to add new calendar URL"});
  }
  res.status(200).json(user);
}


const addSubject = async (req, res) => {
  const {subject} = req.body;
  if (!subject) {
    return errorHandler({req, res, status: 400, err: "Subject not specified"});
  }

  const user = await User.findById(req.user.id);
  if (user.subjects.includes(subject)) {
    return errorHandler({req, res, status: 400, err: "Subject already added"});
  }

  const newSubject = await User.updateOne({_id: req.user.id}, {$push: {subjects: subject}});
  if (!newSubject) {
    return errorHandler({req, res, status: 400, err: "Failed to add subject"});
  }
  res.status(200).json(subject);
}


const removeCalendarUrl = async (req, res) => {
  const url = req.params.url;

  const user = await User.findById(req.user.id);
  if (!user.calendar_urls.includes(url)) {
    return errorHandler({req, res, status: 400, err: "URL not found"});
  }
  
  await User.findOneAndUpdate({_id: req.user.id}, {$pull: {calendar_urls: url}});
  res.status(200).json(url);
}


const removeSubject = async (req, res) => {
  const subject = req.params.subject;

  const user = await User.findById(req.user.id);
  if (!user.subjects.includes(subject)) {
    return errorHandler({req, res, status: 400, err: "Subject not found"});
  }
  
  await User.findOneAndUpdate({_id: req.user.id}, {$pull: {subjects: subject}});
  res.status(200).json(subject);
}

module.exports = {
  getUserSubjects,
  getUserCalendars,
  addSubject,
  addCalendarUrl,
  removeCalendarUrl,
  removeSubject
}