const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog')
.then(()=>{
  console.log('数据库连接成功');
})
.catch(err=>{
  console.log(err);
})