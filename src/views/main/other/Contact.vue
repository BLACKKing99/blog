<template>
  <div class="contact flex-m">
    <div class="contact-container">
      <div class="contact-envelope-header" />
      <div class="contact-envelope-content">
        <h2 class="contact-envelope-content-title">
          留言~
        </h2>
        <span class="contact-envelope-content-tips">请留下您的建议呀~~~</span>
        <el-input
          style="margin-bottom: 15px"
          placeholder="请输入内容"
          type="textarea"
          clearable
        />
        <div class="contact-envelope-content-info flex-r">
          <el-input
            style="margin-right: 10px"
            placeholder="昵称"
            clearable
          />
          <el-input
            placeholder="邮箱"
            clearable
          />
        </div>
        <el-input
          style="margin-bottom: 15px"
          placeholder="标题"
          clearable
        />
        <div class="contact-envelope-content-publish">
          <button
            class="contact-envelope-content-btn"
            @click="handlePublish"
          >
            发表
          </button>
        </div>
      </div>
      <div class="contact-envelope-body" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const handlePublish = () => {
}
</script>

<style scoped lang="scss">
.contact {
  width: 100%;
  height: 100%;
  background: url('@/assets/img/contact/contact-bg.jpg');
  &-container{
    &:hover{
      .contact-envelope-header,.contact-envelope-body{
        transform: translateY(90px);
      }
      .contact-envelope-content{
        transform: translateY(-70px);
        height: 400px !important;
        padding: 20px 20px 100px 20px;
      }
    }
    .contact-envelope-header {
      transition: 0.8s;
      width: 580px;
      height: 200px;
      position: absolute;
      top: calc(50% - 190px);
      border-radius: 5px;
      box-sizing: border-box;
      background: url('@/assets/img/contact/envelope-head.png') center;
      background-size: cover;
      z-index: 1;
    }
    .contact-envelope-body {
      transition: 0.8s;
      width: 580px;
      height: 340px;
      top: calc(50% - 100px);
      position: absolute;
      border-radius: 5px;
      box-sizing: border-box;
      background: url('@/assets/img/contact/envelope-body.png') center;
      background-size: cover;
      z-index: 3;
    }
    .contact-envelope-content {
      width: 580px;
      height: 110px;
      transition: 0.8s;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      position: relative;
      flex-direction: column;
      background: #fff;
      padding: 20px 20px 0 20px;
      z-index: 2;
      &-title {
        margin-bottom: 15px;
      }
      &-tips {
        margin-bottom: 15px;
        font-size: 12px;
      }
      &-info {
        width: 100%;
        margin-bottom: 15px;
      }
      &-publish {
        text-align: center;
        width: 100%;
      }
      &-btn {
        width: 120px;
        height: 30px;
        border-radius: 5px;
        border: none;
        background-color: #666;
        font-size: $font-mini;
        color: #fff;
        z-index: 999;
      }
    }
  }
}
</style>
