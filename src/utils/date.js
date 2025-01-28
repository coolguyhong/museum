import dayjs from 'dayjs'

export const getFormatDate = (value, format) => {
  return dayjs(value).format(format)
}

export const addDate = (date, value, unit) => {
  return dayjs(date).add(value, unit)
}
