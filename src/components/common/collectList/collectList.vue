<template>
  <div class="collect-list flex-c">
    <div class="cover">
      <img :src="$imgUrl + collect.cover">
    </div>
    <div class="title text-ellipsis-2 text-sm mt-1">
      {{ collect.title }}
    </div>
    <div class="channel">
      {{ articleStore.getCurrentCategory(collect.categoryId) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IArticleInfo } from '@/api/types/article'
import { PropType } from 'vue'
import { useArticleStore } from '@/sotre/module/article'
defineProps({
  collect: {
    type: Object as PropType<IArticleInfo>,
    required: true
  }
})

const articleStore = useArticleStore()
</script>

<style scoped lang="scss">
.collect-list {
  width: 100%;
  height: 100%;
  &:hover {
    .cover {
      &::after{
        opacity: 1;
      }
    }
  }
  .cover {
    width: 100%;
    flex: 1;
    position: relative;
    cursor: pointer;
    &::after {
      position: absolute;
      transition: 0.3s;
      content: '';
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.5);
      opacity: 0;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
  }
  .title {
    height: 40px;
    width: 100%;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .channel {
    font-size: $font-mini;
    width: 100%;
  }
}
</style>
