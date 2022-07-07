<template>
  <div class="info">
    <div class="info-title">
      {{ title }}
    </div>
    <div class="info-content">
      <slot name="content" />
      <template
        v-for="item in layout"
        :key="item.id"
      >
        <div
          class="info-group flex"
        >
          <b class="title">
            {{ item.title }}
          </b>
          <div class="content">
            <template v-if="item.type === 'content'">
              {{ item.content }}
            </template>
            <template v-else-if="item.type === 'input'">
              <el-input
                v-model="item.content"
                :readonly="!isEdit"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-else-if="item.type === 'radio'">
              <el-radio-group
                :disabled="!isEdit"
                v-model="item.content"
              >
                <template
                  v-for="radio in item.options"
                  :key="radio.value"
                >
                  <el-radio :label="radio.value">
                    {{ radio.label }}
                  </el-radio>
                </template>
              </el-radio-group>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                v-model="item.content"
                :disabled="!isEdit"
                :placeholder="item.placeholder"
                size="small"
              >
                <el-option
                  v-for="select in item.options"
                  :key="select.value"
                  :label="select.label"
                  :value="select.value"
                />
              </el-select>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import type { ILayout } from './type'

// interface IInfoLayout {
//   (e: 'update:valueHtml', value: string): void
// }

defineProps({
  title: {
    type: String,
    default: '基本信息'
  },
  layout: {
    type: Array as PropType<ILayout[]>,
    required: true
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

// const emit = defineEmits<IInfoLayout>()

</script>

<style scoped lang="scss">
.info {
  width: 100%;
  height: 100%;
  &-group {
    border-bottom: 1px #ccc solid;
    padding: 10px 0;
    margin-bottom: 10px;
    .title {
      width: 100px;
      font-size: $font-small;
    }
    .content {
      flex: 1;
      &-inp {
        width: 100%;
      }
    }
  }
  &-title {
    font-size: $font-small;
    font-weight: 600;
    position: relative;
    margin-left: 5px;
    margin-bottom: 10px;
    &::before {
      content: '';
      position: absolute;
      left: -5px;
      top: 0;
      height: 100%;
      width: 2px;
      background-color: $pink-color;
    }
  }
}
</style>
