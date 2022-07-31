<template>
  <div
    class="music"
    @mousemove="handleMouseMove"
  >
    <el-scrollbar>
      <div class="music-recommend">
        <AudioList @open-music-list="openMusicDia" />
      </div>
    </el-scrollbar>
    <transition name="audio-play">
      <audio-play
        v-show="isAudioPlay"
        :audio-ref="audioRef"
      />
    </transition>
    <audio-dia
      v-model:is-view="listData.isListShow"
      @play-music="handlePlayMusic"
      :list-data="listData"
    />
  </div>
  <audio
    :src="musicStore.currentMusicInfo?.url"
    autoplay
    ref="audioRef"
  />
</template>

<script lang="ts" setup>
import AudioPlay from './comps/AudioPlay.vue'
import AudioList from './comps/AudioTabList.vue'
import AudioDia from './comps/AudioDia.vue'
import { debounce } from 'lodash'
import { useMusicStore } from '@/sotre/module/music'
const audioRef = ref<HTMLAudioElement>()
// 控制底部音乐控制器显示隐藏
const isAudioPlay = ref(false)
// 控制弹窗显示隐藏
const listData = reactive({
  isListShow: false,
  listId: 0,
  activeTab: 1
})

const musicStore = useMusicStore()
// 控制音乐播放器显示隐藏
const handleMouseMove = debounce((event: MouseEvent) => {
  if (event.clientY > 800) {
    isAudioPlay.value = true
  } else if (event.clientY < 800) {
    isAudioPlay.value = false
  }
}, 300)

// 控制弹窗打开显示隐藏
const openMusicDia = (value:{activeTab:number, id:number}) => {
  listData.activeTab = value.activeTab
  listData.listId = value.id
  listData.isListShow = true
}

// 处理音乐播放
const handlePlayMusic = () => {
  audioRef.value?.play()
}

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
    margin-top: 30vh;
  }
}
::v-deep(.el-scrollbar__view) {
  position: relative;
}
</style>
