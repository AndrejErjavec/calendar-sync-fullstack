const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI, {}, (err) => {
    if (err) console.log(err);
    console.log(`connection to database established`);
  });
}

module.exports = connectDB;