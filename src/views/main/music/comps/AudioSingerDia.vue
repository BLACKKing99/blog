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
            backgroundImage: `url(${singerInfo?.cover})`,
          }"
        >
          <div class="flex flex-col mb-5 z-10 relative px-5">
            <div class="text-[36px] text-theme font-bold mb-5">
              {{ singerInfo?.name }}
            </div>
            <ul class="text-theme text-xs flex">
              <li class="mr-2">
                歌曲:{{ singerInfo?.musicSize }}首
              </li>
              <li class="mr-2">
                MV:{{ singerInfo?.mvSize }}首
              </li>
              <li class="mr-2">
                专辑:{{ singerInfo?.albumSize }}首
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
                    <ul class="grid grid-cols-3">
                      <li class="singer-list-title pl-1">
                        歌名
                      </li>
                      <li class="singer-list-title">
                        歌手
                      </li>
                      <li class="singer-list-title">
                        操作
                      </li>
                    </ul>
                    <ul
                      v-for="item in sheetList[pageInfo.currentPage]"
                      :key="item.id"
                      class="grid grid-cols-3 h-10 items-center hover:bg-slate-100"
                    >
                      <li class="pl-1 singer-list-content">
                        {{ item.songName }}
                      </li>
                      <li class="singer-list-content">
                        {{ item.singerInfo.name }}
                      </li>
                      <li class="singer-list-content flex">
                        <div
                          class="todo"
                          @click="musicPlay(item)"
                        >
                          <i class="iconfont icon-Play" />
                        </div>
                        <div
                          class="todo"
                          @click="musicAdd(item)"
                        >
                          <i class="iconfont icon-jia" />
                        </div>
                        <div
                          class="todo"
                          @click="musicDownload"
                        >
                          <i class="iconfont icon-xiazai" />
                        </div>
                      </li>
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
                        v-for="item in ablumList"
                        :key="item.id"
                        class="w-[300px] h-[300px] flex justify-center items-center"
                      >
                        <div
                          class="w-[85%] h-[85%] flex items-end flex-col justify-end bg-center bg-cover cursor-pointer album-content-item"
                          :style="{
                            backgroundImage: `url(${item.picUrl})`,
                          }"
                        >
                          <div
                            class="album-content-item-title"
                          >
                            <span class="w-full text-sm overflow-hidden text-ellipsis whitespace-nowrap">{{ item.name }}</span>
                            <span class="text-xs">{{ formatTimeTodo(item.publishTime) }}</span>
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
                            :src="singerInfo?.cover"
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
import { getSingerDetail, getSingerAllList, getAlbum } from '@/api/module/music'
import { Artist, IHotAlbums } from '@/api/types/music'
import { IMusicDetailInfo } from './types'
import { useMusic } from '@/hooks/useMusic'
import useTimeFormat from '@/hooks/useTimeFormat'

// 控制弹窗开关
const dialogVisiable = ref(true)

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

const pageInfo = reactive({
  currentPage: 1,
  pageSize: 10,
  totalSize: 0
})

const { musicAdd, musicDownload, musicPlay } = useMusic()

const { formatTimeTodo } = useTimeFormat()

const handleCurrentChange = (value:number) => {
  // 切页是进行的动作
  pageInfo.currentPage = value
  if (sheetList.value[value] === undefined) {
    getSingerListData(value)
  }
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
// 歌手专辑列表
const ablumList = ref<IHotAlbums[] | null>(null)

// const singerInfo = ref<Artist | null>(null)
const singerInfo = ref<Artist | null>({ id: 3684, cover: 'http://p2.music.126.net/7636PzUiFMETHU7SAr05FA==/109951167878710661.jpg', name: '林俊杰', transNames: [], identities: ['作曲'], identifyTag: null, briefDesc: 'JJ林俊杰的创作来自最深的情感，他的声音唱出灵魂的璀璨，他把音乐和梦想当做能量，一路走到无人取代的地位，他写下华语乐坛最动人的经典乐章，撼动亚洲数十亿颗心跳。他是亚洲乐坛全能唱作天王 JJ 林俊杰。\n\n2003年首发第一张个人创作专辑《乐行者》，取得不俗成绩；其杰出的创作才能又在之后2004年的凭借歌曲【江南】而成名，并于同年获得第15届金曲奖之「最佳演唱新人奖」。随后的【小酒窝】、【曹操】、【她说】等歌曲亦造成广大回响。2011年8月8日携手华纳，迈出世界。\n\n2020至2021年【幸存者·如你】双维度EP，创造全新音乐视角。由JJ 林俊杰亲自领导整张专辑的企划创意与视觉，新专辑一推出便占据大中华区各大排行榜，销售量更在一个月内突破百万。\n\n把音乐和梦想当做能量，一路走到无人取代的地位，写下华语乐坛最动人的经典乐章，他是亚洲全能唱作天王JJ林俊杰。', rank: { rank: 2, type: 1 }, albumSize: 64, musicSize: 531, mvSize: 188 })

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
  switch (data) {
    case 1:
      if (!ablumList.value) {
        getAlbumData()
      }
      break
    case 2:

      break
  }
}

const getAlbumData = async () => {
  const params = {
    id: singerInfo.value?.id as number,
    limit: 12,
    offset: 0
  }
  const { code, data } = await getAlbum(params)
  if (code === 0) {
    ablumList.value = data.hotAlbums
  }
}

// eslint-disable-next-line no-unused-vars
const getSingerInfo = async (id: number) => {
  const { data } = await getSingerDetail(id)

  // 将接口中所需要的数据放到singerInfo中
  const singer = {
    ...data.artist
  }
  singerInfo.value = singer
  getSingerListData()
  loading.value = false
}

const getSingerListData = async (offset?:number) => {
  const params = {
    order: 'time',
    limit: pageInfo.pageSize,
    offset: offset || pageInfo.currentPage,
    id: singerInfo.value?.id as number
  }
  const { data, code } = await getSingerAllList(params)
  if (code === 0) {
    pageInfo.totalSize = data.total
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
  }
}

onMounted(() => {
  getSingerListData()
})

watch(
  () => props.isView,
  (val) => {
    if (val) {
      // getSingerInfo(props.listData.listId)
      // getSingerListData()
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

// 监听active的变化
watch(() => activeTab.value, (val) => {
})

</script>

<style scoped lang="scss">
.aduio-singer {
  padding: 0;
  ::v-deep(.back-comment-dialog-content) {
    height: 100%;
  }
  .singer-list-title{
    @apply text-sm text-zinc-400;
  }
  .singer-list-content{
    @apply text-sm text-gray-500;
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
    }
    .iconfont{
      font-size: 12px;
      color: #909399;
      transform: scale(.9);

    }
  }
  .tab-content {
    height: calc(100% - 70px);
    &-item {
      @apply w-full h-full;
    }
  }
  .album-content-item {
    position: relative;
    &-title {
      @apply h-12 bg-[rgba(255,255,255,.8)] text-[#333] opacity-[0.2] w-full px-3 duration-300 flex flex-col justify-evenly font-bold;
    }
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
