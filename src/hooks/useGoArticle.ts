export const useGoArticle = () => {
  const router = useRouter()
  const goArticle = (id:string) => {
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
