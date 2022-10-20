<template>
  <dialog-vue
    v-loading="loading"
    class="aduio-singer"
    v-model:visiable="dialogVisiable"
    :show-close="true"
    :dialog-style="{
      width: '1200px',
      height: '800px',
      left: '50%',
      top: '50%',
    }"
  >
    <template #title />
    <template #content>
      <div class="h-full flex flex-col">
        <div
          class="relative h-[50%] flex flex-col justify-end singer-cover bg-center bg-cover"
          :style="{
            backgroundImage: `url(${singerInfo.cover})`,
          }"
        >
          <!-- <img
            :src="singerInfo.cover"
            class="w-full h-full object-cover absolute left-0 right-0"
          > -->
          <div class="flex flex-col mb-5 z-10 relative px-5">
            <div class="text-[36px] text-theme font-bold mb-5">
              {{ singerInfo.name }}
            </div>
            <ul class="text-theme text-xs flex">
              <li class="mr-2">
                歌曲:{{ singerInfo.musicSize }}首
              </li>
              <li class="mr-2">
                MV:{{ singerInfo.mvSize }}首
              </li>
              <li class="mr-2">
                专辑:{{ singerInfo.albumSize }}首
              </li>
            </ul>
          </div>
        </div>
        <div class="h-[50%]">
          <Tabs
            v-model="activeTab"
            :tab-title="tabList"
            @tab-click="handleTabClick"
          >
            <template #music>
              <ul class="min-w-full flex flex-wrap">
                <el-scrollbar class="w-full">
                  <div class="w-full px-5">
                    <ul
                      v-for="music in 10"
                      :key="music"
                      class="grid grid-cols-3 h-10 items-center hover:bg-slate-100"
                    >
                      <li class="pl-1">
                        {{ music }}
                      </li>
                      <li>{{ music }}</li>
                      <li>{{ music }}</li>
                    </ul>
                    <div class="h-[60px] flex justify-end items-center">
                      <el-pagination
                        :current-page="pageInfo.currentPage"
                        :page-size="pageInfo.pageSize"
                        :small="true"
                        layout="prev, pager, next, jumper"
                        :total="pageInfo.totalSize"
                        @current-change="handleCurrentChange"
                      />
                    </div>
                  </div>
                </el-scrollbar>
              </ul>
            </template>
            <template #zhuanji>
              <ul class="min-w-full flex flex-wrap">
                <li class="album-content tab-content-item">
                  <el-scrollbar>
                    <ul class="flex flex-wrap">
                      <li
                        v-for="item in 10"
                        :key="item"
                        class="w-[300px] h-[300px] flex justify-center items-center"
                      >
                        <div
                          class="w-[85%] h-[85%] flex items-end flex-col justify-end bg-center bg-cover cursor-pointer album-content-item"
                          :style="{
                            backgroundImage: `url(${singerInfo.cover})`,
                          }"
                        >
                          <div
                            class="h-10 bg-[rgba(255,255,255,.8)] text-[rgba(255,255,255)] opacity-[0.2] w-full px-3 duration-300 album-content-item-title"
                          >
                            林俊杰
                          </div>
                        </div>
                      </li>
                    </ul>
                  </el-scrollbar>
                </li>
              </ul>
            </template>
            <template #mv>
              <div class="min-w-full">
                <el-scrollbar>
                  <ul class="mv-content-container">
                    <li
                      class="mv-item"
                      v-for="item in 10"
                      :key="item"
                    >
                      <ul class="flex h-[230px] w-full">
                        <li class="w-[80%] box-border p-3 rounded-md">
                          <img
                            :src="singerInfo.cover"
                            class="w-full h-full object-cover rounded-md"
                          >
                        </li>
                        <li class="flex-1 grid grid-rows-3 items-center justify-items-center">
                          <div class="icon-item text-defalut shadow-sm">
                            <i class="iconfont icon-bilibili text-xl" />
                            <span class="text-xs">2222</span>
                          </div>
                          <div class="icon-item text-cyan-500 bg-cyan-300">
                            <i class="iconfont icon-bilibili text-xl" />
                            <span class="text-xs">2222</span>
                          </div>
                          <div class="icon-item text-theme bg-themeOcpy">
                            <i class="iconfont icon-bilibili text-xl" />
                            <span class="text-xs">2222</span>
                          </div>
                        </li>
                      </ul>
                      <div
                        class="h-[50px] text-sm flex flex-col items-start justify-start w-full px-3"
                      >
                        <el-popover
                          placement="top-start"
                          trigger="hover"
                        >
                          <div
                            class="w-full text-center overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            标题
                          </div>
                          <template #reference>
                            <span class="text-[#333] text-lg font-bold">标题</span>
                          </template>
                        </el-popover>
                        <span class="text-defalut text-sm">2022年08月22日</span>
                      </div>
                    </li>
                  </ul>
                </el-scrollbar>
              </div>
            </template>
          </Tabs>
        </div>
      </div>
    </template>
  </dialog-vue>
</template>

<script lang="ts" setup>
import DialogVue from '@/components/common/dialog/Dialog.vue'
import { getSingerDetail, getSingerList } from '@/api/module/music'
import { IMusicDetailInfo } from './types'
import { Artist } from '@/api/types/music'
// 控制弹窗开关
const dialogVisiable = ref(false)

// 加载 优化交互
const loading = ref(false)

const tabList = [
  {
    id: 0,
    value: 'music',
    title: '音乐'
  },
  {
    id: 1,
    value: 'zhuanji',
    title: '专辑'
  },
  {
    id: 2,
    value: 'mv',
    title: 'MV'
  }
]

// 活跃的tab
const activeTab = ref<number>(0)

const pageInfo = ref({
  currentPage: 1,
  pageSize: 10,
  totalSize: 0
})

const handleCurrentChange = () => {
  // 切页是进行的动作
}

// const singerInfo = reactive({
//   albumSize: 63,
//   cover: 'http://p2.music.126.net/dwbXimgQn1YnJzwSlPDk-A==/109951165911950321.jpg',
//   desc: undefined,
//   id: 3684,
//   musicSize: 529,
//   mvSize: 188,
//   name: '林俊杰'
// })

// 歌手歌单数据
const sheetList = ref<Record<number, IMusicDetailInfo[]>>({})

const singerInfo = ref<Artist | null>(null)

const emit = defineEmits(['update:isView', 'play-music'])

const props = defineProps({
  isView: {
    type: Boolean,
    default: false
  },
  listData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const handleTabClick = (data: number) => {
}

// eslint-disable-next-line no-unused-vars
const getSingerInfo = async (id: number) => {
  const { data } = await getSingerDetail(id)

  // 将接口中所需要的数据放到singerInfo中
  const singer = {
    ...data.artist
  }
  singerInfo.value = singer
  loading.value = false
}

watch(
  () => props.isView,
  (val) => {
    if (val) {
      // getSingerInfo(props.listData.listId)
      dialogVisiable.value = true
    }
  }
)

watch(
  () => dialogVisiable.value,
  (val) => {
    if (!val) {
      emit('update:isView', false)
    }
  }
)
</script>

<style scoped lang="scss">
.aduio-singer {
  padding: 0;
  ::v-deep(.back-comment-dialog-content) {
    height: 100%;
  }
  .tab-content {
    height: calc(100% - 70px);
    &-item {
      @apply w-full h-full;
    }
  }
  .album-content-item {
    position: relative;
    &::before {
      content: '';
      width: 80%;
      height: 80%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: #0f0f0f;
      z-index: -1;
      position: absolute;
      transition: 0.3s;
    }
    &:hover {
      .album-content-item-title {
        opacity: 1;
      }
      &::before {
        transform: translate(-25%, -50%);
      }
    }
    &-title {
      opacity: 0.2;
    }
  }
  .mv-content-container {
    @apply flex flex-wrap;
    .mv-item {
      @apply w-[400px] h-[280px] flex-col flex justify-center items-center;
      .icon-item {
        @apply w-[80%] h-[80%] flex justify-center items-center flex-col rounded-sm hover:shadow-md cursor-pointer duration-300;
      }
    }
  }
}
</style>
