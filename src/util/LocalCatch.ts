class LocalCatch {
  setItem = <T = any>(key:string, value:T) => {
    if (value !== null && value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  getItem = (key:string) => {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return undefined
    }
  }

  removeItem = (key:string) => {
    localStorage.removeItem(key)
  }
}

export default new LocalCatch()
