const app = require('../app')
const Message = require('../database/Message')

//上传留言
app.post('/api/message', async (req,res)=>{
  try {
    const message = await Message.create(req.body)
    res.send({
      code:200
    })
  } catch (err) {
    res.send({
      code:202
    })
  }
})
//渲染列表
app.get('/api/messagedata',async(req,res)=>{
  const {page,size} = req.query
  const total = await Message.find().count()
  try {
    const data = await Message.find().limit(size).skip((page - 1)*size)
    res.send({
      code:200,
      data,
      total
    })
  } catch (err) {
    res.send({
      code:202
    })
  }
})
//删除留言
app.delete('/api/message',async(req,res)=>{
  const{id} = req.query
  try{
    const party = await Message.findOneAndDelete({_id:id})
    res.send({
      code:200
    })
  }catch(err){
    res.send({
      code:202
    })
  }
})