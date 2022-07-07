import { useUserInfo } from './useUserInfo'
import { useUser } from './useUser'
import type { IUserInfoType } from '@/api/types/user'
import { collectArticle } from '@/api/module/article'
// 收藏操作
export const useCollect = (id:string) => {
  const info = ref<IUserInfoType|null>(null)
  const isCollect = computed(() => {
    const value = info.value?.collectArticle.find(item => item._id === id)
    if (value) return true
    else return false
  })
  onMounted(() => {
    if (isLogin.value) {
      getUerInfoTodo().then(() => {
        setUserInfo()
      })
    }
  })

  const router = useRouter()

  const { isLogin } = useUser()

  const { userInfo, getUerInfoTodo } = useUserInfo(isLogin.value)
  const setUserInfo = () => {
    info.value = userInfo.value
  }
  const updateCollect = async (type:'1'|'2') => {
    if (!isLogin.value) {
      ElMessageBox({
        title: '登录提示',
        message: '该操作需要登录，是否前往登录？',
        showConfirmButton: true,
        confirmButtonText: '去登录',
        showCancelButton: true,
        cancelButtonText: '取消',
        draggable: true
      }).then(() => {
        router.push({
          path: '/login',
          query: {
            redirect: router.currentRoute.value.fullPath
          }
        })
      })
      return
    }
    const { data, status } = await collectArticle({
      id,
      type
    })
    if (status === 200) {
      ElMessage({
        type: 'success',
        message: data.msg
      })
      getUerInfoTodo().then(() => {
        setUserInfo()
      })
    }
  }
  return {
    isCollect,
    updateCollect
  }
}
