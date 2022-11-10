<template>
  <div class="audio-history-list">
    <div class="audio-history-list-cover">
      <img
        :class=" isPlayCurrentMusic ? 'audio-active':''"
        :src="info.cover"
      >
      <i
        class="iconfont"
        @click="play(info)"
        :class="isPlayCurrentMusic ? 'icon-bofang' : 'icon-bofang1'"
      />
    </div>
    <div class="audio-history-list-title">
      {{ info.songName }}
    </div>
    <div class="audio-history-list-name">
      {{ info.singerInfo.name }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { PropType } from 'vue'
import { useMusicStore } from '@/sotre/module/music'
import { IMusicDetailInfo } from '@/views/main/music/comps/types'
import { useAudio } from '@/hooks/useAudio'
import { useMusic } from '@/hooks/useMusic'

const musicStore = useMusicStore()

const { isAudioPlay } = useAudio()

const { play } = useMusic()

const props = defineProps({
  info: {
    type: Object as PropType<IMusicDetailInfo>,
    default: () => ({})
  },
  type: {
    type: String as PropType<'list'|'history'>,
    default: 'list'
  }
})

const isPlayCurrentMusic = computed(() => {
  const flag = musicStore.currentMusicInfo.id === props.info.id
  if (flag && isAudioPlay.value) {
    return true
  } else {
    return false
  }
})
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
