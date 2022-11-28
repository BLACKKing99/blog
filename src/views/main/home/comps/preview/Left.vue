<template>
  <div class="left">
    <time-comp
      :is-radius="true"
      class="time-comp"
    />
    <Tab
      class="article-tab"
      title="受欢迎的文章"
      ref="articleTab"
    >
      <template #body>
        <div
          class="article-tab-body flex"
          v-for="item in populateList"
          ref="tabContent"
          :key="item.id"
          @click="goArticle(item.id)"
        >
          <img
            :src="item.cover ? $imgUrl + item.cover:cover"
            class="img"
          >
          <div class="content flex">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="view">
              {{ item.priview }} view
            </div>
          </div>
        </div>
      </template>
    </Tab>
    <Tab
      class="article-link"
      title="友情链接"
    >
      <template #body>
        <ul class="article-link-body">
          <li
            class="article-link-body-item"
            v-for="item in 4"
            :key="item"
          >
            其实我也不知道写啥
          </li>
        </ul>
      </template>
    </Tab>
  </div>
</template>

<script lang="ts" setup>
import cover from '@/assets/img/list/1.jpg'
import { useArticle } from '@/hooks/useArticle'
import Tab from '@/components/common/tab/Tab.vue'
import { useEventBus } from '@/hooks/useEventBus'
import { useAnimation } from '@/hooks/useAnimation'

const { goArticle, getPopulateArticle, populateList } = useArticle()

const { Buson } = useEventBus()

const { addClass } = useAnimation()

const articleTab = ref<InstanceType<typeof Tab> | null>(null)

const tabContent = ref<HTMLDivElement[] | null>(null)

let isAddClass = false

onMounted(() => {
  getPopulateArticle()
})

Buson('scroll-event', (event:any) => {
  if (event.scrollTop >= (articleTab.value?.tabBody?.offsetTop as number) && isAddClass === false) {
    isAddClass = true
    addClass<HTMLDivElement>(tabContent)
  }
})

</script>

<style scoped lang="scss">
@import '@/styles/animations.scss';
.left {
  .time-comp {
    height: 130px;
  }
  .article-tab {
    margin-top: 20px;
    &-body {
      height: 55px;
      width: 100%;
      transform: translateX(150%);
      margin-bottom: 10px;
      cursor: pointer;
      &:hover{
          .img{
              transform: translate(-10px,-10px);
          }
      }
      .img {
        width: 55px;
        height: 55px;
        transition: 0.5s;
        border-radius: 5px;
      }
      .content {
        flex-direction: column;
        justify-content: space-between;
        margin-left: 10px;
        .title {
          font-size: $font-mini;
        }

        .view{
            font-size: $font-mini;
            color: #ccc;
        }
      }
    }
  }
  .article-link{
    margin-top: 20px;
    &-body{
      width: 100%;
      height: 100%;
      &-item{
        width: 100%;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        font-size: $font-mini;
        color: #000;
        padding: 0 5px;
        border-radius: 5px;
        background-color: #f5f5f5;
        margin-bottom: 10px;
        transition: 0.3s;
        &:hover{
          box-shadow: 0 3px 5px rgba(0,0,0,0.1);
        }
      }
    }
  }
}
</style>
