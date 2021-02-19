const mongoose = require('mongoose');

const schemaOptions = {
  collection: 'hubs',
  timestamps: true,
};

const urlSchema = {};

const Hub = mongoose.model(
  'hubs',
  new mongoose.Schema(
    {
      name: {
        type: String,
        index: true,
        require: 'Hub Name is Require',
      },
      city: {
        type: String,
        index: true,
        required: 'City Name is Required',
        enum: ['Austin', 'Houston', 'Dallas', 'San Antonio'],
      },
      address: {
        type: String,
        require: 'A Hub Address is Required',
      },
      zipcode: {
        type: Number,
        require: 'A 5 Digit Zip Code is required',
      },
      doses: {
        type: Number,
      },
      loc: {
        long: Number,
        lat: Number,
      },
      hubType: {
        type: String,
        require: 'Hub Type of Major or Minor is required',
        enum: ['major', 'minor'],
      },
      phone: {
        type: Number,
      },
      url: [{ url: String, key: String }],
    },
    schemaOptions
  )
);

module.exports = { Hub };
