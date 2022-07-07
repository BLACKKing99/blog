<template>
  <div
    class="progress-center-line"
    @click="handleProgress"
  >
    <div
      class="progress-center-content"
      :style="{
        width: `${percentage}%`,
      }"
    />
    <div
      class="progress-center-round"
      :style="{
        left: `calc(${percentage}% - 5px)`,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  currentTime: {
    type: Number,
    default: 0
  }
})

const percentage = ref(0)

const emit = defineEmits(['line-click'])

// 实时监听音乐的位置
watch(() => props.currentTime, (value) => {
  percentage.value = value
})

const handleProgress = (event: MouseEvent) => {
  const width = parseInt(getComputedStyle(event.currentTarget as Element).width)
  percentage.value = (event.offsetX / width) * 100
  emit('line-click', percentage.value)
}
</script>

<style scoped lang="scss">
.progress-center-line {
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background-color: #f5f5f5;
  position: relative;
  cursor: pointer;
}
.progress-center-content {
  transition: 0.3s;
  width: 20%;
  height: 100%;
  background-color: $pink-color;
  border-radius: 5px 0 0 5px;
}
.progress-center-round {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: calc(50% - 5px);
  background-color: $pink-color;
  position: absolute;
  transition: 0.3s;
}
</style>
