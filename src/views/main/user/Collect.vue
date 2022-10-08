<template>
  <div class="collect">
    <div
      class="collect-container flex"
      v-for="(item) in articleType"
      :key="item.value"
    >
      <div class="collect-title">
        {{ item.label }}
        <span class="collect-title-list">{{ item.id }}</span>
      </div>
      <div class="flex collect-container-item">
        <template v-if="item.value === 'nose'">
          <collect-list
            v-for="(nose) in noseList"
            :key="nose._id"
            :collect="nose"
            class="collect-list"
          />
        </template>
        <template v-else-if="item.value === 'monitor'">
          <collect-list
            v-for="(monitor) in monitorList"
            :key="monitor._id"
            :collect="monitor"
            class="collect-list"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useUserInfo } from '@/hooks/useUserInfo'
import { getArticleType } from '@/api/module/article'
import { IArticleInfo } from '@/api/types/article'

const { userInfo } = useUserInfo()

const articleType = ref()

const monitorList = ref<IArticleInfo[]>([])

const noseList = ref<IArticleInfo[]>([])

onMounted(() => {
  getArticleType().then((res) => {
    if (res.code === 0) {
      articleType.value = res.data
      handleCollectType()
    }
  })
})

const handleCollectType = () => {
  const collectList = userInfo.value?.collectArticle
  if (collectList) {
    collectList.forEach(item => {
      if (item.type === 'monitor') {
        monitorList.value.push(item)
      } else if (item.type === 'nose') {
        noseList.value.push(item)
      }
    })
  }
  if (monitorList.value.length === 0) {
    const index = articleType.value.findIndex((item:any) => item.value === 'monitor')
    articleType.value.splice(index, 1)
  }
  if (noseList.value.length === 0) {
    const index = articleType.value.findIndex((item:any) => item.value === 'nose')
    articleType.value.splice(index, 1)
  }
}

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
    height: 300px;
  }
}
</style>
