<template>
  <div class="time flex-r overflow-hidden">
    <div class="time-clock">
      <img
        src="@/assets/img/avatar/avatar.jpg"
        :style="{borderRadius:isRadius?'10px':'10px 10px 0 0'}"
      >
    </div>
    <div
      class="time-hour time-tips flex-c"
      v-motion
      :initial="{ opacity: 0, y: 3000 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :delay="300"
    >
      <span class="tips">{{ time.hour }}</span>
      <span class="title">hour</span>
    </div>
    <div
      class="time-minutes time-tips flex-c"
      v-motion
      :initial="{ opacity: 0, y: 3000 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :delay="600"
    >
      <span class="tips">{{ time.minutes }}</span>
      <span class="title">minutes</span>
    </div>
    <div
      class="time-seconds time-tips flex-c"
      v-motion
      :initial="{ opacity: 0, y: 3000 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :delay="900"
    >
      <span class="tips">{{ time.seconds }}</span>
      <span class="title">seconds</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isRadius: {
    type: Boolean,
    default: true
  }
})
const time = reactive<{
    hour:number
    minutes:number
    seconds:number
}>({
  hour: new Date().getHours(),
  minutes: new Date().getMinutes(),
  seconds: new Date().getSeconds()
})
const timer = setInterval(() => {
  const nowTime = new Date()
  time.hour = nowTime.getHours()
  time.minutes = nowTime.getMinutes()
  time.seconds = nowTime.getSeconds()
}, 1000)

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
.time {
  height: 100%;
  width: 100%;
  position: relative;
  color: #fff;
  cursor: pointer;
  &:hover{
    .time-clock{
      filter: blur(3px);
    }
  }
  &-clock {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: 0.3s;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-tips{
      flex: 1;
      z-index: 2;
      color: #fff;
      .tips{
          font-size: $font-largest;
          font-weight: 600;
      }
      .title{
          font-size: $font-mini;
          margin-top: 20px;
      }
  }
}
</style>
