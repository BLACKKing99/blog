<template>
  <div
    class="music"
    @mousemove="handleMouseMove"
    @click="isAudioList = false"
  >
    <div class="music-history-list">
      <i
        class="iconfont icon-liebiao"
        :class="isAudioList?'list-open':''"
        @click.stop="openAudioList"
      />
    </div>
    <transition name="audio-list">
      <audio-list
        v-show="isAudioList"
        :audio-ref="audioRef"
        @click.stop="isAudioList = true"
      />
    </transition>
    <el-scrollbar>
      <div
        class="music-container-content"
      >
        <div class="music-detail-content">
          <audio-detail v-if="musicStore.currentMusicInfo.id" />
        </div>
        <AudioTabList
          @open-music-list="openMusicDia"
          @change-tab="changeTab"
        />
      </div>
    </el-scrollbar>
    <transition name="audio-play">
      <audio-play
        v-show="isAudioPlay"
        :audio-ref="audioRef"
      />
    </transition>
    <audio-song-dia
      v-if="listData.activeTab === 1"
      v-model:is-view="listData.isListShow"
      @play-music="handlePlayMusic"
      :list-data="listData"
    />
    <audio-singer-dia
      v-else-if="listData.activeTab === 2"
      v-model:is-view="listData.isListShow"
      :list-data="listData"
    />
    <audio-mv-dia
      v-else
      v-model:is-view="listData.isListShow"
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
import AudioTabList from './comps/AudioTabList.vue'
import AudioList from './comps/AudioList.vue'
import AudioSongDia from './comps/AudioSongDia.vue'
import AudioSingerDia from './comps/AudioSingerDia.vue'
import AudioMvDia from './comps/AudioMvDia.vue'
import AudioDetail from './comps/AudioDetail.vue'
import { debounce } from 'lodash'
import { useMusicStore } from '@/sotre/module/music'
import { useEventBus } from '@/hooks/useEventBus'

// 音乐实例
const audioRef = ref<HTMLAudioElement>()

// 控制底部音乐控制器显示隐藏
const isAudioPlay = ref(false)

// 控制弹窗显示隐藏
const listData = reactive({
  isListShow: false,
  listId: 0,
  activeTab: 1
})

// 是否打开音乐列表
const isAudioList = ref<boolean>(false)

// 音乐相关的pinia
const musicStore = useMusicStore()

// 事件总线

const { Buson } = useEventBus()

// 控制音乐播放器显示隐藏
const handleMouseMove = debounce((event: MouseEvent) => {
  if (event.clientY > 900) {
  // if (event.clientY > 800) {
    isAudioPlay.value = true
  } else if (event.clientY < 900) {
    isAudioPlay.value = false
  }
}, 300)

// 控制弹窗打开显示隐藏
const openMusicDia = (value:{activeTab:number, id:number}) => {
  listData.activeTab = value.activeTab
  listData.listId = value.id
  listData.isListShow = true
}

Buson('play-music', () => {
  audioRef.value?.play()
})

// 改变tab
const changeTab = (value:number) => {
  listData.activeTab = value
}

// 处理音乐播放
const handlePlayMusic = () => {
  audioRef.value?.play()
}

// 打开音乐列表
const openAudioList = () => {
  isAudioList.value = true
}

watch(() => audioRef.value, (val) => {
  musicStore.audioRef = val
})

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
  &-detail-content{
    height: 60vh;
    width: 100%;
  }
  &-container-content {
    margin-top: 20vh;
  }
  &-history-list{
    position: absolute;
    width: 36px;
    height: 50px;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    i{
      color: #fff;
      font-size: 36px;
      cursor: pointer;
      transition: 1s;
    }
    .list-open{
      color: $pink-color;
    }
  }
}
::v-deep(.el-scrollbar__view) {
  position: relative;
}
</style>
