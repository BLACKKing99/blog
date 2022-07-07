<template>
  <div class="tab-bar flex-c">
    <div class="tab-bar-header flex-m">
      <img
        src="@/assets/img/logo.jpg"
        alt=""
      >
    </div>
    <ul class="tab-bar-center flex-c">
      <li
        class="tab-bar-center-item flex-m"
        v-for="tab in tabbarList"
        :key="tab.id"
        @click="changeTabBar(tab)"
      >
        <template v-if="tab.children">
          <el-popover
            placement="right"
            :width="100"
            popper-class="tab-popper"
            trigger="hover"
          >
            <template #reference>
              <div
                class="content flex-m"
                :class="activeBar === tab.name ? 'tab-ber-active' : ''"
              >
                <i
                  class="iconfont flex-m"
                  :class="tab.icon"
                />
                <span class="title">{{ tab.title }}</span>
              </div>
            </template>
            <ul class="tab-bar-children">
              <li
                v-for="tabItem in tab.children"
                :key="tabItem.name"
                class="tab-bar-children-item flex"
                :class="tabItem.name === activeChildrenBar ? 'tab-bar-children-active' : ''"
                @click="changeTabBarChildren(tabItem, tab)"
              >
                <i :class="`iconfont ${tabItem.icon}`" />
                <span class="title">{{ tabItem.title }}</span>
              </li>
            </ul>
          </el-popover>
        </template>
        <template v-else>
          <div
            class="content flex-m"
            :class="activeBar === tab.name ? 'tab-ber-active' : ''"
          >
            <i
              class="iconfont flex-m"
              :class="tab.icon"
            />
            <span class="title">{{ tab.title }}</span>
          </div>
        </template>
        <div
          class="tab-bar-center-item-navbar"
          v-show="activeBar === tab.name"
        />
      </li>
    </ul>
    <div
      class="tab-bar-footter flex-m"
    >
      <i
        v-if="isLogin"
        class="iconfont icon-tuichu"
        title="退出"
        @click="loginOut"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import LocalCatch from '@/util/LocalCatch'
import { useAccountStore } from '@/sotre/module/account'
import { tabbarListAdmin, tabbarListCommon } from './config/index'
import { useUser } from '@/hooks/useUser'
import { useUserInfo } from '@/hooks/useUserInfo'
// tabbarList里面元素的类型
type LTabbarList = typeof tabbarListAdmin[number]
const router = useRouter()
const accountStore = useAccountStore()
const activeBar = ref<string>('main')
const tabbarList = ref<LTabbarList[]>([])
const activeChildrenBar = ref<string>('')
const match = router.currentRoute.value.matched

// const isLogin = computed(() => {
//   return accountStore.token !== undefined
// })
const { isLogin } = useUser()

const { userInfo } = useUserInfo(isLogin.value)

onMounted(() => {
  if (userInfo.value && userInfo.value.identity === 'admin') {
    tabbarList.value = tabbarListAdmin
  } else {
    tabbarList.value = tabbarListCommon
  }
})

// 根据路由去匹配tabbar
if (match[1]) {
  activeBar.value = match[1].name as string
}
if (match[2]) {
  activeChildrenBar.value = match[2].name as string
}
// 点击tabbar触发的事件
const changeTabBar = (tab: LTabbarList) => {
  if (!tab.children) {
    activeBar.value = tab.name
    activeChildrenBar.value = ''
    router.push({
      name: tab.name
    })
  }
}

const loginOut = () => {
  ElMessageBox.confirm(
    '确定要退出吗',
    '退出',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      LocalCatch.removeItem('lzf_blog')
      accountStore.$patch((state) => {
        state.userInfo = null
        state.token = undefined
      })
      router.push('/login')
      ElMessage({
        type: 'success',
        message: '退出成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消成功'
      })
    })
}

// 点击tabbarItem 时触发的事件
const changeTabBarChildren = (tabItem: LTabbarList, tab: LTabbarList) => {
  if (tab.name === 'user' && !isLogin.value) {
    router.push('/login')
    return
  }
  if (tab.name) {
    activeBar.value = tab.name
  }
  activeChildrenBar.value = tabItem.name
  router.push({
    name: tabItem.name
  })
}
</script>

<style scoped lang="scss">
@import '@/styles/animations.scss';
.tab-popper {
  padding: 10px 0 !important;
  .tab-bar-children {
    &-active {
      background-color: #f5f5f5;
      .iconfont {
        color: #000;
      }
      .title {
        color: #000;
      }
    }
    &-item {
      height: 34px;
      align-items: center;
      transition: 0.5s;
      cursor: pointer;
      color: $pink-color;
      position: relative;
      &:hover {
        .title{
          transform: rotate(360deg);
        }
      }
      .iconfont {
        display: inline-block;
        transition: 0.5s;
        margin: 0 10px;
        font-size: $font-small;
      }
      .title {
        display: inline-block;
        transition: 0.5s;
        transform: rotate(0);
      }
    }
  }
}

.tab-bar {
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-header,
  &-footter {
    height: 140px;
    width: 100%;
    img {
      width: 100px;
    }
    .iconfont {
      font-size: $font-largest;
      cursor: pointer;
      color: #dad4d4;
    }
  }
  &-center {
    flex: 1;
    width: 100%;
    &-item {
      flex: 1;
      width: 100%;
      position: relative;
      background: #fff;
      &-navbar{
        position: absolute;
        background: $pink-color;
        right: 0;
        width: 3px;
        height: 50%;
      }
      .tab-ber-active {
        background-color: #f5f5f5;
        border-radius: 100%;
        .iconfont {
          transform: translateY(-50px) !important;
        }
        .title {
          display: inline-block !important;
          transform: translateY(0) !important;
        }
      }
      .content {
        width: 50px;
        height: 50px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          .iconfont {
            transform: translateY(-50px);
          }
          .title {
            display: inline-block;
            transform: translateY(0);
          }
        }
        .iconfont {
          display: inline-block;
          transition: 0.5s;
          transform: translateY(0);
          position: absolute;
          font-size: $font-largest;
        }
        .title {
          display: inline-block;
          transition: 0.5s;
          position: absolute;
          font-size: $font-small;
          font-weight: 600;
          transform: translateY(50px);
        }
      }
    }
  }
}
</style>
