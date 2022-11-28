<template>
  <div class="home">
    <!-- 轮播图头部 -->
    <Banner />
    <!-- 列表 -->
    <div class="home-body flex">
      <div class="home-body-left ">
        <Left class="left" />
      </div>
      <div class="home-body-mid">
        <template
          v-for="item in list"
          :key="item.id"
        >
          <article-list
            :article-info="item"
            class="article-list"
          />
        </template>
        <div
          v-if="isBottom"
          class="text-center w-full text-gray-500 text-sm"
        >
          啊哦~ 到底啦！！！
        </div>
      </div>
      <div class="home-body-right">
        <Right class="right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Banner from './comps/preview/Banner.vue'
import Left from './comps/preview/Left.vue'
import Right from './comps/preview/Right.vue'

import { getArticle } from '@/api/module/article'
import { IArticleInfo, IArticleList } from '@/api/types/article'
import { useEventBus } from '@/hooks/useEventBus'

const { Buson } = useEventBus()

// 文章列表
const list = ref<IArticleInfo[]>([])

const isBottom = ref<boolean>(false)

const articleParam = {
  pageSize: 2,
  page: 1
}

onMounted(() => {
  getArticleList(articleParam)
})

Buson('scroll-bottom', () => {
  articleParam.page += 1
  getArticleList(articleParam)
})

const getArticleList = async (params:IArticleList) => {
  const { data, code } = await getArticle(params)
  if (code === 0) {
    if (data.length === 0) {
      isBottom.value = true
    }
    list.value.push(...data)
  }
}

</script>
<style scoped lang="scss">
.home {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  &-body{
    width: 100%;
    margin: 20px auto;
    justify-content: center;
    &-left{
      position: relative;
      width: 260px;
      .left{
        position: sticky;
        top: 10px;
      }
    }
    &-mid{
      width: 768px;
      margin: 0 40px;
      box-sizing: border-box;
      .article-list{
        width: 100%;
        height: 320px;
        margin-bottom: 20px;
      }
    }
    &-right{
      width: 300px;
            .right{
        position: sticky;
        top: 10px;
      }
    }
  }
}
</style>
