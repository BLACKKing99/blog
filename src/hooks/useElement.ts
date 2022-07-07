export interface IHElementType {
    id:string,
    title:string,
    level:number,
    nodeName:string
}

// 获取文章列表菜单，用于点击跳转
export default () => {
  const contentRef = ref<HTMLElement|null>(null)
  const contextMenus = ref<IHElementType[]>([])
  const titleTag = ['H1', 'H2', 'H3']
  // 比较局限 只能传入h便签
  onMounted(() => {
    getMenu()
  })

  const getMenu = () => {
    if (contentRef.value) {
      contentRef.value.childNodes.forEach((ele, index) => {
        if (ele.nodeType !== 3) {
          if (titleTag.includes(ele.nodeName)) {
            const id = 'header-' + index
            ;(ele as HTMLElement).setAttribute('id', id)
            contextMenus.value.push({
              id: id,
              title: (ele as HTMLElement).innerHTML,
              level: Number(ele.nodeName.substring(1, 2)),
              nodeName: ele.nodeName
            })
          }
        }
      })
    }
  }
  const getContextMenu = () => {
    return contextMenus.value
  }
  return {
    contentRef,
    getContextMenu
  }
}
