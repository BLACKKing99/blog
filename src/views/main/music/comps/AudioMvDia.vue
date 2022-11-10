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
        width: '720px',
        height: '630px',
        left: '50%',
        top: '50%',
      }"
    >
      <template #content>
        <ul class="mv-dia-content">
          <li class="w-full h-3/5">
            <video
              :src="videoUrl"
              loop
              :poster="mvDetail?.cover"
              ref="videoRef"
              class="w-full h-full object-cover"
            />
          </li>
          <li class="mv-dia-content-item flex">
            <div
              class="w-8 h-8"
              @click="playVideo"
            >
              <i
                v-if="isVideoPlay"
                class="iconfont icon-bofang duration-300 hover:text-theme text-gory1 text-3xl cursor-pointer"
              />
              <i
                v-else
                class="iconfont icon-bofang1 duration-300 hover:text-theme text-gory1 text-3xl cursor-pointer"
              />
            </div>
            <div class="flex-1 mx-4">
              <el-progress
                :percentage="videoTime"
                :show-text="false"
                color="#ff2e63"
              />
            </div>
            <span class="w-[60px] text-lg text-gory1">{{ updateTime }}</span>
            <div class="">
              <i
                @click="toggle"
                class="iconfont icon-quanping font-bold duration-300 hover:text-theme text-gory1 cursor-pointer text-xl"
              />
            </div>
          </li>
          <li class="mv-dia-content-item flex justify-between">
            <ul class="mv-dia-content-item-detail">
              <li class="text-2xl text-black1 font-bold text-ellipsis-1 w-[450px]">
                {{ mvDetail?.name }}
              </li>
              <li class="text-sm text-defalut">
                {{ mvDetail?.artistName }}
              </li>
            </ul>
            <ul class="mv-dia-content-item-detail">
              <li class="text-2xl text-black1 font-bold">
                {{ mvDetail?.playCount }}&nbsp;&nbsp;views
              </li>
              <li class="text-sm text-defalut">
                {{ mvDetail?.publishTime }}
              </li>
            </ul>
          </li>
        </ul>
      </template>
    </dialog-vue>
  </div>
</template>

<script lang='ts' setup>
import { getMvDetail, getMvUrl } from '@/api/module/music'
import { IMvDetail } from '@/api/types/music'
import DialogVue from '@/components/common/dialog/Dialog.vue'
import { useVideo } from '@/hooks/useVideo'
// 控制弹窗开关
const dialogVisiable = ref(false)

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

const videoUrl = ref<string>('')

const { videoRef, isVideoPlay, videoTime, updateTime, toggle } = useVideo(videoUrl)

// mv详情
const mvDetail = ref<IMvDetail | null>(null)

// 视频播放时间
const emit = defineEmits(['update:isView'])

const getMvDetailData = async (id:number) => {
  const { code, data } = await getMvDetail(id)
  if (code === 0) {
    mvDetail.value = data
    getMvUrlData(data.id)
  } else {
    ElMessage.error('获取mv详情失败')
  }
  loading.value = false
}

const getMvUrlData = async (id:number) => {
  const { data, code } = await getMvUrl(id)
  if (code === 0) {
    videoUrl.value = data.url
  }
}

const playVideo = () => {
  // 播放视频
  if (videoRef.value?.paused) {
    videoRef.value?.play()
  } else {
    videoRef.value?.pause()
  }
}

watch(
  () => props.isView,
  (val) => {
    if (val) {
      loading.value = true
      if (props.listData.listId !== mvDetail.value?.id) {
        getMvDetailData(props.listData.listId)
      }
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
        @apply w-full h-1/5 px-5 box-border flex items-center;
        &-detail{
          @apply flex flex-col justify-evenly h-full;
        }
      }
    }
  }
}
</style>
