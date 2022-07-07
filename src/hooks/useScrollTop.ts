import { ElScrollbar } from 'element-plus'
import { Ref } from 'vue'

// 需传入距离顶部的距离
export const useScrollTop = (topGap:Ref<number>) => {
  const scrollRef = ref<InstanceType<typeof ElScrollbar> | null>(null)
  const isTop = computed(() => {
    return topGap.value === 0
  })
  const handleBackTop = () => {
    scrollRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    handleBackTop,
    scrollRef,
    isTop
  }
}
