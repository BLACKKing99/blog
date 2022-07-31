<template>
  <div class="first-page">
    <div class="first-page-container">
      <div
        class="first-page-container-todo flex-c"
        @click="handleTodo"
      >
        <i
          class="iconfont icon-wancheng-"
          v-if="isEdit"
        />
        <i
          class="iconfont icon-bianji"
          v-else
        />
      </div>
      <Editor
        v-model:valueHtml="content"
        :is-edit="isEdit"
      />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useUserInfo } from '@/hooks/useUserInfo'

const { userInfo, updateUsersInfo } = useUserInfo()

// 监听编辑器
watch(() => userInfo.value, (val) => {
  content.value = val!.bio
})
// 内容编辑器
const content = ref<string>('')

// 编辑器是否可以编辑
const isEdit = ref<boolean>(false)
const handleTodo = async () => {
  isEdit.value = !isEdit.value
  if (!isEdit.value) {
    updateUsersInfo({
      bio: content.value
    })
  }
}
</script>

<style scoped lang='scss'>
.first-page{
  height: 100%;
  padding-bottom: 300px;
  &-container{
    width: 100%;
    border: 1px solid #d0d7de;
    box-sizing: border-box;
    min-height: 140px;
    padding: 10px 5px;
    position: relative;
    &-todo{
      width: 40px;
      height: 40px;
      position: absolute;
      right: 20px;
      top: 30%;
      border-radius: 50%;
      transition: 0.5s;
      border: solid 1px #ccc;
      background-color: #fff;
      box-sizing: border-box;
      z-index: 99999;
      &:hover{
        box-shadow: 0 0px 5px rgba(0, 0, 0, 0.3);
      }
      cursor: pointer;
      .iconfont{
        font-size: $font-larget;
      }
      .icon-wancheng-{
        color: $pink-color;
      }
      .icon-bianji{
        color: $main-color;
      }
    }
}
}
</style>
