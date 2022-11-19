<template>
  <div class="EditBox">
   <MySearch @search="handelsearch">
    <template #adduser>
      <el-button type="success" @click="openEdit(1)">添加文章</el-button>
    </template>
   </MySearch>
   <MyTable :list="textlist" :label="artlabel">
    <template #operation="{data}">
      <el-button @click="openModify(data)"  type="primary" icon="el-icon-edit" circle></el-button>
      <el-popconfirm title="这篇文章确定要删除吗(不可找回)" @confirm="deleteText(data._id)">
      <el-button slot="reference"   type="danger" icon="el-icon-delete" circle></el-button>
      </el-popconfirm>
    </template>
   </MyTable>
   <MyPage @PageChange="handleData" :total="total"></MyPage>

   <div class="Edit" v-show="display" :type="0? '添加':'修改'">
    <div class="title" >
      <el-form class="left" :model="form" :rules="rules" ref="form">
        <el-form-item label="文章标题：" prop="title">
          <el-input placeholder="请输入文章标题" v-model="form.title" ></el-input>
        </el-form-item>
        <el-form-item label="文章描述：" prop="describe">
          <el-input  placeholder="请输入文章描述" v-model="form.describe" ></el-input>
        </el-form-item>
        <el-form-item label="文章标签：" prop="label">
          <el-input @change="addTag" placeholder="请输入文章标签" v-model="currentLabel" ></el-input>
          <span class="tags" style="display:block">
            <el-tag
                v-for="(item,index) in form.label"
                :key="index"
                closable
                @close="removeTags(index)"
                type="danger"
                effect="dark">
                {{ item }}
              </el-tag>
          </span>
        </el-form-item>
      </el-form>
      <div class="right">
        <el-upload
        :show-file-list="false"
        :on-success="callback"
          class="upload-demo"
          drag
          action="/api/upload"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <img class="pic"  v-if="currentUrl" :src="currentUrl" alt="">
      </div>
    </div>
    <div class="html">
      <mavon-editor v-model="Artvalue"
      @change = 'change' ref=md @imgAdd="$imgAdd"
      />
    </div>
    <div class="btns">
      <el-button type="warning" @click="outEdit">取消</el-button>
      <el-button type="success" @click="UpLoad('form')">提交</el-button>
    </div>
   </div>

  </div>
 </template>

<script>
import MySearch from '../../components/MySearch.vue'
import MyTable from '../../components/MyTable.vue'
import MyPage from '../../components/MyPage.vue'
export default {
  data () {
    return {
      artlabel: [
        { prop: 'title', label: '标题' },
        { prop: 'author.nickname', label: '作者' },
        { prop: 'describe', label: '描述' },
        { prop: 'label', label: '标签' },
        { prop: 'registration', label: '创建时间' }
      ],
      type: 0,
      total: '',
      textlist: [],
      display: false,
      Artvalue: '',
      currentUrl: '',
      currentLabel: '',
      form: {
        html: '',
        title: '',
        describe: '',
        label: [],
        currentImgUrl: ''
      },
      currentPage: 1,
      currentSize: 5,
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 100, trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入文章描述', trigger: 'blur' },
          { min: 1, max: 100, trigger: 'blur' }
        ],
        label: [
          { type: 'array', required: true, message: '请填写文章标签' }
        ]
      }
    }
  },
  components: {
    MySearch,
    MyTable,
    MyPage
  },
  methods: {
    handelsearch (value) {
      this.currentSearch = value
      this.getTextData(1, 5, value)
      this.$bus.$emit('resePage')
    },
    $imgAdd (pos, $file) {
    // 第一步.将图片上传到服务器.
      const formdata = new FormData()
      formdata.append('file', $file)
      // 这里是你自己发送请求的方法，比如axios
      this.$http({
        url: '/api/upload',
        method: 'post',
        data: formdata,
        headers: { 'html-Type': 'multipart/form-data' }
      }).then((res) => {
        // 这里是上传成功后返回的url，根据自己后端返回请求而定，不是固定的
        const _res = res.data
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, this.$currentimgurl + '/' + _res.url)
      })
    },

    // 删除用户
    async deleteText (id) {
      const { data } = await this.$http.delete(`/api/text?id=${id}`)
      if (data.code !== 200) return this.$message.error('删除失败，请重试')
      this.$message.success('删除成功')
      this.getTextData(this.currentPage, this.currentSize)
    },
    // 打开修改
    openModify (user) {
      this.display = true
      this.accountId = user._id
      this.form = {
        title: user.title,
        describe: user.describe,
        label: user.label
      }
      this.Artvalue = user.html.replace(/\\upload/g, this.$currentimgurl + '/\\upload')
      this.currentUrl = this.$currentimgurl + '/' + user.currentImgUrl
      this.type = 1
    },
    handleData ({ page, size }) {
      this.currentPage = page
      this.currentSize = size
      this.getTextData(page, size, this.currentSearch)
    },
    // 请求文章数据渲染列表
    async getTextData (page = 1, size = 5, search = '') {
      const { data } = await this.$http.get(`/api/texttable?page=${page}&size=${size}&search=${search}`)
      this.textlist = data.text
      this.total = data.total
    },
    // 删除文章标签
    removeTags (index) {
      this.form.label.splice(index, 1)
    },
    // 添加文章标签
    addTag () {
      if (this.form.label.includes(this.currentLabel)) this.$message.error('标签已存在')
      else this.form.label.push(this.currentLabel)
      this.currentLabel = ''
    },
    // 添加文章和修改文章
    UpLoad (form) {
      this.$refs[form].validate(async (valid) => {
        if (!valid) return
        if (valid) {
          if (this.form.currentImgUrl === '') return this.$message.error('请添加文章封面')
          if (this.form.html === '') return this.$message.error('请填写文章内容')
          const reg = new RegExp(this.$currentimgurl + '/', 'g')
          this.form.html = this.form.html.replace(reg, '')
          if (this.type === 0) {
            this.form.author = this.$store.state.user._id
            const { data } = await this.$http.post('/api/textupload', this.form)
            if (!data.code === 200) return this.$message.error('添加失败')
            this.$message.success('添加成功')
          } else {
            const { data } = await this.$http.put('/api/textupload', {
              form: this.form,
              id: this.accountId
            })
            if (!data.code === 200) return this.$message.error('修改失败')
            this.$message.success('修改成功')
          }
          this.form = {
            title: '',
            describe: '',
            label: []
          }
          this.form.html = ''
          this.Artvalue = ''
          this.currentUrl = ''
          this.display = false
          this.getTextData(this.currentPage, this.currentSize)
        }
      })
    },
    // 富文本
    change (value, render) {
      this.form.html = value
    },
    // 图片的回调函数
    callback (res) {
      if (res.code === 200) {
        this.currentUrl = `${this.$currentimgurl}/` + res.url
        this.form.currentImgUrl = res.url
      }
    },
    // 打开修改页面
    openEdit () {
      this.display = true
    },
    // 关闭修改页面并赋空
    outEdit () {
      this.display = false
      this.form = {
        html: '',
        title: '',
        describe: '',
        label: []
      }
      this.Artvalue = ''
      this.currentUrl = ''
    }
  },
  created () {
    this.getTextData(1, 5)
  }
}
</script>

<style>
.el-form-item--small.el-form-item{
  margin-bottom: 0 !important;
}
  .el-form-item__error{
    margin-left: 90px;
    margin-bottom: 20px;
    top:65%
  }
  .btns{
    margin-top: 20px;
  }
  .el-button--small.is-circle{
    margin-right: 8px;
  }
.el-upload-dragger{
  width: 200px;
  height: 170px;
}
.el-popconfirm__main{
  margin-bottom: 10px;
}
.el-popconfirm{
  background-color: #fff;
  box-shadow: 0 0 3px 2px #ccc;
}
</style>
 <style scoped>
  .tags{
    margin: 0 0 0 80px;
  }
  .tags .el-tag{
    margin:0 2px ;
  }
  .right:hover img{
    display:none
  }
  .pic{
    position: absolute;
    top:0;
    right:0;
    width: 200px;
    height: 170px;
  }
  .html{
    margin-top: 60px;
  }
  .EditBox{
    position: relative;
    height: 100%;
  }
.Edit{
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  z-index: 2;
}
.el-input{
  width: 300px;
  margin-bottom: 20px;
}
.Edit .right{
  position: absolute;
  top:0;
  right: 40px;
}

 </style>
