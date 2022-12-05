const parseTime = (time:string) => {
  const srtArr = time.split(':')
  return +srtArr[0] * 60 + +srtArr[1]
}

export const handleLyric = (str:string) => {
  /**
   * @param str 传进来的歌词字符串
   *  格式为  [00:00.000] 作词 : 薛之谦
   *  @return 返回的对象为 {word:string,time:number}
   *
   */
  const lrcArr = str.split('\n')
  const lrc = lrcArr.map(item => {
    const parts = item.split(']')
    const lrcItem = {
      word: parts[1],
      time: parseTime(parts[0].slice(1)),
      active: false
    }
    return lrcItem
  }).filter(item => {
    const word = item.word?.trim()
    return (word && word !== '') && !isNaN(item.time)
  })
  return lrc

  // let arr = str.split(/[(\f\n)\r\t\v]/).map((item, i) => { // 用正则的换行符分割
  //   const min = item.slice(1, 3)
  //   const sec = item.slice(4, 6)
  //   let mill = item.slice(7, 10)
  //   let lrc = item.slice(11, item.length)
  //   const active = false
  //   let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill) // 把分钟变成秒，秒变成毫秒
  //   if (isNaN(Number(mill))) { // 判断是不是数字 不是的话进行二次分割  有些还是这种格式的 53]
  //     mill = item.slice(7, 9)
  //     lrc = item.slice(10, item.length)
  //     time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill) // 把分钟变成秒，秒变成毫秒
  //   }
  //   return { min, sec, mill, lrc, time, active }
  // })
  // arr.forEach((item, i) => { // 由于后端返回的数据中，可能会有空的歌词，会让高亮的短暂消失，这边处理下
  //   if (item.lrc === '' && i !== 0) {
  //     arr[i - 1] = {
  //       ...arr[i - 1],
  //       ...item,
  //       time: arr[i - 1].time,
  //       lrc: arr[i - 1].lrc
  //     }
  //   }
  // })

  // arr = arr.filter(item => item.lrc)
}
// 处理数字超过W
export const handleNumber = (num:number) => {
  const number = num >= 1e3 && num < 1e4 ? (num / 1e3).toFixed(1) + 'k' : num >= 1e4 ? (num / 1e4).toFixed(1) + 'w' : num
  return number
}

export const bytesToSize = (size:number) => {
  let _size = ''
  if (size < 0.1 * 1024) {
    // 小于0.1KB，则转化成B
    _size = size.toFixed(2).toString() + 'B'
  } else if (size < 0.1 * 1024 * 1024) {
    // 小于0.1MB，则转化成KB
    _size = (size / 1024).toFixed(2) + 'KB'
  } else if (size < 0.1 * 1024 * 1024 * 1024) {
    // 小于0.1GB，则转化成MB
    _size = (size / (1024 * 1024)).toFixed(2) + 'MB'
  } else {
    // 其他转化成GB
    _size = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  }
  // 转成字符串
  const sizeStr = _size + ''
  // 获取小数点处的索引
  const index = sizeStr.indexOf('.')
  // 获取小数点后两位的值
  const dou = sizeStr.substr(index + 1, 2)

  // 判断后两位是否为00，如果是则删除00
  if (dou === '00') return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)

  return _size
}
