export const handleLyric = (str:string) => {
  let arr = str.split(/[(\f\n)\r\t\v]/).map((item, i) => { // 用正则的换行符分割
    const min = item.slice(1, 3)
    const sec = item.slice(4, 6)
    let mill = item.slice(7, 10)
    let lrc = item.slice(11, item.length)
    const active = false
    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill) // 把分钟变成秒，秒变成毫秒
    if (isNaN(Number(mill))) { // 判断是不是数字 不是的话进行二次分割  有些还是这种格式的 53]
      mill = item.slice(7, 9)
      lrc = item.slice(10, item.length)
      time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill) // 把分钟变成秒，秒变成毫秒
    }
    return { min, sec, mill, lrc, time, active }
  })
  arr.forEach((item, i) => { // 由于后端返回的数据中，可能会有空的歌词，会让高亮的短暂消失，这边处理下
    if (item.lrc === '' && i !== 0) {
      arr[i - 1] = {
        ...arr[i - 1],
        ...item,
        time: arr[i - 1].time,
        lrc: arr[i - 1].lrc
      }
    }
  })

  arr = arr.filter(item => item.lrc)
  return arr
}
