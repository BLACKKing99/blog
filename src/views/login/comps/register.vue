<template>
  <div class="login-container">
    <div class="login-container-item">
      <h2>注册</h2>
    </div>
    <div class="login-container-item">
      <i class="iconfont icon-yonghu-xianxing icon-inp" />
      <input
        class="login-container-item-inp"
        type="text"
        placeholder="请输入邮箱"
        @keydown="enterRegister"
        v-model="userInfo.email"
      >
    </div>
    <div
      class="login-container-item"
      style="margin-bottom: 30px"
    >
      <i class="iconfont icon-suo icon-inp" />
      <input
        class="login-container-item-inp"
        type="text"
        placeholder="请输入用户名"
        @keydown="enterRegister"
        v-model="userInfo.name"
      >
    </div>
    <div
      class="login-container-item"
      style="margin-bottom: 10px"
    >
      <i class="iconfont icon-suo icon-inp" />
      <input
        class="login-container-item-inp"
        type="password"
        placeholder="请输入密码"
        @keydown="enterRegister"
        v-model="userInfo.password"
      >
    </div>
    <div class="login-container-item">
      <button
        class="login-container-item-btn l-button cursor-pointer"
        @click="handleRegister"
        v-loading="accountSotre.isLoading"
        :disabled="accountSotre.isLoading"
      >
        注册
      </button>
    </div>
    <div class="login-container-item">
      <i class="iconfont icon-QQ icon-login" />
      <i class="iconfont icon-weixin icon-login" />
      <i class="iconfont icon-github-fill icon-login" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLogin } from '@/hooks/useLogin'
import { useAccountStore } from '@/sotre/module/account'

const userInfo = reactive({
  password: '',
  email: '',
  name: ''
})

const accountSotre = useAccountStore()

const { register } = useLogin()

const enterRegister = (event:KeyboardEvent) => {
  if (event.keyCode === 13) handleRegister()
}

const handleRegister = () => {
  register(userInfo)
}

</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;

  &-item {
    margin-bottom: 30px;
    width: 80%;
    justify-content: center;
    display: flex;

    &-title {
      color: $main-color;
      font-size: $font-larget;
    }

    .tips {
      font-size: $font-mini;
      color: $main-color;
      cursor: pointer;
    }

    &-leaf {
      margin-right: 20px;
    }

    .icon-inp {
      width: 40px;
      height: 40px;
      box-sizing: border-box;
      background: $blue-color;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 600;
      border-radius: 5px 0 0 5px;
    }

    .icon-login {
      width: 40px;
      border-radius: 100%;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      text-align: center;
      position: relative;
      background-color: #f5f5f5;
      margin-right: 20px;
      cursor: pointer;
      font-size: $font-larget;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        transition: 0.3s;
        left: 0;
        top: 0;
        box-shadow: none;
      }

      &:hover {
        &::after {
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
      }
    }

    &-forget {
      color: $blue-color;
      cursor: pointer;
    }

    &-inp {
      flex: 1;
      outline: none;
      border: #fff 2px solid;
      border-left: none;
      box-sizing: border-box;
      background-color: #f5f5f5;
      padding: 0 10px;
      height: 40px;
      border-radius: 0 5px 5px 0;
      font-size: $font-small;
      transition: 0.3s;

      &:focus {
        border-color: $blue-color;
      }
    }

    &-btn {
      display: inline-block;
      width: 100%;
      height: 40px;
      background-color: $blue-color;
      transition: 0.3s;

      &:hover {
        &::after {
          box-shadow: 0 0 10px $blue-color;
        }
      }
    }
  }
}
</style>
