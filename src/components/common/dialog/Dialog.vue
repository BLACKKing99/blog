<template>
  <!-- <div
    class="dialog-model"
    v-if="visiable && model"
  /> -->
  <transition
    name="dialog"
  >
    <div
      v-if="visiable"
      class="back-comment-dialog"
      :style="dialogStyle"
      @click="dialogVisiable = true"
    >
      <div class="back-comment-dialog-title">
        <slot name="title" />
        <span
          v-if="showClose"
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
// 控制弹窗显示隐藏
const dialogVisiable = ref(false)
const emit = defineEmits(['update:visiable'])
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
  },
  // 是否显示右上角关闭按钮
  showClose: {
    type: Boolean,
    default: true
  },
  // 是否可以通过点击 modal 关闭 Dialog
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  // 是否可以通过按下 ESC 关闭 Dialog
  closeOnPressEscape: {
    type: Boolean,
    default: true
  }
})

const keyTodo = (event:KeyboardEvent) => {
  if (event.code === 'Escape') {
    dialogVisiable.value = false
  }
}

// const clickModel = (event:MouseEvent) => {
//   dialogVisiable.value = false
// }

// 全都写在watch不太好看 用一个函数来写 会比较优雅一点
const addEventListener = () => {
  // if (props.closeOnClickModal) {
  //   document.addEventListener('click', clickModel)
  // }

  if (props.closeOnPressEscape) {
    document.addEventListener('keydown', keyTodo)
  }
}

const removeEventListener = () => {
  // if (props.closeOnClickModal) {
  //   document.removeEventListener('click', clickModel)
  // }

  if (props.closeOnPressEscape) {
    document.removeEventListener('keydown', keyTodo)
  }
}

watch(
  () => props.visiable,
  (val) => {
    if (val) {
      dialogVisiable.value = val
      addEventListener()
    }
  }
)
watch(
  () => dialogVisiable.value,
  (val) => {
    if (!val) {
      emit('update:visiable', false)
      removeEventListener()
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
