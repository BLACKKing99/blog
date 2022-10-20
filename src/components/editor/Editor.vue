<template>
  <div class="editor">
    <Toolbar
      :style="{visibility:isEdit?'visible':'hidden'}"
      class="editor-tool-bar"
      :editor="editorRef"
      :mode="mode"
    />
    <Editor
      class="editor-content"
      v-model="html"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
    />
  </div>
</template>

<script lang='ts' setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IDomEditor, IEditorConfig } from '@wangeditor/editor'

// 定义接口
interface IEmitType {
    (e:'update:valueHtml', value:string):void
}
// 初始化
const editorRef = shallowRef<IDomEditor|undefined>(undefined)
const html = ref<string>('')
const props = defineProps({
  valueHtml: {
    type: String,
    default: ''
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits<IEmitType>()

// 配置
const editorConfig:Partial<IEditorConfig> = {
  placeholder: '很干净!!!┗|｀O′|┛ 嗷~~',
  readOnly: true
}
const mode = 'default'

watch(() => props.isEdit, (val) => {
  if (val) {
    editorRef.value?.enable()
  } else {
    editorRef.value?.disable()
  }
})

watch(() => html.value, (val) => {
  emit('update:valueHtml', html.value)
})

onMounted(() => {
  nextTick(() => {
    html.value = props.valueHtml
  })
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

// 处理事务
const handleCreated = (editor:IDomEditor) => {
  // 刚开始进来需要记录实例
  editorRef.value = editor // 记录 editor 实例，重要！
}

</script>

<style scoped lang='scss'>
.editor{
    &-tool-bar{
        visibility: visible;
        border-bottom: solid 1px #ccc;
    }
    &-content{
        height: auto;
    }
}
  ::v-deep(.w-e-full-screen-container) {
    z-index: 100; /* 如有需要，可以自定义 z-index */
  }

</style>
