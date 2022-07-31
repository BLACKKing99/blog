import { getUserInfo, updateUserInfo } from '@/api/module/user'
import { useUser } from './useUser'
import type { IUserInfoType } from '@/api/types/user'
import LocalCatch from '@/util/LocalCatch'

// 获取用户信息
export const useUserInfo = (isLogin?:boolean) => {
  const userInfo = ref<IUserInfoType|null>(null)
  const LZF_BLOG = LocalCatch.getItem('lzf_blog')
  const { isLogin: isAccount } = useUser()
  onMounted(() => {
    if (isLogin || isAccount.value) {
      getLoaclUserInfo()
    }
  })

  // 获取用户信息
  const getUerInfoTodo = async () => {
    // 重新获取用户信息
    const { data, status } = await getUserInfo()
    if (status === 200) {
      userInfo.value = data
      const NEW_LZF_BLOG = {
        ...LZF_BLOG,
        userInfo: data
      }
      LocalCatch.setItem('lzf_blog', NEW_LZF_BLOG)
    }
  }

  // 调取更新接口 并且存储到本地
  const updateUsersInfo = async (data:Partial<IUserInfoType>) => {
    const { status, data: value } = await updateUserInfo(data)
    if (status === 200) {
      userInfo.value = value.data
      const NEW_LZF_BLOG = {
        ...LZF_BLOG,
        userInfo: value.data
      }
      LocalCatch.setItem('lzf_blog', NEW_LZF_BLOG)
      ElMessage.success('修改成功')
    }
  }

  const getLoaclUserInfo = () => {
    userInfo.value = LocalCatch.getItem('lzf_blog').userInfo
  }
  return {
    userInfo,
    getUerInfoTodo,
    updateUsersInfo,
    getLoaclUserInfo
  }
}
