<template>
  <!-- <div
    class="dialog-model"
    v-if="visiable && model"
  /> -->
  <transition name="dialog">
    <div
      v-if="visiable"
      class="back-comment-dialog"
      :style="dialogStyle"
    >
      <div class="back-comment-dialog-title">
        <slot name="title" />
        <span
          class="close"
          @click="dialogVisiable = false"
        ><i class="iconfont icon-close" /></span>
      </div>
      <div class="back-comment-dialog-content">
        <slot name="content" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
const props = defineProps({
  visiable: {
    type: Boolean,
    default: false
  },
  dialogStyle: {
    type: Object,
    default: () => {
      return {
        bottom: '100px',
        width: '500px',
        height: '200px',
        left: '50%'
      }
    }
  },
  model: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:visiable'])

const dialogVisiable = ref(false)
watch(
  () => props.visiable,
  (val) => {
    if (val) {
      dialogVisiable.value = val
    }
  }
)
watch(
  () => dialogVisiable.value,
  (val) => {
    if (!val) {
      emit('update:visiable', false)
    }
  }
)
</script>

<style scoped lang="scss">
@import '@/styles/animations.scss';
.dialog-model{
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  background-color: rgba(0,0,0,0.5);
  z-index: 99998;
}
.back-comment-dialog {
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  z-index: 99999;
  &-title {
    .close {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      transition: 0.3s;
      color: #333;
      cursor: pointer;
      display: inline-block;
      &:hover {
        transform: rotate(180deg);
        color: $pink-color;
        background-color: #f5f5f5;
      }
    }
  }
  &-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
