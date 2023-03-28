<template>
  <div class="my-comps flex-c">
    <div class="my-comps-top" />
    <div class="my-comps-bottom">
      <div class="my-comps-bottom-text">
        <!-- {{ userInfo?.name }} -->
      </div>
    </div>
    <el-popover
      placement="bottom"
      popper-class="my-comps-info"
      :width="300"
      trigger="hover"
      :show-arrow="false"
    >
      <ul class="px-4">
        <li class="text-lg text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {{ userInfo?.name }}
        </li>
        <li
          class="bio text-gray-500 text-xs text-center mt-1"
          v-html="userInfo?.bio"
        />
        <li class="w-full h-10 flex items-center justify-center mt-1">
          <div
            v-for="item in girdList"
            :key="item.value"
            class="flex cursor-pointer duration-200 flex-1 text-gray-500 flex-col items-center justify-between hover:text-theme"
          >
            <span>{{ item.count }}</span>
            <span>{{ item.title }}</span>
          </div>
        </li>
        <li class="w-full items-center justify-center flex flex-col mt-1">
          <div
            class=" mb-1 cursor-pointer hover:bg-themeOcpy px-2 hover:text-white duration-200 w-[90%] h-8 rounded-sm flex justify-between items-center"
            v-for="item in list"
            :key="item.id"
            @click="goListClick(item)"
          >
            <div class="flex items-center">
              <i
                class="iconfont text-lg"
                :class="item.icon"
              />
              <span class="text-sm ml-2">{{ item.title }}</span>
            </div>
            <i class="iconfont icon-xiangyou1 text-sm" />
          </div>
        </li>
      </ul>
      <template #reference>
        <div class="my-comps-avatar">
          <img
            :src="$imgUrl + userInfo?.avatar"
          >
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script lang='ts' setup>
import { useUserInfo } from '@/hooks/useUserInfo'
import { list, girdList } from './config'
import type { IgirdList, IList } from './config'

const { userInfo } = useUserInfo()

onMounted(() => {
  girdList.forEach(item => {
    if (item.value === 'follow' && userInfo.value) {
      item.count = userInfo.value.collect.length
    }
  })
})

const goListClick = (list:IList) => {
  if (list.id === 1) {
    // 个人中心
    goPersonCenter()
  } else if (list.id === 2) {
    // 退出登录
    goLoginOut()
  }
}

const goPersonCenter = () => {

}

const goLoginOut = () => {

}

</script>

<style scoped lang='scss'>
:v-deep(.my-comps-info){
  .bio{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;/*重点，不能用block等其他*/
    -webkit-line-clamp: 2;/*重点IE和火狐不支持*/
    -webkit-box-orient: vertical;/*重点*/
  }
  .col {
    @apply w-full h-10 flex items-center justify-center;
    &-item {
      @apply flex cursor-pointer flex-1 text-gray-500 flex-col items-center justify-between hover:text-theme;
    }
  }
}
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
