<template>
  <div class="audio-list">
    <div class="audio-list-container">
      <div class="header">
        <el-input
          v-model="searchText"
          placeholder="请输入需要搜索的内容"
        />
        <div class="header-tab">
          <span
            :class="tabActive === 'list' ? 'tab-active' : ''"
            @click="tabActive = 'list'"
          >播放列表</span>
          <span class="header-tab-mid">|</span>
          <span
            :class="tabActive === 'history' ? 'tab-active' : ''"
            @click="tabActive = 'history'"
          >历史列表</span>
        </div>
      </div>
      <div class="container-content">
        <template v-if="true">
          <el-scrollbar>
            <transition name="audio-add-list">
              <div
                class="container"
                v-if="tabActive === 'list'"
              >
                <div
                  v-for="item in musicList"
                  :key="item.id"
                  class="container-item"
                >
                  <audio-history-list
                    :type="tabActive"
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
                  v-for="item in musicHistoryList"
                  :key="item.id"
                  class="container-item"
                >
                  <audio-history-list
                    :type="tabActive"
                    :info="item"
                  />
                </div>
              </div>
            </transition>
          </el-scrollbar>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useMusicStore } from '@/sotre/module/music'

const musicStore = useMusicStore()

const tabActive = ref<'list' | 'history'>('list')

const searchText = ref<string>('')

// 动态获取播放列表
const musicList = computed(() => {
  return musicStore.palyList?.filter(item => item.songName.indexOf(searchText.value) !== -1) || []
})

// 动态获取历史列表
const musicHistoryList = computed(() => {
  return musicStore.musicHistoryList?.filter(item => item.songName.indexOf(searchText.value) !== -1) || []
})

</script>

<style scoped lang='scss'>
@import '@/styles/animations.scss';
.audio-list {
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

  &-container {
    padding: 20px;
    box-sizing: border-box;
    height: 100%;

    .header {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 0 0 60px;

      &-tab {
        width: 260px;
        padding-left: 40px;

        &-mid {
          margin: 0 5px;
        }

        span {
          font-size: 14px;
          color: #fff;
          cursor: pointer;
          display: inline-block;
          transition: 0.3s;
        }

        .tab-active {
          color: $pink-color;
        }
      }
    }

    ::v-deep(.el-scrollbar) {
      width: 100%;
    }

    .container-content {
      display: flex;
      width: 100%;
      overflow: hidden;
      margin-top: 20px;
      height: calc(100% - 90px);
    }

    .container {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      &-item {
        margin-right: 1%;
        margin-bottom: 1%;
        width: 32%;
        height: 200px;
      }
    }
  }
}
</style>
