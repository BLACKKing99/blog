<template>
  <el-popover
    :placement="placement"
    :title="title"
    :width="width"
    :trigger="trigger"
    popper-class="emoji-popper"
  >
    <div class="flex flex-col">
      <el-scrollbar class="emoji-editor">
        <div class="emoji-contain px-3 box-border">
          <span
            class="emoji-box"
            v-for="(item, index) in emoji[activeNav]"
            :key="index"
            @click="pickEmoji(item)"
          >
            {{ item }}
          </span>
        </div>
      </el-scrollbar>
      <ul class="emoji-nav px-3 box-border">
        <li
          v-for="item in emojiNav"
          :key="item.value"
          :class="{
            'active':item.value === activeNav
          }"
          @click="activeNav = item.value"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <template #reference>
      <slot />
    </template>
  </el-popover>
</template>

<script lang='ts' setup>
import { PropType } from 'vue'
import { emoji, emojiNav, IEmojiType } from '../config/emoji'

defineProps({
  width: {
    type: Number,
    default: 200
  },
  trigger: {
    type: String as PropType<'click'|'focus'|'hover'|'contextmenu'>,
    default: 'click'
  },
  title: {
    type: String,
    default: 'title'
  },
  placement: {
    type: String as PropType<'top'|'top-start'|'top-end'|'bottom'|'bottom-start'|'bottom-end'|'left'|'left-start'|'left-end'|'right'|'right-start'|'right-end'>,
    default: 'bottom'
  }
})

const emit = defineEmits(['pick-emoji'])

const activeNav = ref<IEmojiType>('emoji')

const pickEmoji = (emoji:string) => {
  emit('pick-emoji', emoji)
}
</script>

<style scoped lang='scss'>
.emoji-editor{
    height: 325px;
    ::v-deep(.el-scrollbar__view){
        display: flex;
        flex-direction: column;
        .emoji-contain{
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            .emoji-box {
                width: 34px;
                height: 34px;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border-radius: 4px;
                &:hover {
                    background-color: #f5f5f5;
                }
            }
        }
    }
}
.emoji-nav {
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 18px;
    box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
    background-color: #eee;
    li {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: .3s;
      border-radius: 2px;
    }
    .active {
      background-color: #fff;
    }
}
</style>
