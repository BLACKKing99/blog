<template>
  <div class="layout-container">
    <el-container>
      <el-aside width="150px">
        <tabbar-aside />
      </el-aside>
      <el-main>
        <el-scrollbar
          ref="elScrollRef"
          @scroll="handleScroll"
        >
          <!-- <router-view
          v-slot="{Component}"
        >
          <transition name="el-fade-in">
            <component :is="Component" />
          </transition>
        </router-view> -->
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<script lang='ts' setup>
import { useEventBus } from '@/hooks/useEventBus'
import { ElScrollbar } from 'element-plus'
import 'element-plus/dist/index.css'
import { throttle } from 'lodash'

setTimeout(() => {
  (window as any).L2Dwidget.init({
    pluginRootPath: 'live2dw/',
    pluginJsPath: 'lib/',
    pluginModelPath: 'live2d-widget-model-koharu/assets/',
    tagMode: false,
    debug: false,
    model: { jsonPath: '/live2dw/live2d-widget-model-koharu/assets/koharu.model.json' },
    dialog: {
      script: {
        'tap body': '哎呀！别碰我！',
        'tap face': '人家是在认真写博客哦--前端妹子'
      }
    },
    display: { position: 'right', width: 200, height: 400 },
    mobile: { show: true },
    log: true
  })
}, 300)

const { Busemit } = useEventBus()

// 滚动监听
const elScrollRef = ref<InstanceType<typeof ElScrollbar> | null>(null)

const handleScroll = throttle((event:{ scrollLeft: number; scrollTop: number }) => {
  if (event.scrollTop + (elScrollRef.value?.resize$ as HTMLElement).clientHeight >= (elScrollRef.value?.resize$ as HTMLElement).scrollHeight) {
    // 到底部了
    Busemit('scroll-bottom')
  }
}, 100)

</script>

<style scoped lang='scss'>
@import '@/styles/animations.scss';
.layout-container{
  height: 100%;
  ::v-deep(.el-container){
      height: 100%;
      .el-main{
          background-color: #f5f5f5;
          border-radius: 20px 0 0 0;
          padding: 0;
      }
  }
  ::v-deep(.el-scrollbar){
    .el-scrollbar__view{
      height: 100%;
    }
  }
}
</style>
