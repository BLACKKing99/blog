<template>
  <dialog-vue
    v-loading="loading"
    class="aduio-singer"
    v-model:visiable="dialogVisiable"
    :show-close="true"
    :dialog-style="{
      width: '1200px',
      height: '800px',
      left: '50%',
      top: '50%',
    }"
  >
    <template #title />
    <template #content>
      <div class="">
        22
      </div>
      <div>11</div>
    </template>
  </dialog-vue>
</template>

<script lang='ts' setup>
import DialogVue from '@/components/common/dialog/Dialog.vue'
import { getSingerDetail } from '@/api2/module/song'
// 控制弹窗开关
const dialogVisiable = ref(false)

// 加载 优化交互
const loading = ref(false)

const singerInfo = reactive({
  // 歌手名字
  name: '',
  // 歌手封面
  cover: '',
  // 歌手id
  id: 0,
  // 歌手描述
  desc: '',
  // 歌手音乐个数
  musicSize: 0,
  // 歌手mv个数
  mvSize: 0,
  // 歌手专辑个数
  albumSize: 0
})

const emit = defineEmits(['update:isView', 'play-music'])

const props = defineProps({
  isView: {
    type: Boolean,
    default: false
  },
  listData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const getSingerInfo = async (id:number) => {
  const { data } = await getSingerDetail(id)
  // 将接口中所需要的数据放到singerInfo中
  singerInfo.name = data?.artist?.name
  singerInfo.albumSize = data?.artist?.albumSize
  singerInfo.cover = data?.artist?.cover
  singerInfo.desc = data?.artist?.desc
  singerInfo.id = data?.artist?.id
  singerInfo.musicSize = data?.artist?.musicSize
  singerInfo.mvSize = data?.artist?.mvSize
}

watch(() => props.isView, (val) => {
  if (val) {
    getSingerInfo(props.listData.listId)
    dialogVisiable.value = true
  }
})

watch(() => dialogVisiable.value, (val) => {
  if (!val) {
    emit('update:isView', false)
  }
})

</script>

<style scoped lang='scss'>
.aduio-singer{
  padding: 0;
}
</style>
