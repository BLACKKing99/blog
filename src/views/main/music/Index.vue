<template>
  <div
    class="music"
    @mousemove="handleMouseMove"
  >
    <el-scrollbar>
      <div class="music-recommend">
        <AudioList />
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
import AudioList from './comps/AudioList.vue'
import music1 from '@/assets/music/1.mp3'
import { debounce } from 'lodash'

const audioRef = ref<HTMLAudioElement>()
// 控制底部音乐控制器显示隐藏
const isAudioPlay = ref(false)

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
  }
}
::v-deep(.el-scrollbar__view) {
  position: relative;
}
</style>
