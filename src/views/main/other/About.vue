<template>
  <div class="about">
    <ul class="about-left">
      <li class="about-left-item">
        <div class="about-left-item-title">
          HOW ABOUT ME
        </div>
        <div class="about-left-item-center">
          <template
            v-for="(item, index) in left"
            :key="index"
          >
            <transition name="about-left">
              <div
                class="about-left-item-center-content"
                v-show="activeIndex === index"
                @mouseenter="handleMouseenter()"
                @mouseleave="handleMouseleave()"
              >
                <span>{{ item.text }}</span>
                <img
                  :src="item.src"
                  alt=""
                >
              </div>
            </transition>
          </template>
        </div>
        <div class="about-left-item-foot">
          <span>Just Want Sweet Love</span>
          <b>A young man longing for love</b>
        </div>
      </li>
    </ul>
    <ul class="about-right">
      <li class="about-right-item">
        <template
          v-for="(item,index) in right"
          :key="index"
        >
          <transition name="about-right">
            <div
              class="about-right-item-content"
              v-show="activeIndex === index"
            >
              <div class="about-right-item-content-img">
                <img :src="item.src">
              </div>
              <div class="about-right-item-content-title">
                {{ item.text }}
              </div>
            </div>
          </transition>
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { left, right } from './about.config'
const activeIndex = ref(0)
let timer: NodeJS.Timer | null = null

onMounted(() => {
  handleMouseleave()
})

onBeforeMount(() => {
  handleMouseenter()
})

const handleMouseenter = () => {
  clearInterval(timer as NodeJS.Timer)
}

const handleMouseleave = () => {
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % left.length
  }, 5000)
}

// const getImgSrc = (name: string) => {
//   if (typeof name === 'undefined') return 'error.png'
//   const path = `../../../assets/img/about/${name}`
//   const modules = import.meta.globEager('@/assets/img/about/*')
//   console.log(modules[path]?.default)

//   return modules[path]?.default
// }
</script>

<style scoped lang="scss">
@import '@/styles/animations.scss';
.about {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  &-left {
    width: 50%;
    height: 100%;
    background-color: #fdfdfd;
    display: flex;
    justify-content: center;
    &-item {
      width: 60%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #fdfdfd;
      &-title {
        height: 10%;
        display: flex;
        align-items: center;
        font-size: 18px;
        color: $pink-color;
        font-weight: 800;
      }
      &-center {
        width: 100%;
        height: 75%;
        position: relative;
        &-content {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          span {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: $font-largest;
            flex: 1;
          }
          img {
            width: 100%;
            height: 80%;
            object-fit: contain;
          }
        }
      }
      &-foot {
        height: 15%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span{
          font-size: $font-small;
          color: $pink-color;
          font-weight: 800;
        }
        b{
          font-size: $font-mini;
          color: #333;
        }
      }
    }
  }
  &-right {
    width: 50%;
    height: 100%;
    background-color: rgba($color: $pink-color, $alpha: 0.3);
    &-item {
      width: 70%;
      height: 100%;
      position: relative;
      &-content{
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &-title {
          width: 60%;
          height: 30%;
          display: flex;
          position: relative;
          z-index: 999;
          top: -5%;
          color: #fff;
          font-weight: 800;
          font-size: 18px;
        }
        &-img {
          width: 100%;
          flex: 1;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
