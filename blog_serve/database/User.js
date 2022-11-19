//创建用户集合并导出去
const mongoose = require('mongoose')

const userSchema = new  mongoose.Schema({
  nickname:String,
  account:String,
  password:String,
  rights:{
    //0是管理员账户，1为普通用户
    type:Number,
    default:1
  },
  registration:Number,
  //用户收藏列表
  fundList:[
    {
      type:mongoose.SchemaTypes.ObjectId,
      ref:'Text'
    }
  ]
})
const User = mongoose.model('User',userSchema)
// User.updateMany({registration:+new Date()})
// .then(()=>{
//   console.log('更新完成');
// })
//导出
module.exports = User