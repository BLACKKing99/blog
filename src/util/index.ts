
export const randomKey = (lower: number, upper: number) => {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower
}
