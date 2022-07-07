<template>
  <div class="create">
    <div class="create-top flex">
      <span
        class="publish"
        @click="handlePublish"
      >发布</span>
    </div>
    <div class="create-container">
      <div class="create-container-tips">
        相信努力是不会被辜负的~~~
      </div>
      <el-form
        label-width="100px"
        :model="articleInfo"
        :rules="rules"
        ref="elFrom"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="title">
              <template #label>
                <div class="create-title">
                  原创
                </div>
              </template>
              <el-input
                v-model="articleInfo.title"
                placeholder="标题"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="tips">
              <template #label>
                <div class="create-title">
                  简介
                </div>
              </template>
              <el-input
                v-model="articleInfo.tips"
                placeholder="简介"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="content">
              <template #label>
                <div class="create-title">
                  内容
                </div>
              </template>
              <mavon-editor
                v-model="articleInfo.content"
                class="mavon-editor"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="type">
              <template #label>
                <div class="create-title">
                  分类
                </div>
              </template>
              <el-select
                v-model="articleInfo.type"
                placeholder="请选择分类"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in selectOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="sort">
              <template #label>
                <div class="create-title">
                  排序
                </div>
              </template>
              <el-input
                v-model="articleInfo.sort"
                placeholder="不是必填选项哦~~如果需要置顶，请往高了填~~"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="cover">
              <template #label>
                <div
                  class="create-title"
                  style="border-radius: 5px"
                >
                  上传背景图
                </div>
              </template>
              <el-upload
                class="upload"
                :headers="AuthHeader()"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :on-remove="uploadRemove"
                :on-preview="uploadPreview"
                :before-upload="uploadBefore"
                drag
                :action="$imgUrl + '/api/upload'"
                multiple
              >
                <el-icon class="el-icon--upload">
                  <upload-filled />
                </el-icon>
                <div class="el-upload__text">
                  <em>点击我上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    背景图片不是必传的哦~~~不传的话可能会丑点哦！~~
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mavonEditor } from 'mavon-editor'
import { UploadFilled } from '@element-plus/icons-vue'
import type { FormRules, FormInstance } from 'element-plus'
import 'mavon-editor/dist/css/index.css'

import { getArticleType, createArticle } from '@/api/module/article'
import { IArticleType } from '@/api/types/article'

const articleInfo = reactive({
  title: '',
  type: '',
  tips: '',
  content: "[原文链接](https:\/\/www.jianshu.com\/p\/4f98662a4ad2)\n\n### 一.初始化webpack项目\n\n1. 新建文件夹，名称为自己`项目名称`，并在其下创建`src`与`public`文件夹\n2. 在其根文件夹下打开终端，使用`npm init -y`初始化项目\n\n### 二.依赖安装\n\n修改项目下自动生成`package.json`文件，如下\n\n```json\n{\n  \"name\": \"adicw-utils\", \/\/ 此名字为项目名称，随意更改\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"build\": \".\\\\node_modules\\\\.bin\\\\webpack --mode development\",\n    \"serve\": \".\\\\node_modules\\\\.bin\\\\webpack-dev-server\"\n  },\n  \"author\": \"\",\n  \"license\": \"ISC\",\n  \"devDependencies\": {\n    \"html-webpack-plugin\": \"^5.5.0\",\n    \"ts-loader\": \"^9.3.0\",\n    \"typescript\": \"^4.6.4\",\n    \"webpack\": \"^5.72.1\",\n    \"webpack-cli\": \"^4.9.2\",\n    \"webpack-dev-server\": \"^4.9.0\"\n  },\n  \"dependencies\": {\n    \"@babel\/core\": \"^7.17.10\",\n    \"@babel\/preset-env\": \"^7.17.10\",\n    \"babel-loader\": \"^8.0.0-beta.0\"\n  }\n}\n```\n\n在终端执行 `npm i` 指令安装依赖\n\n### 三.项目基础配置\n\n1.在项目根目录下创建`webpack.config.js`配置文件，并写入下列配置\n\n```javascript\nconst path = require('path');  \/\/nodejs内置模块\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\nmodule.exports = {\n  mode: 'development',\n  \/**\n   * 入口\n   *\/\n  entry: '.\/src\/index.ts',\n  resolve: {\n    extensions: ['.tsx', '.ts', '.js']\n  },\n  \/**\n   * 出口\n   *\/\n  output: {\n    path: path.resolve(__dirname, 'dist'),\n    filename: 'bundle.js'\n  },\n  module: {\n    rules: [\n      {\n        test: \/\\.js$\/,\n        exclude: \/(node_modules|bower_components)\/,\n        use: {\n          loader: 'babel-loader',\n          options: {\n            presets: ['@babel\/preset-env']\n          }\n        }\n      }\n    ]\n  },\n  plugins: [new HtmlWebpackPlugin({\n    filename: 'index.html',\n    template: __dirname + \"\/public\/index.html\"\n  })],\n}\n```\n\n2.在项目根目录下创建`tsconfig.json`配置文件，并写入下列配置\n\n```\n{\n  \"compilerOptions\": {\n    \"outDir\": \".\/dist\/\",\n    \"noImplicitAny\": true,\n    \"module\": \"es6\",\n    \"target\": \"es5\",\n    \"jsx\": \"react\",\n    \"allowJs\": true\n  }\n}\n```\n\n3.在`public`文件夹下创建`index.html`文件，作为项目入口页面\n\n4.在`src`文件夹下创建`index.ts`文件，作为项目入口js\n\n### * 题外，将其包发布到自己的npm\n\n1. 项目根目录下打开终端，并输入`npm adduser`配置个人npm账户\n\n   ```\n   \/\/ 如果报下列错误，请输入 npm set registry https:\/\/registry.npmjs.org\/\n   Unexpected token ＜ in JSON at position 0 while parsing near ‘＜!DOCTYPE html、＞\n   ```\n\n2. 执行`npm publish` 进行代码推送。注意，每次推送都需要刚刚`package.json`中的version属性\n\n",
  cover: '',
  sort: ''
})

const selectOptions = ref<IArticleType[]>([])

onMounted(() => {
  // 请求文章类型接口
  getArticleTypeInfo()
})
// 上传图片逻辑开始
// 上传成功
const uploadSuccess = (response:any) => {
  articleInfo.cover = response.url
  ElMessage({
    message: '上传成功',
    type: 'success'
  })
}
// 上传失败
const uploadError = (err:any) => {
  const message = JSON.parse(err.message)
  ElMessage({
    message: message.msg,
    type: 'error'
  })
}
// 列表移除
const uploadRemove = () => {
  articleInfo.cover = ''
}
// 图片预览
const uploadPreview = () => {
  console.log(222222)
}
// 上传图片前
const uploadBefore = () => {
  if (articleInfo.cover !== '') {
    ElMessage({
      type: 'warning',
      message: '请删除之前上传的文件'
    })
    return false
  }
}
// 上传图片逻辑结束

const getArticleTypeInfo = async () => {
  const { data, status } = await getArticleType()
  if (status === 200) {
    selectOptions.value = data.data as IArticleType[]
  }
}

// form 逻辑
const rules:FormRules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  tips: [{ required: true, message: '请输入简介', trigger: 'blur' }]
}

const elFrom = ref<FormInstance | null>(null)

const resetArticle = () => {
  articleInfo.content = ''
  articleInfo.cover = ''
  articleInfo.sort = ''
  articleInfo.tips = ''
  articleInfo.title = ''
  articleInfo.type = ''
}

const handlePublish = () => {
  if (!elFrom.value) return
  try {
    elFrom.value?.validate(async val => {
      if (val) {
        const { data, status } = await createArticle(articleInfo)
        if (status === 200) {
          ElMessage({
            message: data.msg,
            type: 'success'
          })
          resetArticle()
        }
      } else {
        return false
      }
    })
  } catch (err) {
    ElMessage()
  }
}
</script>

<style scoped lang="scss">
.create {
  height: 100%;
  width: 100%;
  // padding: 0;
  box-sizing: border-box;
  &-top {
    height: 40px;
    box-shadow: inset 0 0 2px rgba($color: $pink-color, $alpha: 0.1);
    background-color: #fff;
    left: 0;
    top: 0;
    right: 0;
    z-index: 99999;
    border-radius: 20px 0 0 0;
    position: sticky;
    padding: 0 20px;
    box-sizing: border-box;
    justify-content: flex-end;
    align-items: center;
    .publish {
      border: solid 1px $pink-color;
      padding: 5px 20px;
      font-size: $font-mini;
      color: #333;
      border-radius: 5px;
      position: relative;
      cursor: pointer;
      &:hover {
        &::after {
          width: 100%;
          height: 100%;
        }
      }
      &::after {
        content: '';
        position: absolute;
        transition: 0.3s;
        left: 0;
        top: 0;
        width: 1px;
        height: 1px;
        background-color: rgba($color: $pink-color, $alpha: 0.1);
      }
    }
  }
  &-container {
    width: 900px;
    margin: 0 auto;
    &-tips {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 30px;
      font-size: $font-larget;
      color: $pink-color;
      font-weight: bold;
      text-align: center;
    }
  }
  .create-title {
    border: solid 2px $pink-color;
    box-sizing: border-box;
    text-align: center;
    color: $pink-color;
    font-weight: bold;
    position: relative;
    cursor: pointer;
    border-radius: 5px 0 0 5px;
    line-height: 30px;
    height: 32px;
    &:hover {
      &::after {
        width: 100%;
        height: 100%;
      }
    }
    &::after {
      content: '';
      position: absolute;
      transition: 0.3s;
      left: 0;
      top: 0;
      width: 1px;
      height: 1px;
      background-color: rgba($color: $pink-color, $alpha: 0.1);
    }
  }
  .upload {
    // width: 100%;
    text-align: center;
  }
}
::v-deep(.el-form) {
  .el-form-item {
    .el-form-item__label {
      padding: 0;
      position: relative;
      &::before{
        position: absolute;
        left: 25%;
        top: 0%;
      }
    }
    .el-form-item__content {
      padding-left: 0 !important;
    }
    .el-input {
      .el-input__inner {
        border-radius: 0 5px 5px 0;
      }
    }
  }
}
::v-deep(.mavon-editor) {
  height: 400px;
  .v-note-panel {
    max-height: 400px;
    overflow: auto;
    .v-note-show{
      .markdown-body code{
        background-color: #fff5f5;
        color: #ff502c;
      }
    }
  }
}
</style>
