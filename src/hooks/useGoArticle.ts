import { addPreview } from '@/api/module/article'
export const useGoArticle = () => {
  const router = useRouter()
  const goArticle = async (id:number) => {
    const { code } = await addPreview(id)
    if (code !== 0) {
      ElMessage.error('产生了失败的电流~')
    }
    router.push({
      name: 'article',
      params: {
        id
      }
    })
  }
  return {
    goArticle
  }
}
