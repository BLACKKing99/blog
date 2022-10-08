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
                v-model="articleInfo.categoryId"
                placeholder="请选择分类"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in selectOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="order">
              <template #label>
                <div class="create-title">
                  排序
                </div>
              </template>
              <el-input
                v-model="articleInfo.order"
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
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :on-remove="uploadRemove"
                :on-preview="uploadPreview"
                :before-upload="uploadBefore"
                drag
                :action="$imgUrl + '/api/upload/article'"
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
import { IResponse } from '@/util/axios/types'

const articleInfo = reactive({
  title: 'Vue3之优雅的父子实例通讯',
  categoryId: '',
  tips: '在vue3中，由于setup的大量使用（导致this难以获取），且this.$children的删除，导致父获取子组件变得麻烦。',
  content: "> 在vue3中，由于setup的大量使用（导致this难以获取），且this.$children的删除，导致父获取子组件变得麻烦。\n\n*ps:本文思路解析源自于vant3源码以及网上思路，源码地址如下*\n\n[vant3对应源码地址](https:\/\/github.com\/youzan\/vant\/tree\/dev\/packages\/vant-use\/src\/useRelation)\n\n### *. 需求\n\n> 为什么会有这种需求？为什么不通过ref依赖的形式获取？举个例子，轮播组件。对于轮播组件来说，一般都是父子嵌套的关系，且在定义父子组件时完全分离开，利用slot来进行插入，那么此时，问题就来了。在v3中，我们无法通过setup的slot以及对slot进行ref操作来获取内部子组件，但我们仍需要获取子组件的根节点等内容。\n\n### 一. 使用\n\n#### 实例\n\n```typescript\n\/\/ 父组件\nimport { useChildren } from '你的路径\/useRelation\/index'\n...\nsetup(){\n    \/\/ useChildren接受一个key值，返回一个对象：children子组件实例 linkChildren：链接子组件的方法\n    const { children, linkChildren } = useChildren('RELATION_KEY')\n    linkChildren({\n      add: () => console.log('add')\n    })\n    onMounted(() => {\n      console.log(children)\n    })\n}\n...\n```\n\n```typescript\n\/\/ 子组件\nimport { useParent } from '你的路径\/useRelation\/index'\n...\nsetup(){\n    \/\/ useChildren接受一个key值，这个key值取决于父组件定义的key值\n\tconst { parent, index } = useParent('RELATION_KEY')\n    parent.add()\n    index.value \/\/ 当前组件索引\n}\n...\n```\n\n#### 文档\n\n**useParent返回值** \n\n| 参数   | 说明                                         | 类型          |\n| ------ | -------------------------------------------- | ------------- |\n| parent | 父组件提供的值                               | *any*         |\n| index  | 当前组件在父组件的所有子组件中对应的索引位置 | *Ref<number>* |\n\n**useChildren返回值**\n\n| 参数         | 说明                             | 类型                        |\n| ------------ | -------------------------------- | --------------------------- |\n| children     | 子组件实例列表                   | *ComponentPublicInstance[]* |\n| linkChildren | 向子组件提供值的方法，链接子组件 | *(value: any) => void*      |\n\n### 二. 原理分析\n\n> 以provide\/inject为传递基础，在子组件中调用父组件的方法，然后将子组件自身实例传入方法，再通过父组件的方法将其保存到父组件自身\n\n#### useChildren\n\n```typescript\nexport function useChildren<\n  Child extends ComponentPublicInstance = ComponentPublicInstance\n> (key: string | symbol): {\n  children: Child[],\n  linkChildren: (value:any)=>void\n} {\n  const publicChildren: Child[] = reactive([])\n  const internalChildren: ComponentInternalInstance[] = reactive([])\n  const parent = getCurrentInstance()! \/\/ 获取当前实例\n\n  const linkChildren = (value?: any) => {\n    \/\/ 定义link\\unlink方法，将传入实例放入\\移除\n    const link = (child: ComponentInternalInstance) => {\n      if (child.proxy) {\n        internalChildren.push(child)\n        publicChildren.push(child.proxy as Child)\n        ....\n      }\n    }\n\n    const unlink = (child: ComponentInternalInstance) => {\n      const index = internalChildren.indexOf(child)\n      publicChildren.splice(index, 1)\n      internalChildren.splice(index, 1)\n    }\n\n    \/\/ 将链接方法、子组件实例以及传入内容注入\n    provide(key, {\n      link,\n      unlink,\n      children: publicChildren,\n      internalChildren,\n      ...value\n    })\n  }\n\n  return {\n    children: publicChildren,\n    linkChildren\n  }\n}\n\n```\n\n#### useParent\n\n```typescript\nexport function useParent<T> (key: string | symbol): {\n  parent: any;\n  index: Ref<number>\n} {\n  const parent = inject<ParentProvide<T> | null>(key, null) \/\/ inject接收注入内容\n\n  if (parent) {\n    const instance = getCurrentInstance()!\n    const { link, unlink, internalChildren, ...rest } = parent\n\n    link(instance) \/\/ 进行链接 \n\n    \/\/ 在生命周期销毁前删除父组件中的子组件实例  \t\n    onUnmounted(() => {\n      unlink(instance)\n    })\n\n    const index = computed(() => internalChildren.indexOf(instance)) \/\/ 计算当前索引值\n\n    return {\n      parent: rest,\n      index\n    }\n  }\n\n  return {\n    parent: null,\n    index: ref(-1)\n  }\n}\n```",
  cover: '',
  order: ''
})

const selectOptions = ref<IArticleType[]>([])

onMounted(() => {
  // 请求文章类型接口
  getCategory()
})
// 上传图片逻辑开始
// 上传成功
const uploadSuccess = (response:IResponse) => {
  articleInfo.cover = response.data.url
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

const getCategory = async () => {
  const { data, code } = await getArticleType()
  if (code === 0) {
    selectOptions.value = data
  }
}

// form 逻辑
const rules:FormRules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  categoryId: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  tips: [{ required: true, message: '请输入简介', trigger: 'blur' }]
}

const elFrom = ref<FormInstance | null>(null)

const resetArticle = () => {
  articleInfo.content = ''
  articleInfo.cover = ''
  articleInfo.order = ''
  articleInfo.tips = ''
  articleInfo.title = ''
  articleInfo.categoryId = ''
}

const handlePublish = () => {
  if (!elFrom.value) return
  try {
    elFrom.value?.validate(async val => {
      if (val) {
        const { code } = await createArticle(articleInfo)
        if (code === 0) {
          ElMessage({
            message: '发布成功',
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
