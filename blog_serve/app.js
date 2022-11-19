const express = require('express')
const app = express()
module.exports = app
const axios = require('axios')
const port = 3000
const path = require('path')
//配置静态资源的开放
app.use(express.static(path.join(__dirname,'public')))
//配置请求参数的获取
app.use(express.urlencoded({extended:false}))
app.use(express.json())
//连接数据库
require('./database/connect')
//导入和用户有关的路由
require('./router/user')
//导入和文章有关的路由
require('./router/art')
//导入和留言有关的路由
require('./router/message')
//导入和评论有关的路由
require('./router/comment')

app.get('/api/text', async (req,res)=>{
const {data} = await axios.get('http://api.lkblog.net/ws/api.php')
res.send(data)
})
app.listen(port, () => console.log(`博客项目在 ${port}!`))