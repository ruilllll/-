const app = require('../app')
const Comment = require('../database/Comment')
const User = require('../database/User')
const Text = require('../database/Text')

//上传评论
app.post('/api/comments', async(req,res)=>{
  const {artid,userid,textarea} = req.body
  try {
    const content={
      artid:artid,
      userid:userid,
      textarea:textarea,
      registration:+new Date()
    }
    const data = await Comment.create(content)
    if(data){
      const art = await Text.findOne({_id:artid})
      art.reviewcount++
      await art.save()
      res.send({
        code:200,
        data
      })
    }else{
      res.send({
        code:202
      })
    }
  } catch (err) {
    res.send({
      code:202
    })
  }
})
//请求数据渲染文章详情评论区
app.get('/api/commentdata',async(req,res)=>{
  const {artid }= req.query
  try {
    const data = await Comment.find({artid:artid}).populate('userid')
    res.send({
      code:200,
      data
    })
  } catch (err) {
    res.send({
      code:202
    })
  }
})
//请求评论数据渲染后台列表
app.get('/api/commentsData',async(req,res)=>{
  const{page, size} = req.query
  try {
    const total = await Comment.find().count()
    const user = await Comment.find().populate('userid').populate('artid').limit(size).skip((page - 1)*size)
    res.send({
      code:200,
      user,
      total
    })
  } catch (err) {
    res.send({
      code:202
    })
  }
})
//删除评论
app.delete('/api/comment',async(req,res)=>{
  const {id} = req.query
  try {
    const data = await Comment.deleteOne({_id:id})
    res.send({
      code:200
    })
  } catch (err) {
    res.send({
      code:202
    })
  }
})