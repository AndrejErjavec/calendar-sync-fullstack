const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const app = express();

const port = process.env.PORT || 8080;

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));

const authRoutes = require('./routes/authRoutes'); 
const calendarRoutes = require('./routes/calendarRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/calendar', calendarRoutes);

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Listening on port ${port}`);
});