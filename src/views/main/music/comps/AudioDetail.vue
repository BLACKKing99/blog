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
        <el-scrollbar>
          <ul class="lyric-container">
            <li
              v-for="(item,index) in musicStore.currentLyric"
              :key="index"
              :class="[
                item.time <= musicStore.currentMusicTime && musicStore.currentLyric[index + 1]?.time >= musicStore.currentMusicTime?'lyric-active':''
              ]"
              class="lyric-container-item"
            >
              {{ item.lrc }}
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
import { useMusicStore } from '@/sotre/module/music'

const musicStore = useMusicStore()

musicStore.initMusicInfo()

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
