<template>
  <div
    class="music"
    @mousemove="handleMouseMove"
  >
    <el-scrollbar>
      <div class="music-recommend">
        <div class="music-recommend-container">
          <span class="title">每日推荐</span>
          <ul class="content">
            <li
              class="content-tabbar"
              v-for="tab in tabbar"
              :key="tab.id"
            >
              {{ tab.title }}
            </li>
          </ul>
        </div>
      </div>
    </el-scrollbar>
    <transition name="audio-play">
      <audio-play
        v-show="isAudioPlay"
        :audio-ref="audioRef"
      />
    </transition>
  </div>
  <audio
    :src="music1"
    loop
    ref="audioRef"
  />
</template>

<script lang="ts" setup>
import AudioPlay from './comps/AudioPlay.vue'
import music1 from '@/assets/music/1.mp3'
import { getRecomendSong } from '@/api2/module/song'
import { debounce } from 'lodash'

const audioRef = ref<HTMLAudioElement>()
// 控制底部音乐控制器显示隐藏
const isAudioPlay = ref(false)
const tabbar = [
  {
    id: 1,
    title: '热门歌单'
  },
  {
    id: 2,
    title: '歌手'
  },
  {
    id: 3,
    title: '热门推荐'
  }
]

onMounted(() => {
  getCatList()
})
const getCatList = async () => {
  const res = await getRecomendSong()
  console.log(res)
}

const handleMouseMove = debounce((event: MouseEvent) => {
  if (event.clientY > 800) {
    isAudioPlay.value = true
  } else if (event.clientY < 800) {
    isAudioPlay.value = false
  }
}, 300)
</script>

<style scoped lang="scss">
@import '@/styles/animations.scss';
.music {
  width: 100%;
  height: 100%;
  transform: translate(0);
  background: fixed url('@/assets/img/music/bg.jpg') 0 0;
  background-size: cover;
  position: relative;
  .music-recommend {
    margin-top: 20vh;
    &-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      height: 30vh;
    }
  }
}
::v-deep(.el-scrollbar__view) {
  position: relative;
}
</style>
