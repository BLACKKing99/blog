<template>
  <div class="tab">
    <div class="tab-header">
      <span class="tab-header-title">{{ title }}
        <div :class="`bar-${tabPosition}`" />
      </span>
    </div>
    <div class="tab-body">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { PropType } from 'vue'
type ITabPosition = 'bottom'|'left'
defineProps({
  title: {
    type: String,
    required: true
  },
  tabPosition: {
    type: String as PropType<ITabPosition>,
    default: 'bottom'
  }
})
</script>

<style scoped lang='scss'>
.tab{
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    padding: 10px 20px;
    box-sizing: border-box;
    border-radius: 5px;
    &-header{
        border-bottom: 1px #f5f5f5 solid;
        padding-bottom: 10px;
        &-title{
            position: relative;
            box-sizing: border-box;
            font-size: 14px;
            .bar-bottom{
                position: absolute;
                left: 0;
                bottom: -10px;
                background-color: $pink-color;
                height: 2px;
                width: 100%;
            }
            .bar-left{
                position: absolute;
                left: -10px;
                top: 50%;
                transform: translateY(-50%);
                background-color: $pink-color;
                height: 80%;
                width: 2px;
            }
        }
    }
    &-body{
        margin-top: 20px;
    }
}
</style>
