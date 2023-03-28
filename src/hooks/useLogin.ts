import { IRegisterType } from '@/api/types/user'
import { useAccountStore } from '@/sotre/module/account'
import LocalCatch from '@/util/LocalCatch'

export const useLogin = () => {
  const router = useRouter()
  const accountStore = useAccountStore()
  const login = (userInfo:IRegisterType) => {
    if (userInfo.account === '') {
      ElMessage({
        type: 'error',
        message: '账号不能为空'
      })
      return
    } else if (userInfo.password === '') {
      ElMessage({
        type: 'error',
        message: '密码不能为空'
      })
      return
    }
    accountStore.isLoading = true
    accountStore.loginTodo(userInfo, 'login')
  }
  const register = (userInfo:IRegisterType) => {
    if (userInfo.email === '') {
      ElMessage({
        type: 'error',
        message: '邮箱不能为空'
      })
      return
    } else if (userInfo.name === '') {
      ElMessage({
        type: 'error',
        message: '用户名不能为空'
      })
      return
    } else if (userInfo.password === '') {
      ElMessage({
        type: 'error',
        message: '密码不能为空'
      })
      return
    }
    accountStore.isLoading = true
    accountStore.loginTodo(userInfo, 'register')
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
  return {
    loginOut,
    login,
    register
  }
}
