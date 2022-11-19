const mongoose = require('mongoose')

const cnmmentSchema = new  mongoose.Schema({
textarea:String,
 artid:{
  type:mongoose.SchemaTypes.ObjectId,
  ref:'Text'
},
 userid:{
  type:mongoose.SchemaTypes.ObjectId,
  ref:'User'
},
 registration:Number,
})
const Comment = mongoose.model('Comment',cnmmentSchema)

//导出
module.exports = Comment