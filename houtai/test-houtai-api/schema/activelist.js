let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let activeListSchema = new Schema({
  name:String,
  classify:{
    name:String,
    index:Number
  },
  status:{
    name:String,
    index:Number
  },
  view:Number,
  sign:Number,
  wait:Number,
  selected:Boolean
});

module.exports = mongoose.model('activelist',activeListSchema)
