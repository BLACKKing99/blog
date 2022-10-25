<template>
  <div class="w-full h-full">
    <ul class="flex px-5">
      <li
        v-for="tab in tabTitle"
        class="mr-5 cursor-pointer"
        :key="tab.id"
        @click="handleTabClick(tab)"
      >
        <span
          class="relative duration-200 inline-block"
          :class="tab.id === activeTab ? 'text-[#ff2e63]' : ''"
        >
          {{ tab.title }}
          <span
            :class="tab.id === activeTab ? '!w-full !left-0' : ''"
            class="duration-200 inline-block h-[3px] w-0 bg-[#ff2e63] absolute left-2/4 bottom-[-8px]"
          />
        </span>
      </li>
    </ul>
    <ul
      class="w-full mt-5 flex overflow-hidden"
      style="height: calc(100% - 1.25rem - 24px);"
    >
      <li
        class="flex relative w-full"
        v-show="tabItem?.id=== activeTab"
      >
        <transition :name="tabAnimation">
          <slot
            :tab="tabItem?.value"
            :name="tabItem?.value"
          />
        </transition>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

interface ITabTitle {
    id: number;
    value: string;
    title: string;
}

const emit = defineEmits(['update:modelValue', 'tabClick'])

const props = defineProps({
  modelValue: {
    type: [Number, String],
    required: true
  },
  tabTitle: {
    type: Array as PropType<ITabTitle[]>,
    default: () => {
      return []
    }
  }
})
const activeTab = ref<string | number>(props.tabTitle[0].id)

const tabAnimation = ref<'tab-to-right' | 'tab-to-left'>('tab-to-left')

const tabItem = computed(() => {
  return props.tabTitle.find(tab => tab.id === activeTab.value)
})

const handleTabClick = (tab:ITabTitle) => {
  if (tab.id < activeTab.value) {
    tabAnimation.value = 'tab-to-left'
  } else {
    tabAnimation.value = 'tab-to-right'
  }
  activeTab.value = tab.id
  emit('tabClick', tab.id)
}

watch(
  () => props.modelValue,
  (value) => {
    activeTab.value = value
  }
)

watch(
  () => activeTab.value,
  (value) => {
    emit('update:modelValue', value)
  }
)
</script>

<style scoped lang="scss">
.tab-to-right-leave-to,.tab-to-right-enter-to{
    transform: translateX(-100%);
}

.tab-to-right-enter-active,
.tab-to-right-leave-active {
  transition: all 1s cubic-bezier(0, 0, 1, 1);
}
.tab-to-left-leave-to{
    transform: translateX(100%);
}
.tab-to-left-enter-from{
    transform: translateX(-200%);
}
.tab-to-left-enter-to{
    transform: translateX(-100%);
}
.tab-to-left-enter-active,
.tab-to-left-leave-active {
  transition: all 1s cubic-bezier(0, 0, 1, 1);
}

</style>
