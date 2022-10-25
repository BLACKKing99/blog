
export const apiUtil = () => {
  let apiUrl = ''
  switch (window.location.host) {
    case '114.132.188.46':
      apiUrl = 'http://114.132.188.46:3000'
      break
    default:
      apiUrl = 'http://localhost:3000'
      break
  }
  return apiUrl
}
