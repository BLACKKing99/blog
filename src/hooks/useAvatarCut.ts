import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export const useAvatarCut = () => {
  const imgRef = ref<HTMLImageElement | null>(null)
  const cropper = ref<Cropper | null>(null)
  const createCropper = () => {
    nextTick(() => {
      const image = imgRef.value
      // 其实这些配置可以传进来但是我懒！！
      cropper.value = new Cropper(image as HTMLImageElement, {
      // 裁剪框的宽高比
        aspectRatio: 1,
        // 拖拽的模式
        viewMode: 1,
        dragMode: 'move',
        // 是否显示剪切框
        autoCrop: true,
        // 剪切框的区域
        autoCropArea: 1,
        // 显示网格
        guides: false,
        // 允许通过拖动来移动裁剪框。
        cropBoxMovable: false,
        // 启用以通过拖动来调整裁剪框的大小。
        cropBoxResizable: false,
        background: false,
        highlight: false,
        minCanvasHeight: 300,
        modal: false,
        movable: true
      })
    })
  }
  const destoryCropper = () => {
    cropper.value?.destroy()
    cropper.value = null
  }
  const getCropperImage = () => {
    return cropper.value?.getCroppedCanvas().toDataURL('image/png')
  }
  const getCroppedCanvas = () => {
    return new Promise<Blob | null>(resolve => {
      cropper.value?.getCroppedCanvas().toBlob(blob => {
        resolve(blob)
      })
    })
  }
  return {
    createCropper,
    destoryCropper,
    getCropperImage,
    getCroppedCanvas,
    cropper,
    imgRef
  }
}
