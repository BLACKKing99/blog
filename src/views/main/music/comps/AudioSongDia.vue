<template>
  <div class="detail">
    <dialog-vue
      v-model:visiable="dialogVisiable"
      :dialog-style="{
        width: '1200px',
        height: '800px',
        left: '50%',
        top: '50%',
      }"
    >
      <template #title />
      <template #content>
        <div
          class="detail-container"
          v-loading="loading"
        >
          <div class="detail-container-desc">
            <div class="cover">
              <img :src="sheetDetail.cover">
            </div>
            <div class="desc">
              <div class="desc-title">
                {{ sheetDetail.name }}
              </div>
              <div class="desc-tags">
                <div
                  class="desc-tags-item"
                  v-for="item in sheetDetail.tags"
                  :key="item"
                >
                  {{ item }}
                </div>
              </div>
              <div class="desc-desc">
                <div class="desc-desc-container">
                  {{ sheetDetail.description }}
                </div>
              </div>
            </div>
          </div>
          <div class="detail-container-list">
            <div class="detail-container-list-title">
              歌单详情
            </div>
            <div class="detail-container-list-content">
              <div class="tab-header">
                <div class="tab-header-song">
                  歌名
                </div>
                <div class="tab-header-singer">
                  歌手
                </div>
                <div class="tab-header-todo">
                  操作
                </div>
              </div>
              <div class="tab-content">
                <div
                  class="tab-content-item"
                  v-for="item in sheetList[pageInfo.currentPage]"
                  :key="item.id"
                >
                  <div
                    class="tab-content-item-song"
                    @dblclick="handleMusicPlay(item)"
                  >
                    {{ item.songName }}
                  </div>
                  <div class="tab-content-item-sing">
                    {{ item.singerInfo.name }}
                  </div>
                  <div class="tab-content-item-todo">
                    <div
                      class="todo"
                      @click="handleMusicPlay(item)"
                    >
                      <i class="iconfont icon-Play" />
                    </div>
                    <div
                      class="todo"
                      @click="handleMusicListAdd(item)"
                    >
                      <i class="iconfont icon-jia" />
                    </div>
                    <div
                      class="todo"
                      @click="handleMusicDownLoad"
                    >
                      <i class="iconfont icon-xiazai" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-page">
                <el-pagination
                  v-if="isView"
                  v-model:currentPage="pageInfo.currentPage"
                  :page-size="pageInfo.pageSize"
                  :small="true"
                  layout="prev, pager, next, jumper"
                  :total="pageInfo.pageTotal"
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </dialog-vue>
  </div>
</template>

<script lang="ts" setup>
import DialogVue from '@/components/common/dialog/Dialog.vue'
import { getSheetList, getSheetDetail } from '@/api2/module/song'
import { ISheetDetail, IMusicDetailInfo } from './types'
import { useMusicStore } from '@/sotre/module/music'
import { dealMusicData } from './util'
const props = defineProps({
  isView: {
    type: Boolean,
    default: false
  },
  listData: {
    type: Object,
    default: () => {}
  }
})

const musicStore = useMusicStore()

const dialogVisiable = ref(false)
// 列表詳情
const sheetDetail = ref<ISheetDetail>({})
// 歌单列表
const sheetList = ref<Record<number, IMusicDetailInfo[]>>({})
// loading
const loading = ref(false)
const pageInfo = reactive({
  // 当前页
  currentPage: 1,
  // 每页多少
  pageSize: 10,
  pageTotal: 0
})
const emit = defineEmits(['update:isView', 'play-music'])
// 获取详情列表数据
const getSongListData = async () => {
  if (!loading.value) {
    loading.value = true
  }
  const { data } = await getSheetList({
    id: props.listData.listId,
    limit: pageInfo.pageSize,
    offset: (pageInfo.currentPage - 1) * pageInfo.pageSize
  })
  const songs = data.songs.map((item: any) => {
    return {
      id: item.id,
      songName: item.name,
      singerInfo: item.ar[0],
      cover: item.al.picUrl,
      totalTime: item.dt
    }
  })

  sheetList.value[pageInfo.currentPage] = songs
  // 关闭loading
  loading.value = false
}

const handleMusicPlay = (value:IMusicDetailInfo) => {
  // 处理播放音乐
  const obj = dealMusicData(value)

  musicStore.setCurrentMusicInfo(value.id, obj)
  setTimeout(() => {
    emit('play-music')
  }, 100)
}

const handleMusicListAdd = (value:IMusicDetailInfo) => {
  const obj = dealMusicData(value)
  musicStore.currentMusicInfo = reactive({
    ...musicStore.currentMusicInfo,
    ...obj
  })
  musicStore.addMusicList(value.id, obj)
}

const handleMusicDownLoad = () => {
  ElNotification.success({
    title: '提示',
    message: '暂时不支持下载哦~~~',
    showClose: false
  })
}

// 获取歌单详情
const getSheetDetailData = async () => {
  const { data } = await getSheetDetail({
    id: props.listData.listId
  })
  const detail = {
    cover: data.playlist.coverImgUrl,
    name: data.playlist.name,
    description: data.playlist.description,
    tags: data.playlist.tags
  }
  pageInfo.pageTotal = data.playlist.trackCount
  sheetDetail.value = detail
  getSongListData()
}
// 点击切页
const handleCurrentChange = (value:number) => {
  pageInfo.currentPage = value
  if (!sheetList.value[value]) {
    // 由于如果说每次切页的时候都要请求一次接口，这样子不太好，因此储存结构换下
    getSongListData()
  }
}

watch(
  () => props.isView,
  (val) => {
    if (val) {
      loading.value = true
      getSheetDetailData()
      dialogVisiable.value = val
    }
  }
)
watch(
  () => dialogVisiable.value,
  (val) => {
    if (!val) {
      sheetList.value = {}
      pageInfo.currentPage = 1
      emit('update:isView', false)
    }
  }
)
</script>

<style scoped lang="scss">
.detail {
  &-container {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    &-desc {
      height: 200px;
      width: 100%;
      display: flex;
      .cover {
        width: 200px;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
        }
      }
      .desc {
        flex: 1;
        height: 100%;
        padding-left: 40px;
        display: flex;
        flex-direction: column;
        &-title {
          font-size: 28px;
          font-weight: bold;
          height: 30px;
          line-height: 30px;
          margin: 20px 0;
        }
        &-tags {
          height: 20px;
          margin-bottom: 20px;
          display: flex;
          &-item{
            width: auto;
            height: 100%;
            border: solid #dedede 1px;
            border-radius: 5px;
            color: $pink-color;
            margin-right: 10px;
            padding: 2px 5px;
            font-size: 14px;
            cursor: pointer;
            background-color: rgba($color: $pink-color, $alpha: 0.1);
          }
        }
        &-desc {
          &-container {
            position: relative;
            text-align: justify;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            line-height: 22px;
            width: 100%;
            max-height: 90px;
            border-left: solid 5px $pink-color;
            padding-left: 20px;
          }
          flex: 1;
        }
      }
    }
    &-list{
      flex: 1;
      margin-top: 20px;
      &-title{
        font-weight: 700;
        margin-bottom: 10px;
      }
      &-content{
        display: flex;
        flex-direction: column;
        .tab-header{
          display: grid;
          grid-template-columns: 2fr 2fr 1fr;
          grid-auto-rows: 30px;
          padding: 0 10px;
          color: #909399;
          font-weight: bold;
          font-size: 12px;
        }
        .tab-content{
          &-item{
            display: grid;
            grid-template-columns: 2fr 2fr 1fr;
            grid-auto-rows: 40px;
            padding:0 10px;
            line-height: 40px;
            border-top: solid 1px #dedede;
            box-sizing: border-box;
            color: #606266;
            font-size: 14px;
            cursor: pointer;
            transition: 0.3s;
            border-radius: 5px;
            &-sing{
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: 460px;
            }
            &-song{
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: 460px;
            }
            &-todo{
              display: flex;
              align-items: center;
              .todo{
                width: 30px;
                height: 30px;
                margin-right: 10px;
                box-sizing: border-box;
                border: solid 1px #dedede;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover{
                  border-color: $pink-color;
                  .iconfont{
                    color: $pink-color;
                  }
                }
                .iconfont{
                  font-size: 12px;
                  color: #909399;
                  transform: scale(.9);

                }
              }
            }
            &:last-of-type{
              border-bottom: solid 1px #dedede;
            }
            &:hover{
              background-color: #f5f5f5;
            }
          }
        }
        .tab-page{
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          ::v-deep(.el-pagination){
            .btn-prev,.btn-next{
              &:hover{
                color: $pink-color;
              }
            }
            .el-pager{
              .number{
                &:hover{
                  color: $pink-color;
                }
              }
              .more {
                &:hover{
                  color: $pink-color;
                }
              }
              .is-active{
                color: $pink-color;
              }
            }
          }
          ::v-deep(.el-input__inner){
            padding-left:0 !important;
          }
        }
      }
    }
  }
}
</style>
