const mongoose = require('mongoose');

console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('mongoose is connected');
});

connection.on('error', () => {
  console.log('error');
});

module.exports = connection;
