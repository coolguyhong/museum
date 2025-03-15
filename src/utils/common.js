import { isEmpty } from '@/utils/validation.js'

export const krw10000Trunc = (value) => {
  if (value <= 0) {
    return value;
  }

  value /= 10000
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const querySearchParams = (searchParams) => {
  let result = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (isEmpty(value)) {
      continue;
    }
    result[key] = value;
  }
  return result;
}
