const defaultLayout = {
  panel: '270px',
  dataset: '270px',
  datasource: '270px',
  system: '270px'
}
const STORAGE_KEY = 'global_layout'

export const getLayout = (type) => {
  const key = STORAGE_KEY + '_' + type
  return localStorage.getItem(key) || defaultLayout[type]
}

export const setLayout = (type, val) => {
  const key = STORAGE_KEY + '_' + type
  localStorage.setItem(key, val || defaultLayout[type])
}
