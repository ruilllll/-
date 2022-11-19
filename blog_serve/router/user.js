//用户有关的路由
//导入用户的集合
const app = require('../app')
const User = require('../database/User')
var jwt = require('jsonwebtoken')
const Text = require('../database/Text')
//用户注册
app.post('/api/user',async(req,res)=>{
try{
  //判断用户是否存在
  const oldUser = await User.findOne({account:req.body.account})
  if(oldUser){
    //已注册
    res.send({
      code:202,
      msg:'该用户已注册'
    })
    return
  }
 req.body.registration = +new Date()
const user = await User.create(req.body)
if(user){
  res.send({
    code:200
  })
}else{
  res.send({
    code:202
  })
}
}catch(err){
  res.send({
    code:202
  })
}
})
//用户登录
app.post('/api/login',async(req,res)=>{
  try{
    //核对用户
const user = await User.findOne({account:req.body.account})
if(user === null){
res.send({
    code:202,
    msg:'该用户不存在'
  })
}
//核对密码
if(req.body.password !== user.password){
  res.send({
      code:202,
      msg:'密码错误'
    })
  }
  //生成token令牌 分发给用户
  const token = jwt.sign({ id:user._id }, 'blog');
  res.send({
    code:200,
    user,
    token
  })
  }catch(err){
    res.send({
      code:202
    })
  }
})
//查询单个用户
app.get('/api/User',async(req,res)=>{
const{id} = req.query
  try{
 const user = await User.findOne({_id:id})
 res.send({
  code:200,
  user
 })
  }catch(err){
res.send({
  code:202,
})
  }
 ;
})
//用户登陆状态
app.get('/api/checklogin',async(req,res)=>{
  const token = req.headers.token
  if(!token) return res.send({code:202,msg:'未登录'})
  try{
 const id = jwt.verify(token, 'blog')
 const user = await User.findOne({_id:id.id})
 res.send({
  code:200,
  user
 })
  }catch(err){
res.send({
  code:202,
  msg:'token不存在'
})
  }
 ;
})
//渲染后台用户表格
app.get('/api/usertable', async(req,res)=>{
  const {page,size,search} = req.query
  const total = await User.find({nickname:{$regex:search}}).count()
  try{
    const user = await User.find({nickname:{$regex:search}}).limit(size).skip((page - 1)*size)
    res.send({
      code:200,
      user,
      total
    })
  }catch(err){
    res.send({
      code:202
    })
  }
})
//删除用户
app.delete('/api/user', async(req,res)=>{
  const{id} = req.query
  try{
    const party = await User.findOneAndDelete({_id:id})
    await Text.deleteMany({author:id})
    res.send({
      code:200
    })
  }catch(err){
    res.send({
      code:202
    })
  }
})
//修改用户
app.put('/api/user', async(req,res)=>{
  const  {id,form} = req.body
  try{
    const data = await User.findOneAndUpdate({_id:id}, form)
    res.send({
      code:200
    })
  }catch(err){
    res.send({
      code:202
    })
  }
})
//添加用户收藏
app.put('/api/user/fundlist',async(req,res)=>{
  const{userid,artid} = req.body
  try {
  const data = await User.findOne({_id:userid})
  const artfund = await Text.findOne({_id:artid})
  artfund.collectioncound++
  await artfund.save()
  data.fundList.push(artid)
  await data.save()
  res.send({
    code:200,
    fundList:data.fundList
  })
  } catch (err) {
    res.send({
      code:202
    })
  }
})
//取消用户收藏
app.delete('/api/user/fundlist',async(req,res)=>{
  const{userid,artid} = req.query
  try {
  const data = await User.findOne({_id:userid})
  const index = data.fundList.indexOf(artid)
  data.fundList.splice(index,1)
  const artfund = await Text.findOne({_id:artid})
  if(artfund.collectioncound !== 0){
    artfund.collectioncound--
    await artfund.save()
  }

  await data.save()
  res.send({
    code:200,
  })
  } catch (err) {
    res.send({
      code:202
    })
  }
})
//请求用户收藏渲染列表
app.get('/api/fundlist',async(req,res)=>{
  const{userid, page, size, search } = req.query
  try {
    const data = await User.findOne({_id:userid}).populate('fundList')
    let currentsearch = data.fundList
    if(search){
      currentsearch = currentsearch.filter(item=>item.title.includes(search))
    }
    const currentpage = (page - 1) *size
    const list = currentsearch.slice(currentpage,currentpage + size)
    res.send({
      code:200,
      list:list,
      total:currentsearch.length
    })
  } catch (err) {
    res.send({
      code:202
    })
  }
})