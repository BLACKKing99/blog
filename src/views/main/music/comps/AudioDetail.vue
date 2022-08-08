<template>
  <div class="audio-detail">
    <div class="audio-detail-lyric">
      <ul class="audio-detail-lyric-title">
        <li class="title-singer">
          {{ musicStore.currentMusicInfo.singer }}
        </li>
        <li class="title-song">
          {{ musicStore.currentMusicInfo.musicName }}
        </li>
      </ul>
      <div class="audio-detail-lyric-content">
        <el-scrollbar ref="lyricScroll">
          <ul class="lyric-container">
            <li
              v-for="(item,index) in musicStore.currentLyric"
              :key="index"
              :class="[
                handleLrcActive(item,index)?'lyric-active':''
              ]"
              class="lyric-container-item"
              @mouseenter="item.active = true"
              @mouseleave="item.active = false"
            >
              <el-divider
                border-style="solid"
                :class="item.active?'divider-active':''"
              />
              <span class="lyric-container-item-content">{{ item.lrc }}</span>
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
          </ul>
        </el-scrollbar>
      </div>
    </div>
    <ul class="audio-detail-recommend">
      <li class="audio-detail-recommend-title">
        {{ musicStore.currentMusicInfo.singer }}
        &nbsp;
        <i class="iconfont icon-double-arrow-right-full" />
      </li>
      <li class="audio-detail-recommend-list">
        <el-scrollbar>
          <ul class="list-container">
            <li
              class="list-container-item"
              v-for="item in 10"
              :key="item"
            >
              <div class="list-container-item-img">
                <img src="@/assets/img/avatar/avatar-bg.jpg">
              </div>
              <div class="list-container-item-detail">
                <div class="song">
                  你所知道的
                </div>
                <div class="singer">
                  裴佳欣
                </div>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ISingerList, getSingerList } from '@/api2/module/song'
import { useMusicStore, IMusicLyric } from '@/sotre/module/music'
import { ElScrollbar } from 'element-plus'

const musicStore = useMusicStore()
// 初始化歌词
musicStore.initMusicInfo()

// 歌手唱的歌曲列表

// const singerSongList = ref<>([])

// 歌词滚动的ref
const lyricScroll = ref<InstanceType<typeof ElScrollbar> | null>(null)

// const lyrPosition = ref<number>(0)

// 判断是否活跃
// const isActive = ref<boolean>(false)

const PlayLrcMusic = (item:IMusicLyric) => {
  if (musicStore.audioRef) {
    musicStore.audioRef.currentTime = item.time / 1000
  }
}

const handleLrcActive = (item:IMusicLyric, index:number):boolean => {
  if (item.time <= musicStore.currentMusicTime && musicStore.currentLyric[index + 1]?.time >= musicStore.currentMusicTime) {
    return true
  } else {
    return false
  }
}
// 获取歌手对应的音乐
const getSingerListData = async (value:ISingerList) => {
  const { data } = await getSingerList(value)
  console.log(data)
}

watch(() => musicStore.currentMusicInfo.singerId, (id) => {
  getSingerListData({
    id,
    limit: 20
  })
}, {
  immediate: true
})

// watch(() => musicStore.currentMusicTime, () => {
//   if (isActive.value === true) {
//     isActive.value = false
//   }
// })
// watch(() => isActive.value, (val) => {
//   if (val) {
//     if (lyricScroll.value) {
//       console.log(33333)

//       lyricScroll.value.scrollTo({ top: lyrPosition.value, behavior: 'smooth' })
//     }
//   }
// })

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
            font-size: 18px;
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
          cursor: pointer;
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
        }
      }
    }
  }
}
</style>
