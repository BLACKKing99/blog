export const setThemeColor = (color:string) => {
  document.documentElement.style.setProperty('--el-color-primary', color)
  for (let i = 1; i <= 9; i++) {
    setPropertyPrimary('light', i, color)
  }
}

function setPropertyPrimary (mode: string, i: number, color: string) {
  document.documentElement.style.setProperty(
      `--el-color-primary-${mode}-${i}`,
      lighten(color, i / 10)
  )
}

/** hex转rgb */
function hexToRgb (str:string) {
  const hxs = str.replace('#', '').match(/../g) as unknown as Array<number>
  if (hxs) {
    for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i] as any, 16)
    return hxs
  } else {
    return []
  }
}

/** 变浅颜色值 */
function lighten (color:string, level:number) {
  const rgbc = hexToRgb(color)
  for (let i = 0; i < 3; i++) { rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]) }
  return rgbToHex(rgbc[0], rgbc[1], rgbc[2])
}

/** rgb转hex */
function rgbToHex (a:number, b:number, c:number) {
  const hexs = [a.toString(16), b.toString(16), c.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length === 1) hexs[i] = `0${hexs[i]}`
  }
  return `#${hexs.join('')}`
}
