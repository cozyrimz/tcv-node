const mongoose = require('mongoose');

const mongoURI =
  'mongodb+srv://tcvapp:9PPp5wvMdDccuUab@cluster0.25u1s.mongodb.net/TexasCovidVaccine?retryWrites=true&w=majority';
const connectToDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  console.log('Connected To  Mongo DB Server');

  mongoose.connection.on('error', err => {
    console.error('Error connecting to Mongo DB server');
    console.error(err.message);
  });
};

module.exports = {
  connectToDB,
};
