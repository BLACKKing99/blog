<template>
  <div class="audio-play">
    <ul
      v-if="musicStore.currentMusicInfo.url"
      class="audio-play-container"
    >
      <li class="audio-play-container-info">
        <div class="cover">
          <img :src="musicStore.currentMusicInfo?.cover">
        </div>
        <div class="info">
          <span class="info-title">{{ musicStore.currentMusicInfo?.musicName }}</span>
          <span class="info-author">{{ musicStore.currentMusicInfo?.singer }}</span>
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
            title="暂停"
            @click="handlePlay"
            class="iconfont"
            :class="audioRef.paused ? 'icon-bofang1' : 'icon-bofang'"
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
            <!-- <Progress
              :current-time="currentTime"
              @line-click="handleCurrentTime"
            /> -->
            <el-slider
              v-model="currentTime"
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
import { PropType } from 'vue'
import { useMusicStore } from '@/sotre/module/music'

const props = defineProps({
  audioRef: {
    type: Object as PropType<HTMLAudioElement>,
    default: () => ({})
  }
})

const musicStore = useMusicStore()

// 当前播放到第几首音乐了
const currentIndex = ref(0)

// 总共的时间
const totalTime = computed(() => {
  const { formatTime } = useTimeFormat(musicStore.currentMusicInfo?.totalTime, 'mm:ss')
  return formatTime.value
})
// 更新的时间
const updateTime = ref<string>('00:00')
// 进度条的百分比
const currentTime = ref(0)
// 声音的百分比
const voice = ref(100)
// 控制声音的显示隐藏
const isShowVoice = ref(false)

// 由于需要随时更新所以说需要设置一个定时器
let timer: NodeJS.Timer

const handlePlay = () => {
  if (props.audioRef.paused) {
    props.audioRef.play()
  } else {
    props.audioRef.pause()
    clearInterval(timer)
  }
}

const handlePrev = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = musicStore.musicList.length - 1
  } else {
    currentIndex.value -= 1
  }
  musicStore.setCurrentMusic(currentIndex.value)
  props.audioRef.play()
}

const handleNext = () => {
  if (currentIndex.value === musicStore.musicList.length - 1) {
    currentIndex.value = 0
  } else {
    currentIndex.value += 1
  }
  musicStore.setCurrentMusic(currentIndex.value)
  props.audioRef.play()
}

const handleCurrentTime = (value: number) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.audioRef.currentTime = (props.audioRef.duration * value) / 100
}

const handleVolume = (value:number) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.audioRef.volume = value / 100
}

watch(
  () => props.audioRef,
  (val) => {
    // 监听 audioRef 更新
    if (val) {
      val.addEventListener('timeupdate', () => {
        // 监听音乐实时变化
        const { formatTime } = useTimeFormat(val.currentTime * 1000, 'mm:ss')
        updateTime.value = formatTime.value
        currentTime.value = (val.currentTime / val.duration) * 100
      })
      val.addEventListener('ended', () => {
        // 监听音乐播放结束
        handleNext()
      })
      val.addEventListener('play', () => {
        musicStore.isPlayMusic = true
      })
      val.addEventListener('pause', () => {
        musicStore.isPlayMusic = false
      })
    }
  },
  {
    deep: true
  }
)
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
