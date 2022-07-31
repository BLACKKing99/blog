<template>
  <div class="collect-list flex-c">
    <div class="cover">
      <img :src="collect.cover?$imgUrl + collect.cover:cover">
    </div>
    <div class="title text-ellipsis-2">
      {{ collect.title }}
    </div>
    <div class="channel">
      {{ collect.type }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IArticleInfo } from '@/api/types/article'
import { PropType } from 'vue'
import cover from '@/assets/images/cover1.jpg'
defineProps({
  collect: {
    type: Object as PropType<IArticleInfo>,
    required: true
  }
})
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
