import { getArticleType } from '@/api/module/article'
import { IArticleType } from '@/api/types/article'
import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  state: () => {
    return {
      categoryList: [] as IArticleType[]
    }
  },
  actions: {
    async setCategory () {
      const { code, data } = await getArticleType()
      if (code === 0) {
        this.categoryList = data
      }
    }
  },
  getters: {
    getCategory ():IArticleType[] {
      return this.categoryList
    },
    getCurrentCategory () {
      return (id:number) => {
        return this.categoryList.find(item => item.id === id)?.title
      }
    }
  }
})
