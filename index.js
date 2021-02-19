const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const { connectToDB } = require('./models/server');
const bodyParser = require('body-parser');
const entryRoutes = require('./routes/hub');

app.use(morgan('dev'));

connectToDB();

const whiteList = new Set(['http://localhost:1020']);

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.has(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Hey So This Isnt Allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

// routing
app.use(bodyParser.json());
app.use('/', entryRoutes);

//Listening Port
const port = process.env.PORT || 4050;
app.listen(port, () => {
  console.log(
    `A ${process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : 'NO ENV FILE'} Node JS Server is listening on port ${port}`
  );
});
