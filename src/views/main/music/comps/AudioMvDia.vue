<template>
  <div
    class="detail"
    v-loading="loading"
  >
    <dialog-vue
      v-model:visiable="dialogVisiable"
      class="mv-dia"
      :show-close="false"
      :dialog-style="{
        width: '780px',
        height: '630px',
        left: '50%',
        top: '50%',
      }"
    >
      <template #content>
        <ul class="mv-dia-content">
          <li class="w-full h-3/5 bg-black">
            视频
          </li>
          <li class="mv-dia-content-item">
            进度条
          </li>
          <li class="mv-dia-content-item">
            详情
          </li>
        </ul>
      </template>
    </dialog-vue>
  </div>
</template>

<script lang='ts' setup>
import { getMvDetail } from '@/api/module/music'
import { IMvDetail } from '@/api/types/music'
import DialogVue from '@/components/common/dialog/Dialog.vue'
// 控制弹窗开关
const dialogVisiable = ref(true)

// 加载 优化交互
const loading = ref(false)

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

const mvDetail = ref<IMvDetail | null>(null)

const emit = defineEmits(['update:isView'])

const getMvDetailData = async (id:number) => {
  const { code, data } = await getMvDetail(id)
  if (code === 0) {
    mvDetail.value = data
  } else {
    ElMessage.error('获取mv详情失败')
  }
}

onMounted(() => {
  getMvDetailData(10928277)
})

watch(
  () => props.isView,
  (val) => {
    if (val) {
      loading.value = true
      getMvDetailData(props.listData.listId)
      dialogVisiable.value = true
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
.detail {
  .mv-dia{
    padding: 0 !important;
    &-content {
      @apply w-full h-full;
      &-item {
        @apply w-full h-1/5 px-5 box-border flex items-center justify-center;
      }
    }
  }
}
</style>
