//创建留言集合并导出去
const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    email:String,
    name:String,
    phone:Number,
    textarea:String
})
const Message = mongoose.model('Message',messageSchema)

//导出
module.exports = Message