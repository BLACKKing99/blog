// eslint-disable-next-line no-unused-vars
import { SlateDescendant, SlateElement, SlateText } from '@wangeditor/editor'

declare module '@wangeditor/editor' {
    // 扩展 Text
    // eslint-disable-next-line no-unused-vars
    interface SlateText {
        text: string
    }
    // 扩展 Element
    // eslint-disable-next-line no-unused-vars
    interface SlateElement {
        type: string
        children: SlateDescendant[]
    }
}
