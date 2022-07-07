<template>
  <div class="photos">
    <template
      v-for="(url, index) in previewList"
      :key="index"
    >
      <div
        class="photos-item"
        :style="{height:photosList[index]}"
      >
        <div
          class="photos-item-preview flex-c"
          @click="handlePreview(index)"
        >
          <i class="iconfont icon-chakan" />
          <div>
            点击查看
          </div>
        </div>
        <el-image
          class="photos-item-img"
          lazy
          fit="cover"
          :src="url"
          :preview-src-list="previewList"
          :initial-index="index"
        >
          <template #placeholder>
            <img
              class="photos-item-img-loading"
              src="@/assets/img/photos/img-loading.png"
            >
          </template>
        </el-image>
      </div>
    </template>
    <el-image-viewer
      v-if="showViewer"
      :initial-index="previewIndex"
      :preview-teleported="true"
      @close="closeViewer"
      infinite
      :url-list="previewList"
    />
  </div>
</template>

<script lang="ts" setup>
import { getPhotos } from '@/api/module/preview'
import { randomKey } from '@/util/index'
import { useEventBus } from '@/hooks/useEventBus'

// 预览图片列表
const previewList = ref<string[]>([])

const photosList = ref<string[]>([])

// 是否显示图片预览
const showViewer = ref(false)

// 图片预览索引
const previewIndex = ref(0)

const page = ref(1)
const limit = ref(20)

const { Buson, Busoff } = useEventBus()

// 关闭图片预览
const closeViewer = () => {
  showViewer.value = false
}
// 打开图片预览
const handlePreview = (index:number) => {
  previewIndex.value = index
  showViewer.value = true
}

onMounted(() => {
  getPhotoInfo()
  handleBusEmit()
})

const handleBusEmit = () => {
  Buson('scroll-bottom', () => {
    page.value++
    getPhotoInfo()
  })
}

onBeforeUnmount(() => {
  Busoff('scroll-bottom')
})

const getPhotoInfo = async () => {
  const { data, status } = await getPhotos({
    page: page.value,
    limit: limit.value
  })
  if (status === 200) {
    data.data.forEach((item:string) => {
      previewList.value.push(`http://127.0.0.1:3001${item}`)
      photosList.value.push(`${randomKey(200, 300)}px`)
    })
  }
}

</script>

<style scoped lang="scss">
.photos {
  column-count: 4;
  column-gap: 0;
  &-item {
    position: relative;
    &:hover {
      .photos-item-preview {
          opacity: 1;
      }
      &::before,&::after{
          width: 100%;
          height: 100%;
          opacity: 1;
      }

    }
    &::before{
        content: '';
        opacity: 0;
        position: absolute;
        width: 100px;
        height: 50px;
        left: 0;
        top: 0;
        z-index: 2;
        transition: 0.3s;
        background-color: rgba($color: $pink-color, $alpha: 0.3);
        // box-shadow: inset 1px 1px 10px 2px rgba($color: $pink-color, $alpha: 0.5);
    }
    &::after{
        content: '';
        position: absolute;
        opacity: 0;
        width: 100px;
        height: 50px;
        right: 0;
        bottom: 0;
        z-index: 2;
        transition: 0.3s;
        transition-delay: 0.3s;
        background-color: rgba($color: $pink-color, $alpha: 0.3);
        // box-shadow: inset 1px 1px 10px 2px rgba($color: $pink-color, $alpha: 0.5);
    }
    &-preview {
      opacity: 0;
      position: absolute;
      z-index: 3;
      width: 100px;
      height: 100px;
      color: $pink-color;
      font-weight: 600;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: 0.5s;
      transition-delay: 0.3s;
      border-radius: 5px;
      cursor: pointer;
      .iconfont{
          font-size: $font-larget;
          margin-bottom: 10px;
      }
      &:hover {
        box-shadow: 0 2px 10px #000;
      }
    }
    &-img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      .photos-item-img-loading{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
