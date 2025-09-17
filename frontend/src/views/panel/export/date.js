// Date格式化函数已移除，使用utils/DateUtil.js中的统一实现

import { parseTime } from '@/utils/index'

export function formatTimeToStr(times, pattern) {
  const defaultPattern = 'yyyy-MM-dd hh:mm:ss'
  const formatPattern = pattern || defaultPattern
  return parseTime(times, formatPattern)
}

