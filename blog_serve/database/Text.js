//创建文章集合并导出去
const mongoose = require('mongoose')

const textSchema = new  mongoose.Schema({
  title:String,
  author:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },
  describe:String,
  label:[String],
  currentImgUrl:String,
  html:String,
  registration:Number,
  readcound:{
    type:Number,
    default:0
  },
  collectioncound:{
    type:Number,
    default:0
  },
  commentcound:{
    type:Number,
    default:0
  },
  reviewcount:{
    type:Number,
    default:0
  }
})
const Text = mongoose.model('Text',textSchema)
// Text.updateMany({registration:+new Date()})
// .then(()=>{
//   console.log('更新完成');
// })
//导出
module.exports = Text