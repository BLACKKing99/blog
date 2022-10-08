<template>
  <div class="article-list flex">
    <div class="list-header flex-c">
      <img
        class="list-header-img"
        :src="articleInfo.cover?$imgUrl+articleInfo.cover:img"
      >
      <div class="list-header-content flex-c">
        <span class="classify">{{ handleType(articleInfo.categoryId) }}</span>
        <p class="title">
          {{ articleInfo.title }}
        </p>
        <span class="tips">
          {{ articleInfo.tips }}
        </span>
      </div>
    </div>
    <div class="list-foot flex">
      <div class="flex">
        <div class="list-foot-info flex items-center">
          <i class="iconfont icon-yanchurili" />
          <span>{{ formatTime }}</span>
        </div>
        <div class="list-foot-info flex items-center">
          <i class="iconfont icon-pinglun1" />
          <span>{{ 99 }}条评论</span>
        </div>
        <div class="list-foot-info flex items-center">
          <i class="iconfont icon-yueduliang" />
          <span>999次阅读</span>
        </div>
      </div>
      <div
        class="flex-r list-foot-read"
        @click="goArticle(articleInfo.id)"
      >
        <i class="iconfont icon-yiyueduyoujian" />
        <span>点击阅读</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IArticleInfo } from '@/api/types/article'
import img from '@/assets/img/photos/1.jpg'
import { useGoArticle } from '@/hooks/useGoArticle'
import useTimeFormat from '@/hooks/useTimeFormat'
import { useArticleStore } from '@/sotre/module/article'

const props = defineProps({
  articleInfo: {
    type: Object as PropType<IArticleInfo>,
    default: () => {
      return {}
    }
  }
})

const useArticle = useArticleStore()

// 由于返回的字段需要处理一下，所以这里需要自己处理一下
const handleType = (key:number) => {
  const type = useArticle.getCategory.find(item => item.id === key)
  return type?.title
}
const { goArticle } = useGoArticle()

const { formatTime } = useTimeFormat(props.articleInfo.createdAt)

</script>

<style scoped lang="scss">
.article-list {
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  &:hover {
    .list-header {
      &-img {
        filter: blur(3px);
      }
      &-content {
        .tips {
          opacity: 1;
          filter: blur(0);
        }
        .classify {
          transform: translateY(-20px);
          opacity: 0;
          filter: blur(3px);
        }
        .title {
          transform: translateY(20px);
          opacity: 0;
          filter: blur(3px);
        }
      }
    }
  }
  .list-header {
    flex: 1;
    position: relative;
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      transition: 0.4s;
    }
    &-content {
      position: relative;
      z-index: 999;
      width: 100%;
      .tips {
        display: inline-block;
        white-space: nowrap;
        position: absolute;
        font-size: $font-small;
        opacity: 0;
        transition: 0.4s;
        width: 100%;
        filter: blur(3px);
        transform: translateX(-50%);
        left: 50%;
        color: #666;
        text-align: center;
      }
      .title {
        color: #fff;
        display: inline-block;
        transition: 0.4s;
        font-size: $font-larget;
      }
      .classify {
        margin-bottom: 10px;
        transition: 0.4s;
        display: inline-block;
        background: $pink-color;
        box-sizing: border-box;
        padding: 5px;
        font-size: $font-mini;
        color: #fff;
        font-weight: 600;
        border-radius: 5px;
      }
    }
  }
  .list-foot {
    height: 30px;
    padding: 5px 10px;
    align-items: center;
    justify-content: space-between;
    &-info {
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        span,
        .iconfont {
          color: $pink-color;
        }
      }
      span {
        font-size: $font-mini;
        margin-left: 5px;
        transition: 0.3s;
      }
      .iconfont {
        font-size: $font-small;
        transition: 0.3s;
      }
    }
    &-read {
      &:hover {
        .iconfont,
        span {
          color: $pink-color;
        }
      }
      cursor: pointer;
      span {
        margin-left: 5px;
        font-size: $font-mini;
        transition: 0.3s;
      }
      .iconfont {
        transition: 0.3s;
      }
    }
  }
}
</style>
