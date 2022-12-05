<template>
  <div class="audio-detail">
    <div class="audio-detail-lyric">
      <ul class="audio-detail-lyric-title">
        <li class="title-singer">
          {{ musicStore.currentMusicInfo.singerInfo.name }}
        </li>
        <li class="title-song">
          {{ musicStore.currentMusicInfo.songName }}
        </li>
      </ul>
      <div class="audio-detail-lyric-content">
        <el-scrollbar
          ref="lyricScroll"
        >
          <ul
            class="lyric-container"
            ref="scrollContain"
          >
            <template v-if="musicStore.currentLyric.length !==0">
              <li
                v-for="(item,index) in musicStore.currentLyric"
                :key="index"
                :class="[
                  activeLrc === index ? 'lyric-active' : ''
                ]"
                class="lyric-container-item"
                @mouseenter="item.active = true"
                @mouseleave="item.active = false"
              >
                <el-divider
                  border-style="solid"
                  :class="item.active?'divider-active':''"
                />
                <span class="lyric-container-item-content">{{ item.word }}</span>
                <el-divider
                  content-position="center"
                  border-style="solid"
                  :class="item.active?'divider-active':''"
                >
                  <i
                    class="iconfont icon-Play"
                    title="点击播放到这"
                    @click="PlayLrcMusic(item)"
                  />
                </el-divider>
              </li>
            </template>
            <li v-else>
              暂无歌词
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
    <ul class="audio-detail-recommend">
      <li class="audio-detail-recommend-title">
        {{ musicStore.currentMusicInfo.singerInfo.name }}
        &nbsp;
        <i class="iconfont icon-double-arrow-right-full" />
      </li>
      <li class="audio-detail-recommend-list">
        <el-scrollbar>
          <ul class="list-container">
            <li
              class="list-container-item"
              v-for="item in singerSongList"
              :key="item.id"
            >
              <div class="list-container-item-img">
                <img :src="item.cover">
              </div>
              <div class="list-container-item-detail">
                <div class="song">
                  {{ item.songName }}
                </div>
                <div class="singer">
                  {{ item.singerInfo?.name }}
                </div>
              </div>
              <div
                class="list-container-item-todo"
                @click="play(item,singerSongList)"
              >
                <i
                  v-if="item.id === musicStore.currentMusicInfo.id && isAudioPlay"
                  class="iconfont icon-bofang"
                />
                <i
                  v-else
                  class="iconfont icon-bofang1"
                />
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { getSingerList } from '@/api/module/music'
import { IMusicLyric } from '@/api/types/music'
import { useAudio } from '@/hooks/useAudio'
import { useMusic } from '@/hooks/useMusic'
import { useMusicStore } from '@/sotre/module/music'
import { ElScrollbar } from 'element-plus'
import { IMusicDetailInfo } from './types'
import { throttle } from 'lodash'

const musicStore = useMusicStore()
// 初始化歌词
musicStore.initMusicInfo()

const { audioRef, isAudioPlay, activeLrc } = useAudio()

const { play } = useMusic()

// 歌手唱的歌曲列表
const singerSongList = ref<IMusicDetailInfo[]>([])

// 歌词滚动的ref
const lyricScroll = ref<InstanceType<typeof ElScrollbar> | null>(null)

// 滚动歌词整个容器的ref
const scrollContain = ref<HTMLUListElement | null>(null)

onMounted(() => {
  setTimeout(() => {
    const contentHeight = musicStore.currentLyric.length * 30
    audioRef.value?.addEventListener('timeupdate', throttle(() => posiCenter(lyricScroll.value?.$el.clientHeight, contentHeight, 30), 400))
  }, 500)
})

const posiCenter = (scrollHeight:number, lrcHeight:number, lrcItemHeight:number) => {
  /**
   * @param scrollHeight 整个滚动容器的高度
   * @param lrcHeight 整个scrollview的高度
   * @param lrcItemHeight 每个li的高度
   */
  let offset = 0

  offset = (activeLrc.value * lrcItemHeight + lrcItemHeight / 2) - scrollHeight / 2
  if (offset < 0) {
    offset = 0
  }

  if (offset >= lrcHeight - scrollHeight) {
    offset = lrcHeight - scrollHeight
  }

  lyricScroll.value?.scrollTo({ top: offset, behavior: 'smooth' })
}

const PlayLrcMusic = (item:IMusicLyric) => {
  if (audioRef.value) {
    audioRef.value.currentTime = item.time / 1000
  }
}

// 获取歌手对应的音乐
const getSingerListData = async (id:number) => {
  if (id) {
    const { data } = await getSingerList(id)
    const arr = data.hotSongs.map((item) => {
      return {
        id: item.id,
        songName: item.name,
        totalTime: item.dt,
        singerInfo: item.ar[0],
        cover: item.al.picUrl
      }
    }) as IMusicDetailInfo[]
    singerSongList.value.push(...arr)
  }
}

watch(() => musicStore.currentMusicInfo.singerInfo.id, (id) => {
  getSingerListData(id)
}, {
  immediate: true
})

</script>

<style scoped lang="scss">
.audio-detail {
  padding: 0 40px;
  height: 100%;
  display: flex;
  &-lyric {
    width: 50%;
    &-title {
      font-weight: bold;
      height: 70px;
      .title-singer {
        color: #fff9;
        font-size: 18px;
        margin-bottom: 10px;
      }
      .title-song {
        font-size: 28px;
        color: #fff;
      }
    }
    &-content{
        margin-top: 20px;
        height: calc(100% - 90px);
        .lyric-container{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          color: #fff;
          font-size: 14px;
          &-item{
            transition: 0.5s;
            width: 100%;
            text-align: center;
            display: flex;
            align-items: center;
            height: 30px;
            ::v-deep(.el-divider){
              margin: 0;
              opacity: 0;
              flex: 1;
              transition: 0.5s;
              .el-divider__text{
                background-color: transparent;
                font-size: 12px;
                cursor: pointer;
                color: #fff;
              }
            }
            &-content{
              margin: 0 5px;
            }
          }
          .divider-active{
            opacity: 1;
          }
          .lyric-active{
            color: $pink-color;
            transform: scale(1.3);
          }
        }
    }
  }
  &-recommend {
    width: 50%;
    height: 100%;
    &-title {
      display: flex;
      align-items: center;
      height: 70px;
      font-size: 18px;
      color: #fff;
      padding: 0 20px;
      cursor: pointer;
    }
    &-list {
      height: calc(100% - 90px);
      margin-top: 20px;
      box-sizing: border-box;
      .list-container {
        height: 100%;
        &-item {
          transition: 0.5s;
          height: 25%;
          padding: 5px 20px;
          display: flex;
          align-items: center;
          border-bottom: solid 1px #fff;
          background: transparent;
          &:hover {
            transform: scale(.99);
            background: rgba(0, 0, 0, 0.3);
          }
          &-img {
            height: 100%;
            display: flex;
            align-items: center;
            margin-right: 20px;
            img {
              width: 60px;
              height: 60px;
              object-fit: cover;
            }
          }
          &-detail {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            .song {
              font-size: 18px;
              color: #fff;
            }
            .singer {
              font-size: 14px;
              color: #fff9;
            }
          }
          &-todo{
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .iconfont{
              cursor: pointer;
              color: #fff;
              font-size: 24px;
              opacity: 0;
              transition: 0.5s;
            }
            &:hover{
              .iconfont{
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
