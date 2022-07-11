<template>
  <div>
    <dialog-vue
      v-model:visiable="dialogVisiable"
      :dialog-style="{
        width: '1200px',
        height: '800px',
        left:'50%',
        top:'50%'
      }"
    />
  </div>
</template>

<script lang='ts' setup>
import DialogVue from '@/components/common/dialog/Dialog.vue'
import { getSheetList, getSheetDetail } from '@/api2/module/song'
const props = defineProps({
  isView: {
    type: Boolean,
    default: false
  },
  listData: {
    type: Object,
    default: () => {}
  }
})
const dialogVisiable = ref(false)
// const sheetDetail = ref()
const emit = defineEmits(['update:isView'])
// 获取详情列表数据
const getSongListData = async () => {
  const { data } = await getSheetList({
    id: props.listData.listId,
    limit: 10,
    offset: 0
  })
  console.log(data)
}

// 获取歌单详情
const getSheetDetailData = async () => {
  const { data } = await getSheetDetail({
    id: props.listData.listId
  })
  console.log(data)
}
watch(
  () => props.isView,
  (val) => {
    if (val) {
      getSongListData()
      getSheetDetailData()
      dialogVisiable.value = val
    }
  }
)
watch(
  () => dialogVisiable.value,
  (val) => {
    if (!val) {
      emit('update:isView', false)
    }
  }
)
</script>

<style scoped lang='scss'>

</style>
