<template>
  <el-scrollbar
    ref="scrollRef"
    @scroll="handleScroll"
  >
    <div
      class="article"
      id="article"
    >
      <div class="article-bg">
        <img :src="articleInfo?.cover">
      </div>
      <div class="article-bottom">
        <img
          src="@/assets/img/article/1.png"
          alt=""
        >
      </div>
      <div
        class="article-backtop"
        @click="handleBackTop"
        :class="isTop?'':'article-is-top'"
      />
      <div class="article-info flex">
        <div class="article-info-recommend">
          <Left
            class="left"
            :article-info="articleInfo"
          />
        </div>
        <div class="article-info-content">
          <Center
            v-if="articleInfo?.content"
            class="center"
            :article-info="articleInfo"
            @update-menus="updateMenus"
            @update-article="updateArticle"
          />
        </div>
        <div class="article-info-list">
          <Right
            class="right"
            :top-gap="topGap"
            :context-menu="contextMenu"
          />
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import Left from './comps/Left.vue'
import Center from './comps/Center.vue'
import Right from './comps/Right.vue'
import type { IHElementType } from '@/hooks/useElement'
import { getArticleInfo } from '@/api/module/article'
import { IArticleInfo } from '@/api/types/article'
import { useScrollTop } from '@/hooks/useScrollTop'
onMounted(() => {
  getArticleOneInfo()
})
const route = useRoute()
const articleInfo = ref<IArticleInfo>()

// 获取文章信息
const getArticleOneInfo = async () => {
  const { data, status } = await getArticleInfo(route.params.id as string)
  if (status === 200) {
    articleInfo.value = data.data
  }
}

const topGap = ref(0)
const handleScroll = (val: { scrollLeft: number; scrollTop: number }) => {
  topGap.value = val.scrollTop
}

const { handleBackTop, scrollRef, isTop } = useScrollTop(topGap)

// 文章菜单暂存
const contextMenu = ref<IHElementType[]>([])

// 初始化菜单
const updateMenus = (val: IHElementType[]) => {
  contextMenu.value = val
}
// 评论之后更新文章
const updateArticle = async (id: string) => {
  getArticleOneInfo()
}
</script>

<style scoped lang="scss">
.article {
  width: 100%;
  background-color: rgba($color: #f5f5f5, $alpha: 0.5);
  padding: 40px 0 200px 0;
  &-bg {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
  }
  &-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    transform: rotate(180deg);
    img {
      width: 100%;
    }
  }
  &-backtop {
    position: fixed;
    top: 0;
    right: 40px;
    width: 70px;
    height: 900px;
    transition: 0.5s;
    transform: translateY(-100%);
    background: url('@/assets/img/article/2.png');
    cursor: pointer;
  }
  &-is-top{
    transform: translateY(0);
  }
  .article-info {
    width: 100%;
    justify-content: center;
    &-recommend {
      width: 280px;
      box-sizing: border-box;
      margin-right: 20px;
      position: relative;
      .left {
        position: sticky;
        top: 40px;
        width: 260px;
      }
    }
    &-content {
      width: 830px;
      display: flex;
      justify-content: center;
      .center {
        margin: 0 40px;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      }
    }
    &-list {
      width: 280px;
      margin-left: 20px;
      .right {
        width: 260px;
        position: sticky;
        top: 40px;
      }
    }
  }
}
</style>
