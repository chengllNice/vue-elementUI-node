let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let activePublicSchema = new Schema({
  name:String,
  activeClassify:{
    activeClassifyData:Array,
    selectActiveClassify:Object
  },
  activeTag:{
    type:Array,
    default:{
      name:String,
      index:Number
    }
  },
  activeDateTime:{
    startDateTime:String,
    endDateTime:String
  },
  signDateTime:{
    startDateTime:String,
    endDateTime:String
  },
  address:{
    province:String,
    city:String,
    district:String,
    village:String
  },
  perNum:Number,
  coverImg:String,
  introduce:String,
  views:{
    type:Number,
    default:0
  },
  sign:{
    type:Number,
    default:0
  },
  wait:{
    type:Number,
    default:0
  }
});

module.exports = mongoose.model('activepublic',activePublicSchema)
