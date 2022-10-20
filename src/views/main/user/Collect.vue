<template>
  <div class="collect">
    <div
      class="collect-container flex"
    >
      <div class="collect-title">
        文章·学习
        <span class="collect-title-list">1</span>
      </div>
      <div
        class="flex collect-container-item"
      >
        <collect-list
          v-for="collect in collectInfoList"
          :key="collect.id"
          :collect="collect"
          @click="goArticle(collect.id)"
          class="collect-list"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useArticle } from '@/hooks/useArticle'
import { useCollect } from '@/hooks/useCollect'

onMounted(() => {
  getCollectList()
})

const { getCollectList, collectInfoList } = useCollect(0)

const { goArticle } = useArticle()
</script>

<style scoped lang='scss'>
.collect{
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 575px);
  &-container{
    flex-direction: column;
    margin-bottom: 20px;
    padding-bottom: 20px;
    &-item{
      .collect-list{
        margin-right: 20px;
        border-radius: 10px;
      }
    }
  }
  &-title{
    height: 30px;
    font-size: $font-larget;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.64);
    &-list{
      display: inline-block;
      margin-left: 10px;
      font-size: $font-mini;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.64);
      border-radius: 50%;
      box-sizing: border-box;
    }
  }
  &-list{
    width: 200px;
    height: 320px;
  }
}
</style>
