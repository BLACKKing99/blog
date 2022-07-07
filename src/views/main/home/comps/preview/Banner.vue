<template>
  <div class="home-banner flex">
    <swiper
      class="home-banner-swiper"
      :slides-per-view="1"
      @slide-change="onSlideChange"
      @swiper="handleSwiperInit"
      :speed="700"
      :modules="modules"
      effect="fade"
      :autoplay="{
        delay: 2000,
      }"
      :loop="true"
      :navigation="{
        hideOnClick: true,
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :pagination="{
        clickable: true,
        type: 'bullets',
        bulletActiveClass: 'swiper-pagination-active',
      }"
    >
      <div class="img-pagination">
        <template
          v-for="(img,index) in imgArr"
          :key="img.url"
        >
          <img
            :class="swiperIndex === index?'pagination-active':''"
            class="img-pagination-item"
            :virtualIndex="index"
            @click="handlePaginationChange(index)"
            :src="$imgUrl + img.url"
          >
        </template>
      </div>
      <div class="swiper-button-prev" />

      <div class="swiper-button-next" />
      <template
        v-for="imgItem in imgArr"
        :key="imgItem.url"
      >
        <swiper-slide>
          <img :src="$imgUrl + imgItem.url">
        </swiper-slide>
      </template>
    </swiper>
    <div
      class="home-banner-right flex-c"
      @click="$router.push({name:'photos'})"
    >
      <div
        class="top"
        :style="{ background: `url(${$imgUrl + randomUrl})` }"
      />
      <div class="bottom" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { getSwiper, getBanner } from '@/api/module/preview'
import { Navigation, Pagination, A11y, Autoplay, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as ISwiper } from 'swiper/types'
import 'swiper/css/bundle'
import 'swiper/css'

const randomUrl = ref<string>('')

const imgArr = ref<{url:string}[]>()

onMounted(() => {
  getSwiperInfo()
  getBannerInfo()
})

// 获取轮播图数据
const getSwiperInfo = async () => {
  const { status, data } = await getSwiper()
  if (status === 200) {
    imgArr.value = data.data
  }
}

// 获取移动图片数据(随机的)
const getBannerInfo = async () => {
  const { status, data } = await getBanner()
  if (status === 200) {
    console.log(data)

    randomUrl.value = data.data
  }
}

// 轮播图相关逻辑开始
const swiperIndex = ref<number>(0)
const modules = [Navigation, Pagination, A11y, Autoplay, EffectFade]
const swiperRef = ref<ISwiper | null>(null)
// 使swiperIndex随时变化
const onSlideChange = (swiper:ISwiper) => {
  if (swiper.activeIndex === 4) {
    swiperIndex.value = 0
  } else {
    swiperIndex.value = (swiper.activeIndex - 1)
  }
}
const handleSwiperInit = (swiper:ISwiper) => {
  swiperRef.value = swiper
}
// 图片导航的随时点击
const handlePaginationChange = (index:number) => {
  swiperRef.value?.slideTo(index + 1, 700)
  swiperRef.value?.autoplay.start()
}
// 轮播图相关逻辑结束
</script>

<style scoped lang='scss'>
@import '@/styles/animations.scss';
  .home-banner {
    width: 100%;
    height: 36vw;
    &-right {
      width: 380px;
      height: 100%;
      overflow: hidden;
      margin-left: 20px;
      cursor: pointer;
      .top {
        flex: 1;
        border-radius: 10px;
        width: 100%;
        background-size: cover !important;
        animation: bgMove 16s linear infinite alternate;
      }
      .bottom {
        margin-top: 20px;
        height: 156px;
        width: 100%;
        border-radius: 10px;
        background: url('@/assets/img/swiper/banner.png') center;
        background-size: cover;
      }
      img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }
    &-swiper {
      flex: 1;
      .img-pagination{
        position: absolute;
        z-index: 999;
        right: 5%;
        bottom: 5%;
        &-item{
          margin-right: 20px;
          transition: 0.3s;
          width: 128px;
          height: 68px;
          cursor: pointer;
        }
        .pagination-active{
          transform: scale(1.2);
        }
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
      // 轮播图滚动条修改样式
      ::v-deep(.swiper-pagination) {
        .swiper-pagination-bullet {
          width: 30px;
          height: 2px;
          border-radius: initial;
          background: #fff;
          opacity: initial;
        }
        .swiper-pagination-active {
          background-color: $pink-color !important;
          opacity: 1;
        }
      }
      // 轮播图左右把手修改样式
      .swiper-button-prev {
        transform: rotate(90deg);
        left: 0;
      }
      .swiper-button-next {
        transform: rotate(-90deg);
        right: 0;
      }
      .swiper-button-prev,
      .swiper-button-next {
        opacity: 0;
        transition: all 0.5s;
        width: 0 !important;
        height: 0 !important;
        top: calc(50% - 28px);
        border: 56px solid transparent !important;
        border-bottom: 60px solid rgba(255, 255, 255, 0.9) !important;
        border-radius: 0 !important;
        background-color: transparent !important;
        &::after {
          content: '';
        }
      }
      &:hover {
        .swiper-button-prev,
        .swiper-button-next {
          opacity: 1;
        }
      }
    }
  }
</style>
