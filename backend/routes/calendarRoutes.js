const express = require('express');
const router = express.Router();
const {getCalendar, getUserSubjects, getUserCalendars, getSubjects, addSubject, addCalendarUrl, removeCalendarUrl, removeSubject} = require('../controllers/calendarController');

const {protect} = require('../middleware/authMiddleware');

router.get('/', protect, getCalendar);
router.get('/calendars', protect, getUserCalendars);
router.get('/titles', protect, getSubjects);
router.get('/subjects', protect, getUserSubjects);
router.post('/calendars', protect, addCalendarUrl);
router.post('/subjects', protect, addSubject);
router.delete('/calendars/:url', protect, removeCalendarUrl);
router.delete('/subjects/:subject', protect, removeSubject);

module.exports = router;