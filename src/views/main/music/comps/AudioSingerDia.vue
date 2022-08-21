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
            'backgroundImage': `url(${singerInfo.cover})`
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
        <div class="h-[50%] flex flex-col">
          <ul class="tab-title h-10 flex items-center px-5">
            <li
              v-for="tab in tabList"
              :key="tab.id"
              :class="tab.id === 1?'mx-10':''"
              class="relative cursor-pointer h-full leading-10"
              @click="activeTab = tab.id"
            >
              <span
                class="text-sm inline-block duration-300"
                :class="activeTab === tab.id?'text-theme':''"
              >
                {{ tab.title }}
              </span>
              <span
                class="inline-block h-1 w-0 duration-300 absolute bg-theme bottom-0 left-2/4"
                :class="activeTab === tab.id?'!w-full !left-0':''"
              />
            </li>
          </ul>
          <ul class="tab-content py-[10px]">
            <!-- tab 标题 -->
            <li
              class="h-full music-content px-5"
              v-if="activeTab === 0"
            >
              <el-scrollbar>
                <div>
                  <ul
                    v-for="music in 10"
                    :key="music"
                    class="grid grid-cols-3 h-10 items-center"
                  >
                    <li>
                      {{ music }}
                    </li>
                    <li>{{ music }}</li>
                    <li>{{ music }}</li>
                  </ul>
                </div>
              </el-scrollbar>
            </li>
            <li
              v-if="activeTab === 1"
              class="h-full album-content"
            >
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
                        'backgroundImage': `url(${singerInfo.cover})`
                      }"
                    >
                      <div class="h-10 bg-[rgba(255,255,255,.8)] text-[rgba(255,255,255)] opacity-[0.2] w-full px-3 duration-300 album-content-item-title">
                        林俊杰
                      </div>
                    </div>
                  </li>
                </ul>
              </el-scrollbar>
            </li>
            <li
              class="mv-content h-full"
              v-if="activeTab === 2"
            >
              <el-scrollbar>
                <ul class="flex flex-wrap">
                  <li
                    class="w-[400px] h-[300px] flex-col flex justify-center items-center"
                    v-for="item in 10"
                    :key="item"
                  >
                    <ul class="flex h-[250px]">
                      <li class="w-[70%]">
                        视频
                      </li>
                      <li class="flex-1">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                      </li>
                    </ul>
                    <div class="flex-1 flex items-center">
                      标题
                    </div>
                  </li>
                </ul>
              </el-scrollbar>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </dialog-vue>
</template>

<script lang='ts' setup>
import DialogVue from '@/components/common/dialog/Dialog.vue'
import { getSingerDetail } from '@/api2/module/song'
// 控制弹窗开关
const dialogVisiable = ref(false)

// 加载 优化交互
const loading = ref(false)

const tabList = [
  {
    id: 0,
    title: '音乐'
  },
  {
    id: 1,
    title: '专辑'
  },
  {
    id: 2,
    title: 'MV'
  }
]

// 活跃的tab
const activeTab = ref<number>(0)

const singerInfo = reactive({
  albumSize: 63,
  cover: 'http://p2.music.126.net/dwbXimgQn1YnJzwSlPDk-A==/109951165911950321.jpg',
  desc: undefined,
  id: 3684,
  musicSize: 529,
  mvSize: 188,
  name: '林俊杰'

})
// const singerInfo = reactive({
//   // 歌手名字
//   name: '',
//   // 歌手封面
//   cover: '',
//   // 歌手id
//   id: 0,
//   // 歌手描述
//   desc: '',
//   // 歌手音乐个数
//   musicSize: 0,
//   // 歌手mv个数
//   mvSize: 0,
//   // 歌手专辑个数
//   albumSize: 0
// })

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

// eslint-disable-next-line no-unused-vars
const getSingerInfo = async (id:number) => {
  const { data } = await getSingerDetail(id)

  // 将接口中所需要的数据放到singerInfo中
  singerInfo.name = data.data?.artist?.name
  singerInfo.albumSize = data.data?.artist?.albumSize
  singerInfo.cover = data.data?.artist?.cover
  singerInfo.desc = data.data?.artist?.desc
  singerInfo.id = data.data?.artist?.id
  singerInfo.musicSize = data.data?.artist?.musicSize
  singerInfo.mvSize = data.data?.artist?.mvSize

  loading.value = false
}

watch(() => props.isView, (val) => {
  if (val) {
    // getSingerInfo(props.listData.listId)
    dialogVisiable.value = true
  }
})

watch(() => dialogVisiable.value, (val) => {
  if (!val) {
    emit('update:isView', false)
  }
})

</script>

<style scoped lang='scss'>
.aduio-singer{
  padding: 0;
  ::v-deep(.back-comment-dialog-content){
    height: 100%;
  }
  .tab-content{
    height: calc(100% - 70px);
    .album-content{
      &-item{
        position: relative;
        &::before{
          content: '';
          width: 80%;
          height: 80%;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          background: #0f0f0f;
          z-index: -1;
          position: absolute;
          transition: 0.3s;
        }
        &:hover{
          .album-content-item-title{
            opacity: 1;
          }
          &::before{
            transform: translate(-25%,-50%);
          }
        }
        &-title{
          opacity: 0.2;
        }
      }
    }
  }
}
</style>
