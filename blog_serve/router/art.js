const app = require('../app')
const formidable = require('formidable');
const path = require('path')
const Text = require('../database/Text');
const { set } = require('../app');

//图片上传
app.post('/api/upload',async(req,res)=>{
  const form = formidable({
    keepExtensions:true,
    uploadDir:path.join(__dirname,'../','public','upload')
   });
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.send({
        code:202
      })
    }
  res.send({
    code:200,
    url:files.file.filepath.split('public')[1]
  })
  })
})
//文章上传
app.post('/api/textupload',async(req,res)=>{
  try{
    req.body.registration = +new Date()
  const text = await Text.create(req.body)
  res.send({
    code:200
  })
  }catch(err){
    res.send({
      code:202
    })
  }
})
//渲染文章列表
app.get('/api/texttable',async(req,res)=>{
  const {page,size,search,sort,label} = req.query
  const total = await Text.find({title:{$regex:search}}).count()
  try{
    let Artsort ='-registration'
    if(sort == 'hot'){
      Artsort = '-readcound'
    }
    let filterobj = {title:{$regex:search}}
    if(label && label.length > 0){
      filterobj.label = {$in:[label]}
    }
    const text = await Text.find(filterobj).sort(Artsort).limit(size).skip((page - 1)*size).populate('author')
    res.send({
      code:200,
      text,
      total
    })
  }catch(err){
    res.send({
      code:202
    })
  }

})
//删除文章
app.delete('/api/text',async(req,res)=>{
  const{id} = req.query
  try{
    const party = await Text.findOneAndDelete({_id:id})
    res.send({
      code:200
    })
  }catch(err){
    res.send({
      code:202
    })
  }
})
//修改文章
app.put('/api/textupload',async(req,res)=>{
  const  {id,form} = req.body
  try{
    const data = await Text.findOneAndUpdate({_id:id}, form)
    res.send({
      code:200
    })
  }catch(err){
    res.send({
      code:202
    })
  }
})
//渲染总览文章页面
app.get('/api/allArt', async(req,res)=>{
  try {
    const art = await Text.find().select('title registration').sort('-registration')
    res.send({
      code:200,
      art
    })
  } catch (error) {
    res.send({
      code:202,
      art:[]
    })
  }
})
//获取文章详情
app.post('/api/artdetail',async(req,res)=>{
  const {artid} = req.body
  try {
    const data = await Text.findOne({_id:artid}).populate('author')
    data.readcound++
    await data.save()
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
//获取文章标签
app.get('/api/art/tag',async(req,res)=>{
  try {
    const tag = await Text.find().select('label -_id')
    const tags = []
    tag.forEach(item => {
      item.label.forEach(tag =>{
        tags.push(tag)
      })
    });
    const label = [...new Set(tags)]
    res.send({
      code:200,
      label
    })
  } catch (err) {
    res.send({
      code:202
    })
  }
})