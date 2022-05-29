const mongoose = require('mongoose');
const User = require('./User');
const { Schema, SchemaTypes, model } = mongoose;

const listSchema = new Schema({
  owner: String,
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
  items: [{
    title: String,
    description: String,
    completed: Boolean,
  }]
});

const List = model('List', listSchema);
module.exports = List;