<template>
  <div class="info">
    <div
      class="info-avatar"
      @click="handleOpenAvatar"
    >
      <img :src="userInfo?.avatar">
    </div>
    <div class="info-edit">
      <button
        class="info-edit-btn"
        @click="handleInfoEdit"
      >
        {{ isEdit?'保存':'编辑' }}
      </button>
    </div>
    <info-layout
      :layout="accountInfo"
      title="账号信息"
      class="info-layout"
    />
    <info-layout
      v-model:layout="baseInfo"
      :is-edit="isEdit"
      title="基本信息"
      class="info-layout"
    />
    <info-layout
      v-model:layout="linkInfo"
      :is-edit="isEdit"
      title="联系信息"
      class="info-layout"
    />
    <avatar-vue
      v-model:is-view="isView"
      :avatar-url="userInfo?.avatar"
      @change-avatar="handleChangeAvatar"
    />
  </div>
</template>

<script lang="ts" setup>
import AvatarVue from './info/Avatar.vue'
import { accountInfo, baseInfo, linkInfo } from './info.config'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useEventBus } from '@/hooks/useEventBus'
import useTimeFormat from '@/hooks/useTimeFormat'

const { userInfo, updateUsersInfo } = useUserInfo()

const { Busemit } = useEventBus()

watch(() => userInfo.value, (val) => {
  if (val) {
    accountInfo.forEach((item) => {
      item.content = val[item.pid!] as string
      if (item.pid === 'identity' && val.identity === 'member') {
        item.content = '普通用户'
      } else if (item.pid === 'identity' && val.identity !== 'member') {
        item.content = '管理员'
      } else if (item.pid === 'createdAt') {
        const { formatTime } = useTimeFormat(val.createdAt, 'YYYY-MM-DD HH:mm:ss')
        item.content = formatTime.value
      }
    })
    baseInfo.forEach((item) => {
      item.content = val[item.pid!] as string
    })
  }
})

// 控制是否编辑
const isEdit = ref(false)

type IUserInfo = typeof userInfo.value

const handleInfoEdit = async () => {
  isEdit.value = !isEdit.value
  if (!isEdit.value) {
    const updateNewUserInfo:Partial<IUserInfo> = {}
    linkInfo.forEach((item) => {
      (updateNewUserInfo[item.pid!] as string) = item.content
    })
    baseInfo.forEach((item) => {
      (updateNewUserInfo[item.pid!] as string) = item.content
    })
    // 调用更新用户接口
    updateUsersInfo(updateNewUserInfo)
    // 发送更新用户信息事件
    Busemit('updateUserInfo')
  }
}

// 控制修改弹窗打开
const isView = ref(false)
// 处理弹窗相关事件
const handleChangeAvatar = async (value:string) => {
  // 修改头像
  updateUsersInfo({
    avatar: value
  })
  // 发送更新用户信息事件
  Busemit('updateUserInfo')
}
const handleOpenAvatar = () => {
  isView.value = true
}
</script>

<style scoped lang="scss">
.info {
  width: 100%;
  padding-bottom: 20px;
  position: relative;
  &-edit {
    width: 100%;
    text-align: right;
    &-btn {
      outline: none;
      background-color: $pink-color;
      width: 80px;
      height: 30px;
      border-radius: 5px;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  }
  &-avatar {
    display: inline-block;
    width: 200px;
    height: 200px;
    left: calc(50% - 100px);
    top: -200px;
    z-index: 999;
    position: absolute;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    &:hover {
      &::after {
        opacity: 1;
      }
    }
    &::after {
      content: '点击修改';
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: absolute;
      transition: 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.3);
      left: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
  &-layout {
    margin: 10px 0 20px 0;
  }
}
</style>
