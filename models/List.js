const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const listSchema = new Schema({
  user: String,
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