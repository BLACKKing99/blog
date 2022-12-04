
export type IEmojiType = 'emoji' | 'hand' | 'face' | 'people' |'family' |'live'

export interface IEmojiNavType {
  value:IEmojiType
  title:string
}

export const emoji:Record<IEmojiType, string[]> = {
  emoji: [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '🤣',
    '😂',
    '🙂',
    '🙃',
    '😉',
    '😊',
    '😇',
    '😍',
    '🤩',
    '😘',
    '😗',
    '😚',
    '😙',
    '😋',
    '😛',
    '😜',
    '🤪',
    '😝',
    '🤑',
    '🤗',
    '🤭',
    '🤫',
    '🤔',
    '🤐',
    '🤨',
    '😐',
    '😑',
    '😶',
    '😏',
    '😒',
    '🙄',
    '😬',
    '🤥',
    '😌',
    '😔',
    '😪',
    '🤤',
    '😴',
    '😷',
    '🤒',
    '🤕',
    '🤢',
    '🤮',
    '🤧',
    '😵',
    '🤯',
    '🤠',
    '😎',
    '🤓',
    '🧐',
    '😕',
    '😟',
    '🙁',
    '😮',
    '😯',
    '😲',
    '😳',
    '😦',
    '😧',
    '😨',
    '😰',
    '😥',
    '😢',
    '😭',
    '😱',
    '😖',
    '😣',
    '😞',
    '😓',
    '😩',
    '😫',
    '😤',
    '😡',
    '😠',
    '🤬',
    '😈',
    '👿',
    '💀',
    '💩',
    '🤡',
    '👹',
    '👺',
    '👻',
    '👽',
    '👾',
    '🤖',
    '😺',
    '😸',
    '😹',
    '😻',
    '😼',
    '😽',
    '🙀',
    '😿',
    '😾',
    '💋'],
  hand: ['👋',
    '🤚',
    '🖐',
    '✋',
    '🖖',
    '👌',
    '🤞',
    '🤟',
    '🤘',
    '🤙',
    '👈',
    '👉',
    '👆',
    '🖕',
    '👇',
    '👍',
    '👎',
    '✊',
    '👊',
    '🤛',
    '🤜',
    '👏',
    '🙌',
    '👐',
    '🤲',
    '🤝',
    '🙏',
    '💅',
    '🤳',
    '💪',
    '👂',
    '👃',
    '🧠',
    '👀',
    '👁',
    '👅',
    '👄'],
  face: ['👶',
    '🧒',
    '👦',
    '👧',
    '🧑',
    '👱',
    '👨',
    '🧔',
    '👱‍',
    '👨‍',
    '👨‍',
    '👨‍',
    '👨‍',
    '👩',
    '👱‍',
    '👩‍',
    '👩‍',
    '👩‍',
    '👩‍',
    '🧓',
    '👴',
    '👵'],
  people: ['🙍',
    '🙍‍',
    '🙍‍',
    '🙎',
    '🙎‍',
    '🙎‍',
    '🙅',
    '🙅‍',
    '🙅‍',
    '🙆',
    '🙆‍',
    '🙆‍',
    '💁',
    '💁‍',
    '💁‍',
    '🙋',
    '🙋‍',
    '🙋‍',
    '🙇',
    '🙇‍',
    '🙇‍',
    '🤦',
    '🤦‍',
    '🤦‍',
    '🤷',
    '🤷‍',
    '🤷‍',
    '👨‍⚕️',
    '👩‍⚕️',
    '👨‍🎓',
    '👩‍🎓',
    '👨‍🏫',
    '👩‍🏫',
    '👨‍⚖️',
    '👩‍⚖️',
    '👨‍🌾',
    '👩‍🌾',
    '👨‍🍳',
    '👩‍🍳',
    '👨‍🔧',
    '👩‍🔧',
    '👨‍🏭',
    '👩‍🏭',
    '👨‍💼',
    '👩‍💼',
    '👨‍🔬',
    '👩‍🔬',
    '👨‍💻',
    '👩‍💻',
    '👨‍🎤',
    '👩‍🎤',
    '👨‍🎨',
    '👩‍🎨',
    '👨‍✈️',
    '👩‍✈️',
    '👨‍🚀',
    '👩‍🚀',
    '👨‍🚒',
    '👩‍🚒',
    '👮',
    '👮‍♂️',
    '👮‍♀️',
    '🕵',
    '🕵️‍♂️',
    '🕵️‍♀️',
    '💂',
    '💂‍',
    '💂‍',
    '👷',
    '👷‍',
    '👷‍',
    '🤴',
    '👸',
    '👳',
    '👳‍',
    '👳‍',
    '👲',
    '🧕',
    '🤵',
    '👰',
    '🤰',
    '🤱',
    '👼',
    '🎅',
    '🤶',
    '🧙‍',
    '🧚',
    '🧛‍',
    '🧜',
    '🧝‍',
    '🧞',
    '🧞‍',
    '🧞‍',
    '🧟',
    '💆‍',
    '💇',
    '🚶‍',
    '🏃',
    '💃',
    '🕺',
    '🕴',
    '👯',
    '🧖',
    '🧘',
    '👬',
    '💏',
    '👨‍',
    '👩‍',
    '💑',
    '👨‍',
    '👩‍'],
  family: [
    '👪',
    '👨‍👩‍👦',
    '👨‍👩‍👧',
    '👨‍👩‍👧‍👦',
    '👨‍👩‍👦‍👦',
    '👨‍👩‍👧‍👧',
    '👨‍👨‍👦',
    '👨‍👨‍👧',
    '👨‍👨‍👧‍👦',
    '👨‍👨‍👦‍👦',
    '👨‍👨‍👧‍👧',
    '👩‍👩‍👦',
    '👩‍👩‍👧',
    '👩‍👩‍👧‍👦',
    '👩‍👩‍👦‍👦',
    '👩‍👩‍👧‍👧',
    '👨‍👦',
    '👨‍👦‍👦',
    '👨‍👧',
    '👨‍👧‍👦',
    '👨‍👧‍👧',
    '👩‍👦',
    '👩‍👦‍👦',
    '👩‍👧',
    '👩‍👧‍👦',
    '👩‍👧‍👧'
  ],
  live: [

    '🗣',
    '👤',
    '👥',
    '👣',
    '🌂',
    '☂',
    '👓',
    '🕶',
    '👔',
    '👕',
    '👖',
    '🧣',
    '🧤',
    '🧥',
    '🧦',
    '👗',
    '👘',
    '👙',
    '👚',
    '👛',
    '👜',
    '👝',
    '🎒',
    '👞',
    '👟',
    '👠',
    '👡',
    '👢',
    '👑',
    '👒',
    '🎩',
    '🎓',
    '🧢',
    '⛑',
    '💄',
    '💍',
    '💼'
  ]

}

export const emojiNav:IEmojiNavType[] = [
  {
    value: 'emoji',
    title: '😀'
  },
  {
    value: 'hand',
    title: '👋'
  },
  {
    value: 'face',
    title: '👶'
  },
  {
    value: 'people',
    title: '🙍'
  },
  {
    value: 'family',
    title: '👪'
  },
  {
    value: 'live',
    title: '👣'
  }
]
