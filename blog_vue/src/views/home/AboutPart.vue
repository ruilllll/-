<template>
  <div class="resume">
    <div class="heard">
        <div class="img">
          <img src="../../assets/zhaopian.jpg" alt="">
        </div>
        <div class="personalInformation">
          <h1 class="name">刘瑞林</h1>
          <span>男</span>
          <span>21岁</span>
          <span>应届生</span>
          <span>专科</span>
          <span>195****1533</span>
          <span>lrl121800@163.com</span>
          <a>WEB前端开发</a>
        </div>
    </div>
    <div class="content">
      <div class="Education">
        <div class="title">
          <div class="left">
            <div class="small"></div>
          </div>
          <div class="right">
            <h2>教育背景</h2>
          </div>
        <div class="TextContent">
          <span class="time" style="font-weight:600">2020/09-至今</span>
          <span class="university" style="font-weight:600">山东外事职业大学</span>
          <span class="major" style="font-weight:600">专科-软件与信息服务</span>
        </div>
      </div>
      </div>
      <!-- <div class="workExperience">
        <div class="title">
          <div class="left">
            <div class="small"></div>
          </div>
          <div class="right">
            <h2>工作经历</h2>
          </div>
          <h3>无</h3>
        </div>
      </div> -->
      <div class="ProjectExperience">
        <div class="title">
          <div class="left">
            <div class="small"></div>
          </div>
          <div class="right">
            <h2>项目经历</h2>
          </div>
          <div class="TextContent">
          <span class="time" style="font-weight:600">2022/09/09—2022/09/27</span>
          <span class="entryname" style="font-weight:600">基金项目</span>
          <h4>项目介绍</h4>
          <p>一个管理基金买入和卖出的网站</p>
          <h4>我的职责：</h4>
          <p>1. 搭建静态网页</p>
          <p>2. 使用node搭建服务器</p>
          <p>3. 使用Ajax请求后端数据来渲染前端页面</p>
          <p>4. 实现前后端的交互效果的编写</p>
          </div>
        </div>
      </div>
      <div class="SelfEvaluation">
        <div class="title">
          <div class="left">
            <div class="small"></div>
          </div>
          <div class="right">
            <h2>自我评价</h2>
          </div>
          <p>1.精通Div+CSS,可以熟练使用搭建项目</p>
          <p>2.精通JavaScript语言</p>
          <p>3.了解Node.js,了解基于Node.js平台的开发框架Express</p>
          <p>4.熟练使用Ajax,能与后端合作完成研发工作，能够解决常见的跨域问题</p>
          <p>5.熟练使用VUE框架进行组件化开发</p>
          <p>6.使用webpack自动构建项目</p>
          <p>7.使用Git管理代码</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style  scoped>
.heard{
  height: 200px;
border-top:20px solid rgb(84, 89, 92) ;
background-color: rgba(255, 255, 255, 0.9);
}
.img{
  width: 130px;
  height: 130px;
  margin: 30px 50px;
  border-radius: 100px;
  background-color: aqua;
}
.img img{
  width: 100%;
  height: 100%;
}
.personalInformation{
  margin-top: -150px;
  margin-left: 200px;
}
.personalInformation span{
  border-right: 1px solid rgb(108, 108, 108);
  margin-right: 5px;
  padding-right: 5px;
}
.name{
  margin-bottom: 10px;
}
.Education .title{
  padding-top: 40px;
}
.title{
  padding: 0 40px;
  padding-bottom:40px;
}
.left{
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: rgb(84, 89, 92);
  border-radius: 40px;
}
.content{
  height: 600px;
  background-color:darkgray;
}
.small{
  position: absolute;
  top:8px;
  left: 8px;
  width: 9px;
  height: 9px;
  background-color: aliceblue;
  border-radius: 15px;
}
.right h2{
  margin-left: 40px;
  padding-bottom: 3px;
  border-bottom: 1px solid #aaa;
}
.TextContent{
  margin-top: 10px;
  font-weight:500;
  font-size: 13px;
}
.university{
  margin: 0  100px;
}
.entryname{
  margin: 0  100px;
}
</style>
