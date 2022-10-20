import { recomendArticle, populateArticle } from '@/api/module/article'
import { IArticleInfo } from '@/api/types/article'

export const useArticle = () => {
  const recommendList = ref<IArticleInfo[]>([])
  const populateList = ref<IArticleInfo[]>([])
  const router = useRouter()
  // 进入文章详情
  const goArticle = (id:number) => {
    router.push({
      name: 'article',
      params: {
        id
      }
    })
  }
  // 获取推荐文章
  const getRecomendArticle = async () => {
    const { data, code } = await recomendArticle()
    if (code === 0) {
      recommendList.value = data
    }
  }

  // 获取流行文章
  const getPopulateArticle = async () => {
    const { data, code } = await populateArticle()
    if (code === 0) {
      populateList.value = data
    }
  }
  return {
    goArticle,
    getPopulateArticle,
    populateArticle,
    getRecomendArticle,
    recommendList,
    populateList
  }
}
