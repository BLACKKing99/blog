import dayjs from 'dayjs'

// 格式化时间hooks
export default (time?:string | number, format?:string) => {
  format = format || 'YYYY-MM-DD'
  const formatTime = computed(() => {
    return dayjs(time).format(format)
  })

  const formatTimeTodo = (time:string | number, format:string = 'YYYY-MM-DD') => {
    return dayjs(time).format(format)
  }
  return {
    formatTime,
    formatTimeTodo
  }
}
