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
import { IArticleInfo } from '@/api/types/article'

// 文章列表
const list = ref<IArticleInfo[]>([])

onMounted(() => {
  getArticleList()
})

const getArticleList = async () => {
  const { data, code } = await getArticle()
  if (code === 0) {
    list.value = data
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
