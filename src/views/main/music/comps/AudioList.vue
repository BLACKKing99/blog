<template>
  <div>
    <div class="music-recommend-container">
      <span class="title">每日推荐</span>
      <ul class="content">
        <li
          class="content-tabbar"
          v-for="tab in tabbar"
          :key="tab.id"
          @click="handleTabClick(tab.id)"
        >
          <div
            class="content-tabbar-title"
            :class="activeTab === tab.id?'active-tab':''"
          >
            {{ tab.title }}
            <span
              class="content-tabbar-nav"
            />
          </div>
        </li>
      </ul>
      <template
        v-for="(item,index) in 3"
        :key="index"
      >
        <transition :name="aniPosition">
          <div
            class="content-container"
            v-if="item === activeTab"
          >
            <div
              class="content-container-item"
              v-for="(tab,j) in tabList[item]"
              :key="j"
            >
              <div class="content-container-item-cover">
                <el-image
                  lazy
                  :src="tab.cover"
                >
                  <template #placeholder>
                    <img
                      src="@/assets/img/photos/img-loading.png"
                    >
                  </template>
                </el-image>
              </div>
              <div class="content-container-item-title">
                {{ tab.name }}
              </div>
              <div class="content-container-item-desc">
                {{ tab.description }}
              </div>
            </div>
          </div>
        </transition>
      </template>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { getBoutique, getHotType, getVocalist } from '@/api2/module/song'
import type { IHotType, IVocalist, IBoutique } from '@/api2/module/song'
interface ITabList {
    id:number
    name:string
    description?:string
    cover:string
}
const tabbar = [
  {
    id: 1,
    title: '热门歌单'
  },
  {
    id: 2,
    title: '歌手'
  },
  {
    id: 3,
    title: '热门推荐'
  }
]
// 活跃的tab
const activeTab = ref(1)

// 控制该显示什么时候的动画
const aniPosition = ref('')

// tabList储存这些从接口获取的数据
const tabList = reactive<Record<number, ITabList[]>>({
  1: [],
  2: [],
  3: []
})
onMounted(() => {
  getHotTypeData({
    limit: 10,
    offset: 0
  })
})

const handleTabClick = (data:number) => {
  activeTab.value = data
  console.log(data, '222')
  if (data === 2 && tabList[data].length === 0) {
    getVocalistData({
      limit: 10,
      offset: 0,
      area: '7'
    })
  } else if (data === 3 && tabList[data].length === 0) {
    getBoutiqueData({
      limit: 10
    })
  }
}

const getHotTypeData = async (params?:IHotType) => {
  const { data } = await getHotType(params)
  const list = data.playlists.map((item:any) => {
    const obj = {
      name: item.name,
      description: item.description,
      id: item.id,
      cover: item.coverImgUrl
    }
    return obj
  })
  tabList[1].push(...list)
}
// 获取歌手数据
const getVocalistData = async (params?:IVocalist) => {
  const { data } = await getVocalist(params)
  console.log(data, '22222')
  const list = data.artists.map((item:any) => {
    const obj = {
      name: item.name,
      description: item.description,
      id: item.id,
      cover: item.img1v1Url
    }
    return obj
  })
  tabList[2].push(...list)
}
// 获取精品歌单数据
const getBoutiqueData = async (params?:IBoutique) => {
  const { data } = await getBoutique(params)
  console.log(data)

  const list = data.playlists.map((item:any) => {
    const obj = {
      name: item.name,
      description: item.description,
      id: item.id,
      cover: item.coverImgUrl
    }
    return obj
  })
  tabList[3].push(...list)
}

</script>

<style scoped lang='scss'>
.music-recommend-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 0 40px;
    box-sizing: border-box;
    height: 40vh;
    display: flex;
    flex-direction: column;
    .title{
        font-size: $font-larget;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .content{
        display: flex;
        &-tabbar{
            display: flex;
            align-items: center;
            padding-right: 20px;
            height: 30px;
            transition: 0.3s;
            .active-tab{
                color: $pink-color;
                .content-tabbar-nav{
                    width: 100%;
                    left: 0;
                }
            }
            &-title{
                position: relative;
                height: 100%;
                cursor: pointer;
                transition: 0.3s;
            }
            &-nav{
                position: absolute;
                bottom: 0;
                left: 50%;
                background-color: $pink-color;
                width: 0;
                height: 3px;
                transition: 0.3s;
                transform-origin: center top;
            }
        }
        &-container{
            display: flex;
            align-items: center;
            flex: 1;
            &-item{
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0 10px;
                width: 150px;
                &-cover{
                    cursor: pointer;
                    width: 100%;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    border-radius: 100%;
                    margin-bottom: 10px;
                    &:hover{
                        .el-image{
                            transform: scale(0.9);
                        }
                    }
                    .el-image{
                        border-radius: 100%;
                        transition: 0.3s;
                        width: 150px;
                        height: 150px;
                        object-fit: cover;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                &-title{
                    text-align: center;
                    font-size: 22px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    width: 100%;
                    height: 33px;
                    line-height: 33px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                &-desc{
                    text-align: center;
                    font-size: 14px;
                    width: 100%;
                    height: 38px;
                    // color: #fff9;
                    color: #d8d8d8;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>
