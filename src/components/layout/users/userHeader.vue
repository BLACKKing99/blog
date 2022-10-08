<template>
  <div class="user-header">
    <img
      src="@/assets/img/avatar/avatar.jpg"
      class="back-img"
    >
    <div class="user-header-user flex-c">
      <div class="user-content flex">
        <div class="user-avatar">
          <img :src="$imgUrl + userInfo?.avatar">
        </div>
        <div class="user-info">
          <ul class="info flex-c">
            <li class="title">
              <span class="mr-2">用户名:</span>
              <span>{{ userInfo?.name }}</span>
            </li>
            <li class="power">
              <span class="mr-2">权 &nbsp;&nbsp;限:</span>
              <span>{{ userInfo?.identity === 'member'?'普通用户':'管理员' }}</span>
            </li>
            <li class="sex">
              <span class="mr-2">性 &nbsp;&nbsp;别:</span>
              <i :class="`iconfont ${userInfo?.sex === '0'?'icon-nan':'icon-nv'}`" />
              {{ userInfo?.sex === '0'?'男':'女' }}
            </li>
            <li
              class="chart"
              @click=" router.push({
                name: 'info'
              })"
              title="点击查看个人资料"
            >
              查看个人资料
            </li>
          </ul>
        </div>
        <div class="user-edit ">
          <div class="flex-r">
            <span class="edit">编辑个人资料</span>
            <i class="iconfont icon-shezhi" />
          </div>
          <time-comp class="time-copm" />
        </div>
      </div>
      <div class="user-tab">
        <el-tabs
          v-model="activeName"
          @tab-click="handleTabClick"
          class="demo-tabs"
        >
          <template
            v-for="tabItem in userItem?.children"
            :key="tabItem.id"
          >
            <el-tab-pane
              :label="tabItem.title"
              :name="tabItem.name"
            >
              <router-view />
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { tabbarListAdmin } from '../comps/config/index'
import type { TabsPaneContext } from 'element-plus'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useEventBus } from '@/hooks/useEventBus'
const { userInfo, getLoaclUserInfo } = useUserInfo()
const { Buson, Busoff } = useEventBus()
const userItem = tabbarListAdmin.find(item => item.id === 4)

const router = useRouter()

const activeName = ref<string>(router.currentRoute.value.name as string)

watch(() => router.currentRoute.value.name, (name) => {
  activeName.value = name as string
}, { immediate: true })

const handleTabClick = (item:TabsPaneContext) => {
  router.push({
    name: item.paneName as string
  })
}

onMounted(() => {
  Buson('updateUserInfo', () => {
    setTimeout(() => {
      getLoaclUserInfo()
    }, 100)
  })
})
onUnmounted(() => {
  Busoff('updateUserInfo')
})
</script>

<style scoped lang='scss'>
.user-header{
  width: 100%;
  position: relative;
  .back-img{
    width: 100%;
    height: 100vh;
    position: absolute;
    object-fit: cover;
  }
  &-user{
    width: 100%;
    height: 100%;
    padding-top: 300px;
    position: relative;
    // background-color: #fffdfd;
    // background: url('@/assets/img/avatar/avatar.jpg') 0 center;
    .user-content{
      width: 100%;
      height: 200px;
      background-color: #fffdfd;
      .user-avatar{
        width: 200px;
        position: relative;
        img{
          position: absolute;
          right: 20px;
          top: -50px;
          height: 100px;
          width: 100px;
          border-radius: 100%;
        }
      }
      .user-info{
        flex: 1;
        li{
          width: 100%;
          margin: 10px 0;
          color: #5c5c5c;
          font-size: 14px;
        }
          .chart{
            cursor: pointer;
          }
      }
      .user-edit{
        width: 300px;
        margin-top: 20px;
        padding:0 20px;
        .time-copm{
          height: 130px;
          margin-top: 20px;
        }
        .edit{
          background: #d8d8d8;
          padding: 5px 10px;
          font-size: $font-mini;
          border-radius: 10px;
          margin-right: 20px;
          transition: 0.3s;
          cursor: pointer;
          display: inline-block;
          &:hover{
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
          }
        }
        .iconfont{
          font-size: $font-larget;
          cursor: pointer;
          color: #5c5c5c;
        }
      }
    }
    .user-tab{
      background-color: #fffdfd;
      flex: 1;
      width: 100%;
      padding: 0 50px;
      padding-top: 20px;
      box-sizing: border-box;
      ::v-deep(.el-tabs){
        height: 100%;
        .el-tabs__nav{
          .el-tabs__active-bar{
            background-color: $pink-color;
          }
          .el-tabs__item.is-active{
            color: $pink-color;
          }
          .el-tabs__item:hover{
            color: $pink-color;
          }
        }
        .el-tabs__content{
          height: 100%;
          width: 100%;
          overflow: initial;
        }
      }
    }
  }
}
</style>
