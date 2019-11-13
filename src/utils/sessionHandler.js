function getItem(key) {
  const originalValue = sessionStorage.getItem(key)
  const value = (originalValue ? JSON.parse(originalValue) : {})
  return value
}

function setItem(key,value) {
  sessionStorage.setItem(key,JSON.stringify(value))
}

function removeItem(key) {
  sessionStorage.removeItem(key)
}

export default {
  getItem,
  setItem,
  removeItem
}
