import LocalCatch from '@/util/LocalCatch'
import { IUserInfoType } from '@/sotre/module/account'

const userInfo = ref<IUserInfoType | null>(null)
const token = ref<string>('')
export const useUser = () => {
  userInfo.value = LocalCatch.getItem('lzf_blog')?.userInfo
  token.value = LocalCatch.getItem('lzf_blog')?.token
  const isLogin = computed(() => {
    return !!userInfo.value && !!token.value
  })
  return {
    isLogin
  }
}
