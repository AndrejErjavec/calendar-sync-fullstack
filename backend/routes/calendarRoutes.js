const express = require('express');
const router = express.Router();
const {getCalendar, getSubjects} = require('../controllers/calendarController');
const {protect} = require('../middleware/authMiddleware');

router.get('/up', (req, res) => { 
  res.set('content-type', 'text/plain');
  res.send('yes');
});

router.get('/', protect, getCalendar);
router.get('/subjects', protect, getSubjects);

module.exports = router;