const express = require('express');
const router = express.Router();
const {getCalendar, getEventTitles} = require('../controllers/calendarController');
const {protect} = require('../middleware/authMiddleware');

router.get('/up', (req, res) => { 
  res.set('content-type', 'text/plain');
  res.send('yes');
});

router.get('/', protect, getCalendar);
router.get('/events', protect, getEventTitles);

module.exports = router;