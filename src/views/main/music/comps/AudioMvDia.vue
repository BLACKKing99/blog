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
      111
    </dialog-vue>
  </div>
</template>

<script lang='ts' setup>
import DialogVue from '@/components/common/dialog/Dialog.vue'
// 控制弹窗开关
const dialogVisiable = ref(false)

// 加载 优化交互
const loading = ref(false)

const props = defineProps({
  isView: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isView'])

watch(
  () => props.isView,
  (val) => {
    if (val) {
      loading.value = true
      dialogVisiable.value = val
    }
  }
)
watch(
  () => dialogVisiable.value,
  (val) => {
    if (!val) {
      emit('update:isView', false)
    }
  }
)
</script>

<style scoped lang='scss'>

</style>
