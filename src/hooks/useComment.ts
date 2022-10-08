import { createComment, getAllComment } from '@/api/module/article'
import { IComment, ICommentType } from '@/api/types/article'
import { Ref } from 'vue'

/*
id:文章的id
backCommentDialogVisible :是否是以弹窗的形式回复
*/
export const useComment = (id:number, backCommentDialogVisible?:Ref<boolean>) => {
  const commentList = ref<IComment[]>([])

  // 回复评论列表
  const backCommentList = ref<IComment[]>([])

  // 评论内容
  const commentText = ref<string>('')

  // 回复内容
  const backCommentText = ref<string>('')

  onMounted(() => {
    getComment()
  })
  const getComment = async () => {
    const { data, code } = await getAllComment(id)
    if (code === 0) {
      commentList.value = data.comment
      backCommentList.value = data.backComment
    }
  }

  const selectBack = (pid:number) => {
    const al = backCommentList.value.filter(item => item.pid === pid)

    return al
  }
  // 发表评论 和 回复评论
  const publishComment = async (value:IComment | null) => {
    if (!commentText.value && !backCommentText.value) {
      ElMessage({
        message: '评论内容不能为空',
        type: 'error'
      })
      return
    }
    const comment = {
      content: commentText.value,
      articleId: id
    } as ICommentType
    if (value) {
      comment.pid = value.id
      comment.content = backCommentText.value
    }
    const { code } = await createComment(comment)
    if (code === 0) {
      ElMessage({
        type: 'success',
        message: '评论成功'
      })
      if (value) {
        backCommentText.value = ''
        if (backCommentDialogVisible) {
          backCommentDialogVisible.value = false
        }
      } else {
        commentText.value = ''
      }
    }

    getComment()
  }
  return {
    getComment,
    selectBack,
    publishComment,
    backCommentText,
    backCommentList,
    commentList,
    commentText
  }
}
