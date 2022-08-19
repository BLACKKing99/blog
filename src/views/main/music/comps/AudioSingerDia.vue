<template>
  <div
    class="detail"
    v-loading="loading"
  >
    <dialog-vue
      v-model:visiable="dialogVisiable"
      :dialog-style="{
        width: '1200px',
        height: '800px',
        left: '50%',
        top: '50%',
      }"
    >
      <template #title />
      <template #content>
        singer
      </template>
    </dialog-vue>
  </div>
</template>

<script lang='ts' setup>
import DialogVue from '@/components/common/dialog/Dialog.vue'
// 控制弹窗开关
const dialogVisiable = ref(false)

// 加载 优化交互
const loading = ref(false)

const emit = defineEmits(['update:isView', 'play-music'])

const props = defineProps({
  isView: {
    type: Boolean,
    default: false
  },
  listData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

watch(() => props.isView, (val) => {
  if (val) {
    dialogVisiable.value = true
  }
})

watch(() => dialogVisiable.value, (val) => {
  if (!val) {
    emit('update:isView', false)
  }
})

</script>

<style scoped lang='scss'>

</style>
