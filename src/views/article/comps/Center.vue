<template>
  <div class="center">
    <!-- 文章头部 -->
    <div class="center-top">
      <div class="title text-ellipsis-1">
        {{ articleInfo.title }}
      </div>
      <div class="tips text-ellipsis-1">
        简介 : {{ articleInfo.tips }}
      </div>
      <ul class="synopsis flex">
        <li><i>#</i>{{ articleStore.getCurrentCategory(articleInfo.categoryId) }}</li>
        <li><i class="iconfont icon-shijian" />{{ formatTime(articleInfo.createdAt).value }}</li>
        <li><i class="iconfont icon-yueduliang" />{{ articleInfo.priview }}次浏览</li>
        <li>
          <i class="iconfont icon-pinglun1" />{{
            false
              ? '暂无评论'
              : `0条评论`
          }}
        </li>
      </ul>
    </div>
    <!-- 文章内容 -->
    <div
      class="center-preview-content"
      v-html="context"
      ref="contentRef"
    />
    <!-- 底部评论相关 -->
    <div
      class="center-comment"
      id="comment"
    >
      <div class="">
        <div class="comment-publish">
          <div class="comment">
            <el-input
              placeholder="请输入评论内容"
              type="textarea"
              resize="none"
              v-model="commentText"
            />
          </div>
          <div class="publish">
            <button
              class="l-button publish-btn"
              @click="publishComment(null)"
            >
              发表评论
            </button>
          </div>
        </div>
        <Emoji
          title=""
          placement="bottom"
          trigger="click"
          :width="400"
          @pick-emoji="pickCommentEmoji"
        >
          <span class="look"><i class="iconfont icon-biaoqing" /> 表情</span>
        </Emoji>
      </div>
      <template v-if="commentList.length === 0">
        <div class="no-comment">
          该文章暂时还没有评论哦~~~
        </div>
      </template>
      <template v-else>
        <div class="comment-list">
          <div
            class="comment-item"
            v-for="comment in commentList"
            :key="comment.id"
          >
            <div class="comment-item-left">
              <div class="comment-item-avatar">
                <img
                  :src="$imgUrl + comment.author.avatar"
                  alt="头像"
                >
              </div>
            </div>
            <div class="comment-item-right">
              <div class="comment-item-name">
                {{ comment.author.name }}
              </div>
              <div class="comment-item-content">
                {{ comment.content }}
              </div>
              <div class="comment-item-time">
                <span>{{ formatTime(comment.createdAt, 'YYYY-MM-DD HH:mm:ss').value }}</span>
                <span
                  v-if="isLogin"
                  class="back-comment"
                  @click="handleBackComment(comment)"
                >回复</span>
              </div>
              <div
                class="comment-item-backcomment"
                v-if="selectBack(comment.id).length !== 0"
              >
                <div
                  class="back-comment-item"
                  v-for="backComment in selectBack(comment.id)"
                  :key="backComment.id"
                >
                  <div class="back-comment-item-left">
                    <div class="back-comment-item-avatar">
                      <img
                        :src="$imgUrl + backComment.author.avatar"
                        alt="头像"
                      >
                    </div>
                    <div class="back-comment-item-name">
                      {{ backComment.author.name }}
                    </div>
                    <div class="back">
                      回复
                    </div>
                    <div class="back-comment-item-backname">
                      @{{ comment.author.name }}:
                    </div>
                    <div class="back-comment-item-content text-ellipsis-1">
                      {{ backComment.content }}
                    </div>
                  </div>
                  <div class="back-comment-item-right">
                    <div class="back-comment-item-time">
                      <span>{{ formatTime(backComment.createdAt as string, 'YYYY-MM-DD HH:mm:ss').value }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <Dialog
      v-model:visiable="backCommentDialogVisible"
      :dialog-style="{
        bottom: '100px',
        width: '500px',
        height: '200px',
        left: '50%',
        zIndex:999
      }"
    >
      <template #title>
        <div class="back-comment-dialog-title">
          <span class="back">回复</span>
          <span class="name">{{ goBackComment?.author?.name }}</span>
          <span
            class="close"
            @click="cancleBackComment"
          ><i class="iconfont icon-close" /></span>
        </div>
      </template>
      <template #content>
        <div class="back-comment-dialog-content">
          <div class="back-comment-dialog-content-content">
            <el-input
              placeholder="请输入回复内容"
              type="textarea"
              resize="none"
              v-model="backCommentText"
            />
            <Emoji
              title=""
              placement="top"
              trigger="click"
              :width="400"
              @pick-emoji="pickBackCommentEmoji"
            >
              <span class="look"><i class="iconfont icon-biaoqing" /> 表情</span>
            </Emoji>
          </div>
          <div class="back-comment-dialog-content-btn">
            <button
              class="l-button back-comment-dialog-content-btn-cancel"
              @click="cancleBackComment"
            >
              取消
            </button>
            <button
              class="l-button back-comment-dialog-content-btn-confirm"
              @click="publishComment(goBackComment)"
            >
              发布
            </button>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/base16/atlas.css'
import useElement, { IHElementType } from '@/hooks/useElement'
import { PropType } from 'vue'
import { IArticleInfo, IComment } from '@/api/types/article'
import useTimeFormat from '@/hooks/useTimeFormat'
import { useUser } from '@/hooks/useUser'
import { useArticleStore } from '@/sotre/module/article'
import { useComment } from '@/hooks/useComment'
import Emoji from './Emoji.vue'

// 定义高亮语法
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'js'
    return hljs.highlight(code, { language }).value
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

const articleStore = useArticleStore()

// props内容
const props = defineProps({
  articleInfo: {
    type: Object as PropType<IArticleInfo>,
    default: () => {
      return {}
    }
  }
})

const emit = defineEmits(['updateMenus', 'updateArticle'])

// 控制回复弹窗开启关闭
const backCommentDialogVisible = ref<boolean>(false)

// 菜单初始化
const menuContext = ref<IHElementType[]>([])

const goBackComment = ref<IComment | null>(null)

const { commentList, selectBack, publishComment, commentText, backCommentText } = useComment(props.articleInfo.id, backCommentDialogVisible)

// 获取文章菜单对应需要的hooks
const { contentRef, getContextMenu } = useElement()

// 判断是否登录
const { isLogin } = useUser()

// 格式化时间
const formatTime = (item: string, format: string = 'YYYY-MM-DD') => {
  return useTimeFormat(item, format).formatTime
}

// 初始化v-html中的内容
const context = computed(() => {
  return marked.parse(props.articleInfo.content || '')
})

const cancleBackComment = () => {
  backCommentDialogVisible.value = false
  goBackComment.value = null
}

// 打开回复弹窗
const handleBackComment = (value: IComment) => {
  backCommentDialogVisible.value = true
  goBackComment.value = value
  backCommentText.value = ''
}

// 选择表情

const pickCommentEmoji = (emoji:string) => {
  commentText.value = commentText.value + emoji
}

// 回复评论表情
const pickBackCommentEmoji = (emoji:string) => {
  backCommentText.value = backCommentText.value + emoji
}

onMounted(() => {
  // 挂载完成后获取菜单
  menuContext.value = getContextMenu()
})
// 监听菜单变化
watch(
  () => menuContext.value,
  (val) => {
    emit('updateMenus', val)
  }
)

</script>

<style scoped lang="scss">
@import '@/styles/animations.scss';

.center {
  width: 100%;
  min-height: calc(100vh - 40px);
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;

  .look {
    margin-top: 10px;
    display: inline-block;
    cursor: pointer;
    border: solid 1px #f2f2f2;
    // box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
    font-size: $font-mini;
    padding: 2px 5px;
    border-radius: 10px;
  }

  &-top {
    border-bottom: solid 1px #ccc;
    padding-bottom: 20px;

    .title {
      font-size: $font-larget;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .synopsis {
      li {
        margin-right: 10px;
        font-size: $font-mini;
        color: rgb(160, 160, 160);
        display: flex;
        align-items: center;

        i {
          margin-right: 5px;
        }
      }
    }

    .tips {
      margin: 20px 0 10px 0;
      font-size: 14px;
      color: rgb(160, 160, 160);
    }
  }

  &-preview-content {
    margin-top: 20px;
    box-sizing: border-box;
  }

  &-comment {
    margin-top: 20px;
    padding-top: 20px;
    border-top: solid 1px #ccc;
    display: flex;
    flex-direction: column;

    .comment-publish {
      display: flex;
    }

    .comment {
      flex: 1;
    }

    .el-input {
      margin-bottom: 20px;
    }

    .publish {
      display: flex;
      justify-content: flex-end;
      width: 100px;

      .l-button {
        width: 100%;
        margin-left: 10px;
        background-color: $pink-color;
      }
    }

    .no-comment {
      margin-top: 20px;
      width: 100%;
      background-color: #f5f5f5;
      padding: 7px;
      cursor: pointer;
      text-align: center;
      font-size: $font-mini;
      color: #000;
    }

    .comment-list {
      margin-top: 20px;

      .comment-item {
        display: flex;
        padding: 10px 0;
        border-bottom: 2px #f5f5f5 solid;

        &-left {
          margin-right: 20px;

          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
          }
        }

        &-right {
          flex: 1;

          .comment-item-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .comment-item-content {
            font-size: 14px;
            margin-bottom: 5px;
          }

          .comment-item-time {
            font-size: $font-mini;
            color: rgb(160, 160, 160);

            .back-comment {
              margin-left: 10px;
              cursor: pointer;
              color: #000;
            }
          }

          .comment-item-backcomment {
            margin-top: 10px;
            margin-left: 20px;

            .back-comment-item {
              display: flex;
              flex-direction: column;
              margin-bottom: 5px;

              &-left {
                display: flex;
                align-items: center;

                img {
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  cursor: pointer;
                }

                .back {
                  font-size: 12px;
                }

                .back-comment-item-backname {
                  font-size: 12px;
                  color: #333;
                  font-weight: bold;
                  margin: 0 5px;
                  cursor: pointer;

                  &:hover {
                    color: $pink-color;
                  }
                }

                .back-comment-item-name {
                  font-size: 13px;
                  font-weight: bold;
                  margin: 0 10px;
                }

                .back-comment-item-content {
                  font-size: 13px;
                }
              }

              &-right {
                .back-comment-item-time {
                  font-size: $font-mini;
                  color: rgb(160, 160, 160);
                }
              }
            }
          }
        }
      }
    }
  }

  .back-comment-dialog {
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 100px;
    background-color: #fff;
    width: 500px;
    height: 200px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    left: 50%;
    transform: translateX(-50%);

    &-title {
      font-size: $font-small;
      font-weight: bold;
      margin-bottom: 20px;
      display: flex;

      .back {
        margin-right: 10px;
      }

      .name {
        flex: 1;
      }

      .close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        transition: 0.3s;
        color: #333;
        cursor: pointer;
        display: inline-block;

        &:hover {
          transform: rotate(180deg);
          color: $pink-color;
          background-color: #f5f5f5;
        }
      }
    }

    &-content {
      flex: 1;
      display: flex;
      flex-direction: column;

      &-content {
        flex: 1;
      }

      &-btn {
        text-align: right;

        &-cancel {
          margin-right: 20px;
        }

        .l-button {
          background-color: $pink-color;
          font-size: $font-mini;
          color: #fff;
          cursor: pointer;
          padding: 5px 20px;
        }
      }
    }
  }
}
</style>
