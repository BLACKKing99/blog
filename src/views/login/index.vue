<template>
  <Particles />
  <div class="login">
    <div class="container">
      <Transition name="login">
        <div
          class="login-content"
          v-show="!isRegister"
        >
          <Login />
        </div>
      </Transition>
      <Transition name="register">
        <div
          class="register-content"
          v-show="isRegister"
        >
          <Register />
        </div>
      </Transition>
      <div
        class="mask-content"
        :class="{ 'mask-acitve': isRegister }"
      >
        <div
          class="mask-content-item"
          :style="{backgroundPosition:isRegister?'right center':'left center'}"
        >
          <Transition name="tips">
            <div
              class="mask-content-item-container"
              v-show="isRegister"
            >
              <span class="count">
                已有账号??
              </span>
              <span class="join">赶紧来登录吧!!</span>
              <button
                class="register"
                @click="handleChangeTodo"
              >
                登录
              </button>
            </div>
          </Transition>
          <Transition name="tipsregister">
            <div
              class="mask-content-item-container"
              v-show="!isRegister"
            >
              <span class="count">
                没有账号??
              </span>
              <span class="join">
                快加入我们吧!!
              </span>
              <button
                class="register"
                @click="handleChangeTodo"
              >
                注册
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
    >
  </div>
</template>

<script lang="ts" setup>
import Login from './comps/Login.vue'
import Register from './comps/register.vue'
// 用来判断是否为注册
const isRegister = ref<boolean>(false)

const handleChangeTodo = () => {
  if (isRegister.value) {
    isRegister.value = false
  } else {
    isRegister.value = true
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/animations.scss';
.login {
  height: 100%;
  background: url('@/assets/img/login-bg.jpg') no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .container {
    z-index: 100;
    position: relative;
    display: flex;
    align-items: center;
    transition: 1s;
    height: 530px;
    width: 800px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    .login-content {
      width: 50%;
      height: 100%;
      transition: all 1s;
    }
    .register-content{
      width: 50%;
      height: 100%;
      position: absolute;
      transition: all 1s;
      left: 50%;
      z-index: 999;
    }
    .mask-content {
      transition: 1s;
      transform: translateX(0);
      position: absolute;
      top: 0;
      left: 50%;
      z-index: 999;
      width: 50%;
      height: 100%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 1s;
        margin: 10px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        position: relative;
        flex-direction: column;
        background: url('@/assets/img/login-bg.jpg');
        background-position: left center;
        background-size: cover;
        border-radius: 10px;
        color: #fff;
        &-container{
          display: flex;
          flex-direction: column;
          position: absolute;
          left: calc(50% - 60px);
          top: calc(50% - 50px);
          width: 120px;
          height: 100px;
          .count {
            font-size: $font-larget;
            margin-bottom: 5px;
          }
          .register {
            width: 120px;
            height: 35px;
            border: solid 1px #fff;
            color: #fff;
            cursor: pointer;
            margin-top: 7px;
            border-radius: 5px;
            transition: 0.3s;
            font-size: $font-small;
            background-color: transparent;
            &:hover {
              background: $blue-color;
              border: none;
            }
          }

        }
      }
    }
    .mask-acitve{
      transform: translateX(-100%);
    }
  }
}
</style>
