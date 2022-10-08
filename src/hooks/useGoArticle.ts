export const useGoArticle = () => {
  const router = useRouter()
  const goArticle = (id:number) => {
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
