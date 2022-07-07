<template>
  <div
    class="right"
  >
    <time-comp class="time-comp" />
    <div class="right-menu">
      <div class="title">
        导航目录
      </div>
      <div class="menu">
        <ul class="menu-container">
          <li
            :class="[`li-${menu.level} text-ellipsis-1`,menu.id === avtiveMenu ? 'active' : '']"
            v-for="menu in contextMenu"
            :key="menu.id"
            :style="{paddingLeft:(menu.level - 1)*15 + 'px'}"
          >
            <a
              :href="`#${menu.id}`"
              @click="handleMenuActive(menu.id)"
            >{{ menu.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import type { IHElementType } from '@/hooks/useElement'
import { throttle } from 'lodash'
import { PropType } from 'vue'
const props = defineProps({
  contextMenu: {
    type: Array as PropType<IHElementType[]>,
    default: () => {
      return []
    }
  },
  topGap: {
    type: Number,
    default: 0
  }
})

const menuList = ref<{
  id:string,
  gap:number
}[]>([])

watch(() => {
  return props.topGap
}, (val) => {
  watchScroll(val)
})

// 监听滚动
const watchScroll = throttle((val) => {
  for (let index = 0; index < menuList.value.length; index++) {
    if (val > menuList.value[index].gap && val < menuList.value[index + 1]?.gap) {
      avtiveMenu.value = menuList.value[index].id
    }
  }
}, 200)

// 监听目录变化
watchEffect(() => {
  props.contextMenu.forEach(item => {
    const ele = document.getElementById(item.id)?.offsetTop
    menuList.value.push({
      id: item.id,
      gap: ele as number
    })
  })
  menuList.value.sort((a, b) => {
    return a.gap - b.gap
  })
})

const avtiveMenu = ref('header-2')

const handleMenuActive = (val:string) => {
  avtiveMenu.value = val
}

</script>

<style scoped lang='scss'>
.right{
    width: 100%;
    .time-comp{
        width: 100%;
        height: 130px;
    }
    &-menu{
      margin-top: 20px;
      background-color: #fff;
      width: 100%;
      padding: 20px 10px;
      border-radius: 10px;
      overflow: hidden;
      .title{
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 30px;
        font-size: 1rem;
        box-sizing: border-box;
      }
      .menu{
        overflow: hidden;
      }
      .menu-container{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .active{
          background-color: #f5f5f5;
          border-radius: 5px;
          a{
            color: $pink-color;
          }
        }
        li{
          padding: 5px 0;
          width: 90%;
          font-weight: bold;
        }
        .li-1{
          font-size: $font-larget;
        }
        .li-2{
          font-size: 15px;
        }
        .li-3{
          font-size: 14px;
        }
      }
    }
}
</style>
