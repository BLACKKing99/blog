import type { ILayout } from '@/components/common/infoLayout/type'
import { reactive } from 'vue'
export const accountInfo = reactive<ILayout[]>([
  {
    title: '权限',
    content: '管理员',
    pid: 'identity',
    type: 'content',
    id: 1
  },
  {
    title: '账号',
    content: '保密',
    pid: 'account',
    type: 'content',
    id: 2
  },
  {
    title: '邮箱',
    content: '',
    pid: 'email',
    type: 'content',
    id: 3
  },
  {
    title: '注册时间',
    pid: 'createdAt',
    content: '',
    type: 'content',
    id: 4
  }
])
export const linkInfo = reactive<ILayout[]>([
  {
    title: '腾讯qq',
    content: '',
    type: 'input',
    pid: 'qq',
    placeholder: '请输入腾讯qq账号',
    id: 1
  },
  {
    title: '微信',
    content: '',
    type: 'input',
    pid: 'weixin',
    placeholder: '请输入微信账号',
    id: 2
  }
])
export const baseInfo = reactive<ILayout[]>([
  {
    title: '昵称',
    content: '',
    type: 'input',
    pid: 'username',
    placeholder: '请输入昵称',
    id: 1
  },
  {
    title: '性别',
    content: '0',
    pid: 'sex',
    type: 'radio',
    options: [
      {
        label: '男',
        value: '0'
      },
      {
        label: '女',
        value: '1'
      },
      {
        label: '保密',
        value: '2'
      }
    ],
    id: 2
  },
  {
    title: '职业信息',
    content: '',
    pid: 'career',
    placeholder: '请输入职业信息',
    type: 'input',
    id: 4
  }
])
