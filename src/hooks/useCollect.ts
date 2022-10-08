import { useUserInfo } from './useUserInfo'
import { useUser } from './useUser'
import { collectArticle } from '@/api/module/user'
// 收藏操作
export const useCollect = (id:number) => {
  const { isLogin } = useUser()

  const { userInfo, getUerInfoTodo } = useUserInfo(isLogin.value)

  const router = useRouter()

  const isCollect = computed(() => {
    const value = userInfo.value?.collect?.find(item => Number(item) === id)
    if (value && isLogin.value) return true
    else return false
  })

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
    const { code } = await collectArticle({
      articleId: id,
      type
    })
    if (code === 0) {
      ElMessage({
        type: 'success',
        message: type === '1' ? '收藏成功' : '取消收藏成功'
      })
      setTimeout(() => {
        // 产生原因：由于我们请求了收藏文章的接口后 又马上请求了获取用户信息的接口 后端储存数据没那么快 所以在这边价格定时器

        // 后端问题 暂时不知道怎么解决
        getUerInfoTodo()
      }, 300)
    }
  }
  return {
    isCollect,
    updateCollect
  }
}
