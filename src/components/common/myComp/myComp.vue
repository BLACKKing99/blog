<template>
  <div class="my-comps flex-c">
    <div class="my-comps-top" />
    <div class="my-comps-bottom">
      <div class="my-comps-bottom-text">
        {{ userInfo?.name }}
      </div>
    </div>
    <div class="my-comps-avatar">
      <img
        :src="$imgUrl + userInfo?.avatar"
      >
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useUserInfo } from '@/hooks/useUserInfo'

const { userInfo } = useUserInfo()

</script>

<style scoped lang='scss'>
.my-comps{
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #fff;
    &-top{
        flex: 1;
        width: 100%;
        background: url('@/assets/img/avatar/avatar-bg.jpg') 0 0;
        background-size: cover;
    }
    &-bottom{
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        border-top: 1px #f5f5f5 solid;
        position: relative;
        &-text{
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    &-avatar{
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        transition: 0.5s;
        &:hover{
            box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5);
        }
        img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
        }
    }
}
</style>
