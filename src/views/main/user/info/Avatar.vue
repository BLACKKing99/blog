<template>
  <Dialog
    v-model:visiable="visible"
    :dialog-style="{
      top: '50%',
      width: '500px',
      height: '400px',
      left: '50%',
    }"
  >
    <template #title>
      上传头像
    </template>
    <template #content>
      <div class="container flex-c">
        <div class="container-avatar">
          <div class="container-avatar-item">
            <img
              ref="imgRef"
              :src="imgUrl"
            >
          </div>
        </div>
        <div class="container-tips">
          *单击圆选择图片，选择后，鼠标滚轮缩放图片，左键按住可拖动图片位置
        </div>
        <div class="container-reload">
          <input
            type="file"
            hidden
            ref="uploadRef"
            accept="image/*"
            @change="onFileChange"
          >
          <span @click="upload">重新上传</span>
          <button
            class="l-button container-confirm"
            @click="confirm"
          >
            确定
          </button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { useAvatarCut } from '@/hooks/useAvatarCut'
import { uploadAvatar } from '@/api/module/user'
const props = defineProps({
  isView: {
    type: Boolean,
    default: false
  },
  avatarUrl: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:isView', 'changeAvatar'])

const {
  createCropper,
  destoryCropper,
  getCroppedCanvas,
  imgRef
} = useAvatarCut()

const visible = ref(false)
watch(
  () => props.isView,
  (val) => {
    if (val) {
      visible.value = val
      imgUrl.value = props.avatarUrl
      createCropper()
    }
  }
)
watch(
  () => visible.value,
  (val) => {
    if (!val) {
      emit('update:isView', false)
    }
  }
)

const uploadRef = ref<HTMLInputElement | null>(null)
const imgUrl = ref<string>()
const onFileChange = () => {
  imgUrl.value = ''
  destoryCropper()
  const file = uploadRef.value!.files![0]
  imgUrl.value = window.URL.createObjectURL(file)
  createCropper()
}
// 确定修改头像
const confirm = async () => {
  const canvas = await getCroppedCanvas()
  const formData = new FormData()
  formData.append('file', canvas as Blob)
  const { data, status } = await uploadAvatar(formData)
  if (status === 200) {
    imgUrl.value = data.url
    visible.value = false
    emit('changeAvatar', imgUrl.value)
  }
}

// 点击上传头像
const upload = () => {
  uploadRef.value?.click()
}
</script>

<style scoped lang="scss">
::v-deep(.avatar-dialog) {
  .el-dialog__body {
    padding: 0 !important;
  }
}

::v-deep(.cropper-view-box, .cropper-face) {
  // 剪切框样式
  border-radius: 50%;
  outline: none;
  outline-color: initial;
}

::v-deep(.cropper-wrap-box) {
  // 展示内容样式
  border-radius: 50%;
}

.container {
  &-avatar {
    width: 300px;
    height: 300px;
    border: solid 3px $pink-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &-item {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        object-fit: cover;
      }
    }
  }

  &-tips {
    font-size: $font-mini;
    margin-top: 10px;
    width: 80%;
    text-align: center;
  }

  &-reload {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    span {
      color: $pink-color;
      font-size: $font-small;
      cursor: pointer;
    }
    .container-confirm {
      margin-left: 10px;
      width: 80px;
      height: 30px;
      border-radius: 5px;
      background-color: $pink-color;
      color: #fff;
    }
  }
}
</style>
