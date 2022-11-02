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
              <el-slider v-model="videoTime" />
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
              <li class="text-2xl text-black1 font-bold">
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
import { getMvDetail } from '@/api/module/music'
import { IMvDetail } from '@/api/types/music'
import DialogVue from '@/components/common/dialog/Dialog.vue'
import { useVideo } from '@/hooks/useVideo'
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

const videoUrl = 'https://vodkgeyttp8.vod.126.net/cloudmusic/5ad4/core/7246/9308cc8c00b318e641f69d14297692bf.mp4?wsSecret=cf2568aa4207151c142da3dbc75e94d2&wsTime=1667390907'

const { videoRef, isVideoPlay, videoTime, updateTime, toggle } = useVideo()

// mv详情
// const mvDetail = ref<IMvDetail | null>(null)
const mvDetail = ref<IMvDetail | null>({
  id: 10928277,
  name: '那年初夏',
  artistId: 9255,
  artistName: '任然',
  briefDesc: '',
  desc: '毕业就像是突如其来的终止符，将一切美好生活全部打散。就业、失业、相爱、离散、痛哭、迷惘、执念、手足无措、梦想奋斗……社会有多现实，奋斗就有多少艰辛，奋斗多艰辛，梦想就有多么珍贵。',
  cover: 'http://p1.music.126.net/MB9iRQKbhgnXANbI0QTJRA==/109951164909106319.jpg',
  coverId_str: '109951164909106319',
  coverId: 109951164909106320,
  playCount: 273135,
  subCount: 3243,
  shareCount: 1003,
  commentCount: 800,
  duration: 309000,
  nType: 0,
  publishTime: '2020-04-20',
  price: null,
  brs: [
    {
      size: 20769834,
      br: 240,
      point: 0
    },
    {
      size: 32745092,
      br: 480,
      point: 2
    },
    {
      size: 51149876,
      br: 720,
      point: 5
    },
    {
      size: 79591216,
      br: 1080,
      point: 10
    }
  ],
  commentThreadId: 'R_MV_5_10928277',
  videoGroup: []
})

// 视频播放时间
const emit = defineEmits(['update:isView'])

const getMvDetailData = async (id:number) => {
  const { code, data } = await getMvDetail(id)
  if (code === 0) {
    mvDetail.value = data
  } else {
    ElMessage.error('获取mv详情失败')
  }
  loading.value = false
}

const playVideo = () => {
  // 播放视频
  if (videoRef.value?.paused) {
    videoRef.value?.play()
  } else {
    videoRef.value?.pause()
  }
}

onMounted(() => {
  // getMvDetailData(10928277)
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
        @apply w-full h-1/5 px-5 box-border flex items-center;
        &-detail{
          @apply flex flex-col justify-evenly h-full;
        }
      }
    }
  }
}
</style>
