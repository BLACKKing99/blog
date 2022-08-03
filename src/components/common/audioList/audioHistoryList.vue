<template>
  <div class="audio-history-list">
    <div class="audio-history-list-cover">
      <img
        :class="musicStore.isPlayMusic && info.id === musicStore.currentMusicInfo.id?'audio-active':''"
        :src="info.cover"
      >
      <i
        class="iconfont"
        @click="handlePlayMusic"
        :class="musicStore.isPlayMusic && info.id === musicStore.currentMusicInfo.id ? 'icon-bofang' : 'icon-bofang1'"
      />
    </div>
    <div class="audio-history-list-title">
      {{ info.musicName }}
    </div>
    <div class="audio-history-list-name">
      {{ info.singer }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { PropType } from 'vue'
import { IMusicInfo, useMusicStore } from '@/sotre/module/music'

const musicStore = useMusicStore()

const props = defineProps({
  info: {
    type: Object as PropType<IMusicInfo>,
    default: () => ({})
  }
})

const handlePlayMusic = () => {
  if (props.info.id === musicStore.currentMusicInfo.id) {
    if (musicStore.audioRef?.paused) {
      musicStore.audioRef.play()
    } else {
      musicStore.audioRef?.pause()
    }
    return
  }
  musicStore.setCurrentMusic(props.info)
}
</script>

<style scoped lang='scss'>
@keyframes listCover {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
.audio-history-list{
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    &-cover{
        height: 70%;
        position: relative;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
          border-radius: 5px;
          display: inline-block;
          cursor: pointer;
          transition: 0.3s;
          &:hover{
            filter: blur(3px);
          }
        }
        .audio-active{
          animation: 6s linear listCover 1s infinite;
        }
        .iconfont{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            color: #fff;
            font-size: 30px;
            cursor: pointer;
            transition: 0.3s;
            &:hover{
              color: $pink-color;
            }
        }
    }
    &-title{
        height: 100%;
        height: 15%;
        font-size: 14px;
        display: flex;
        align-items: center;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &-name{
        height: 100%;
        height: 15%;
        font-size: 12px;
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
