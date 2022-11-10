<template>
  <div class="audio-play">
    <ul
      v-if="musicStore.currentMusicInfo"
      class="audio-play-container"
    >
      <li class="audio-play-container-info">
        <div class="cover">
          <img :src="musicStore.currentMusicInfo?.cover">
        </div>
        <div class="info">
          <span class="info-title">{{ musicStore.currentMusicInfo?.songName }}</span>
          <span class="info-author">{{ musicStore.currentMusicInfo?.singerInfo.name }}</span>
        </div>
      </li>
      <li class="audio-play-container-todo">
        <div class="todo">
          <i
            title="顺序播放"
            class="iconfont icon-24gl-repeat2"
          />
          <i
            title="上一首"
            class="iconfont icon-shangyishoushangyige"
            @click="handlePrev"
          />
          <i
            :title="isAudioPlay?'暂停':'开始'"
            @click="handlePlay"
            class="iconfont"
            :class="isAudioPlay ? 'icon-bofang' : 'icon-bofang1'"
          />
          <i
            title="下一首"
            class="iconfont icon-xiayigexiayishou"
            @click="handleNext"
          />
          <i
            title="歌词"
            class="iconfont icon-geciweidianji"
          />
        </div>
        <div class="progress">
          <div class="progress-start">
            {{ updateTime }}
          </div>
          <div class="progress-center">
            <el-slider
              v-model="audioTime"
              size="small"
              :show-tooltip="false"
              @change="handleCurrentTime"
              @input="handleCurrentTime"
            />
          </div>
          <div class="progress-end">
            {{ totalTime }}
          </div>
        </div>
      </li>
      <li class="audio-play-container-listen">
        <div class="audio-play-container-listen-content">
          <div class="listen">
            <div class="listen-slider">
              <transition name="slider">
                <el-slider
                  v-if="isShowVoice"
                  v-model="voice"
                  vertical
                  height="100px"
                  @change="handleVolume"
                  @input="handleVolume"
                />
              </transition>
            </div>
            <i
              title="静音"
              class="iconfont icon-shengyin"
              @click="isShowVoice = !isShowVoice"
            />
          </div>
          <div class="list">
            <i
              title="播放列表"
              class="iconfont icon-liebiao"
            />
          </div>
        </div>
      </li>
    </ul>
    <ul v-else>
      请选择应
    </ul>
  </div>
</template>

<script lang="ts" setup>
import useTimeFormat from '@/hooks/useTimeFormat'
import { useMusicStore } from '@/sotre/module/music'
import { useAudio } from '@/hooks/useAudio'
import { useMusic } from '@/hooks/useMusic'

const { audioRef, isAudioPlay, updateTime, audioTime } = useAudio()

const { handlePlay } = useMusic()

const musicStore = useMusicStore()

// 总共的时间
const totalTime = computed(() => {
  const { formatTime } = useTimeFormat(musicStore.currentMusicInfo?.totalTime, 'mm:ss')
  return formatTime.value
})
// 声音的百分比
const voice = ref(100)
// 控制声音的显示隐藏
const isShowVoice = ref(false)

const handlePrev = () => {
  const currentMusic = musicStore.currentMusicInfo
  const list = musicStore.palyList
  let prev = list.findIndex(item => item.id === currentMusic.id)
  if (prev === 0) {
    prev = list.length - 1
  } else {
    prev -= 1
  }
  musicStore.playMusic(list[prev])
  audioRef.value?.play()
}

const handleNext = () => {
  const currentMusic = musicStore.currentMusicInfo
  const list = musicStore.palyList
  let prev = list.findIndex(item => item.id === currentMusic.id)
  if (prev === list.length - 1) {
    prev = 0
  } else {
    prev += 1
  }
  musicStore.playMusic(list[prev])
  audioRef.value?.play()
}

const handleCurrentTime = (value: number) => {
  // eslint-disable-next-line vue/no-mutating-props
  audioRef.value!.currentTime = (audioRef.value!.duration * value) / 100
}

const handleVolume = (value:number) => {
  // eslint-disable-next-line vue/no-mutating-props
  audioRef.value!.volume = value / 100
}

</script>

<style scoped lang="scss">
@import '@/styles/animations.scss';

.audio-play {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 130px;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 99999999;
  &-container {
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;

    &-info {
      width: 20%;
      height: 100%;
      display: flex;
      .cover {
        margin-right: 10px;
        img {
          height: 100%;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        flex: 1;
        &-title {
          font-size: $font-small;
          font-weight: bold;
          color: #333;
        }
        &-author {
          font-size: $font-mini;
          color: #ccc;
        }
      }
    }
    &-todo {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      .todo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        .icon-bofang,
        .icon-bofang1 {
          font-size: 36px;
          margin: 0 20px;
        }
        .icon-shangyishoushangyige,
        .icon-xiayigexiayishou {
          font-size: 24px;
        }
        .icon-geciweidianji {
          font-size: 20px;
          margin-left: 15px;
        }
        .icon-24gl-repeat2 {
          font-size: 20px;
          margin-right: 15px;
        }
        .iconfont {
          cursor: pointer;
          &:hover {
            color: $pink-color;
          }
        }
      }
      .progress {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 100%;
        .progress-start {
          font-size: $font-mini;
          color: #ccc;
        }
        .progress-center {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 10px;
        }
        .progress-end {
          font-size: $font-mini;
          color: #ccc;
        }
      }
    }
    &-listen {
      width: 20%;
      display: flex;
      height: 100%;
      &-content {
        height: 50px;
        display: flex;
        align-items: center;
        .listen {
          position: relative;
          .listen-slider {
            position: absolute;
            top: -100px;
            left: -50%;
            transform: translateX(35%);
            height: 100px;
          }
          .icon-shengyin {
            font-size: $font-larget;
            margin-right: 20px;
            cursor: pointer;
          }
        }
        .list {
          .icon-liebiao {
            font-size: $font-larget;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
