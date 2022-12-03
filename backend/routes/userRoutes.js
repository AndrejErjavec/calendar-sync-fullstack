const express = require('express');
const router = express.Router();
const {getUserSubjects, getUserCalendars, addSubject, addCalendarUrl, removeCalendarUrl, removeSubject} = require('../controllers/userController');

const {protect} = require('../middleware/authMiddleware');

router.get('/calendars', protect, getUserCalendars);
router.get('/subjects', protect, getUserSubjects);
router.post('/calendars', protect, addCalendarUrl);
router.post('/subjects', protect, addSubject);
router.delete('/calendars/:url', protect, removeCalendarUrl);
router.delete('/subjects/:subject', protect, removeSubject);

module.exports = router;