<template>
  <div class="audio-list">
    <div class="audio-list-container">
      <div class="header">
        <el-input
          @keydown="handleSearch"
          placeholder="请输入需要搜索的内容"
        />
        <div class="header-tab">
          <span
            :class="tabActive === 'list' ?'tab-active':''"
            @click="tabActive = 'list'"
          >播放列表</span>
          <span class="header-tab-mid">|</span>
          <span
            :class="tabActive === 'history' ?'tab-active':''"
            @click="tabActive = 'history'"
          >历史列表</span>
        </div>
      </div>
      <div class="container-content">
        <template v-if="true">
          <transition name="audio-add-list">
            <div
              class="container"
              v-if="tabActive === 'list'"
            >
              <div
                v-for="item in musicStore.musicList"
                :key="item.id"
                class="container-item"
              >
                <audio-history-list
                  @play-music="handlePlayMusic"
                  :info="item"
                />
              </div>
            </div>
          </transition>
          <transition name="audio-history-list">
            <div
              class="container"
              v-if="tabActive === 'history'"
            >
              <div
                v-for="item in musicStore.musicHistoryList"
                :key="item.id"
                class="container-item"
              >
                <audio-history-list
                  @play-music="handlePlayMusic"
                  :info="item"
                />
              </div>
            </div>
          </transition>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useMusicStore } from '@/sotre/module/music'
import { IMusicInfo } from './types.js'

const musicStore = useMusicStore()

const tabActive = ref<'list'|'history'>('list')

const handleSearch = (event:any) => {
  if (event.keyCode === 13) {
    console.log(222)
  }
}

const handlePlayMusic = (value:IMusicInfo) => {

}

</script>

<style scoped lang='scss'>
@import '@/styles/animations.scss';
.audio-list{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 30%;
  z-index: 99;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px 0 0;
  overflow: hidden;
  &-container{
    padding: 20px;
    box-sizing: border-box;
    .header{
      height: 50px;
      display: flex;
      align-items: center;
      padding:0 0 0 60px;
      &-tab{
        width: 260px;
        padding-left: 50px;
        &-mid{
          margin: 0 5px;
        }
        span{
          font-size: 14px;
          color: #fff;
          cursor: pointer;
          display: inline-block;
          transition: 0.3s;
        }
        .tab-active{
          color:$pink-color;
        }
      }
    }
    .container-content{
      display: flex;
      overflow: hidden;
    }
    .container{
      margin-top: 20px;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      &-item{
        margin-right: 1%;
        margin-bottom: 1%;
        width: 32%;
        height: 200px;
      }
    }
  }
}
</style>
