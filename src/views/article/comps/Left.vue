<template>
  <div class="left">
    <Tab
      class="article-tab"
      title="推荐文章"
      tab-position="left"
    >
      <template #body>
        <div
          class="article-tab-body flex"
          v-for="item in recommendList"
          :key="item._id"
          @click="goArticle(item._id)"
        >
          <img
            v-if="item.cover"
            :src="$imgUrl + item.cover"
            class="img"
          >
          <img
            v-else
            src="@/assets/img/list/1.jpg"
            class="img"
          >
          <div class="content flex">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="view">
              9999 views
            </div>
          </div>
        </div>
      </template>
    </Tab>
    <div class="left-todo">
      <ul class="left-todo-article flex-c">
        <li>
          <el-tooltip
            effect="dark"
            content="评论"
            placement="left"
          >
            <a
              href="#comment"
              class="iconfont icon-pinglun1"
            />
            <!-- <i class="iconfont icon-pinglun1" /> -->
          </el-tooltip>
        </li>
        <li>
          <el-tooltip
            effect="dark"
            :content="isCollect?'取消收藏':'收藏'"
            placement="left"
          >
            <i
              v-if="isCollect"
              class="iconfont icon-shoucangxiao"
              @click="updateCollect('2')"
            />
            <i
              v-else
              class="iconfont icon-shoucang"
              @click="updateCollect('1')"
            />
          </el-tooltip>
        </li>
      </ul>
      <div class="title-tips">
        <span>分享</span>
      </div>
      <ul class="left-todo-share">
        <li>
          <el-tooltip
            effect="dark"
            content="分享至微博"
            placement="left"
          >
            <i class="iconfont icon-xinlangweibo" />
          </el-tooltip>
        </li>
        <li>
          <el-tooltip
            effect="dark"
            content="分享至QQ"
            placement="left"
          >
            <i class="iconfont icon-QQ" />
          </el-tooltip>
        </li>
        <li>
          <el-tooltip
            effect="dark"
            content="分享至朋友圈"
            placement="left"
          >
            <i class="iconfont icon-weixin" />
          </el-tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCollect } from '@/hooks/useCollect'
import { recomendArticle } from '@/api/module/article'
import { IArticleInfo } from '@/api/types/article'
import { useGoArticle } from '@/hooks/useGoArticle'

const route = useRoute()

defineProps({
  articleInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const recommendList = ref<IArticleInfo[]>([])

onMounted(() => {
  getRecomendArticle()
})

// 获取推荐文章
const getRecomendArticle = async () => {
  const { data, status } = await recomendArticle()
  if (status === 200) {
    recommendList.value = data.data
  }
}

// 点击进入文章详情
const { goArticle } = useGoArticle()

// 处理收藏
const { isCollect, updateCollect } = useCollect(route.params.id as string)

</script>

<style scoped lang="scss">
.left {
  .article-tab {
    &-body {
      height: 55px;
      width: 100%;
      margin-bottom: 10px;
      cursor: pointer;
      &:hover {
        .img {
          transform: translate(-10px, -10px);
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

        .view {
          font-size: $font-mini;
          color: #ccc;
        }
      }
    }
  }
  &-todo {
    width: 100%;
    margin-top: 20px;
    &-article {
      width: 100%;
      li {
        &:nth-of-type(1) {
          margin-top: 0;
        }
      }
    }
    .title-tips {
      margin-top: 30px;
      width: 100%;
      text-align: right;
      span {
        font-size: $font-mini;
        display: inline-block;
        width: 40px;
        text-align: center;
      }
    }
    li {
      width: 100%;
      text-align: right;
      margin-top: 15px;
      i,a {
        display: inline-block;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #fff;
        text-align: center;
        line-height: 40px;
        font-size: $font-larget;
        color: $pink-color;
      }
    }
  }
}
</style>
