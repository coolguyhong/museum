import {defineRule} from 'vee-validate'

const isEmpty = (value) => {
  if (value === null || value === undefined || value === '') {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  return false;
}

// 공통
defineRule('required', (value, [field]) => {
  if (isEmpty(value)) {
    return `${field} 필드에 값을 입력해 주세요.`
  }
  return true
});
defineRule('minMax', (value, [field, min, max]) => {
// The field is empty so it should pass
  if (isEmpty(value)) {
    return true
  }
  if (value.length >= min && value.length <= max) {
    return true
  }
  if (value.length < min) {
    return `${field} 필드는 최소 ${min} 자리 이상이어야 합니다.`
  }
  return `${field} 필드는 최대 ${max} 자리 이하이어야 합니다.`
});

// sign-up
// id
defineRule('allowedCharacter', (value) => {
  if (isEmpty(value)) {
    return true
  }
  const allowedCharacter = /[^a-z0-9.]/
  if (allowedCharacter.test(value)) {
    return '영문 소문자와 숫자만 입력할 수 있습니다.'
  }
  return true
})

// password
defineRule('allowedCharacterCombination', (value) => {
  if (isEmpty(value)) {
    return true
  }
  const english = /[^a-zA-z.]/
  const digit = /[0-9]/
  const specialCharacter = /[,./:`'[\]\-=<>"{}~!@#$%&*()_+]/
  const patterns = [english, digit, specialCharacter]
  let patternCount = patterns.reduce((acc, pattern) => {
    if (pattern.test(value)) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)
  if (patternCount < 2) {
    return '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합이어야 합니다.'
  }
  return true
})

defineRule('allowedSpecialCharacter', (value) => {
  if (isEmpty(value)) {
    return true
  }
  // 특수문자 중 ,./:`'[]-="{}~!@#$%&*()_+ 이외의 문자 사용 불가
  const allowedCharacter = /[^A-Za-z\d,./:`'[\]\-="{}~!@#$%&*()_+]/
  if (allowedCharacter.test(value)) {
    return '해당 특수문자만 사용할 수 있습니다.( ,./:`\'[]-="{}~!@#$%&*()_+ )'
  }
  return true
})

// confirmPassword
defineRule('confirmPassword', (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true
  }
  return '동일한 비밀번호를 입력해 주세요.'
})

// name
defineRule('allowedKoreanCharacter', (value) => {
  if (isEmpty(value)) {
    return true
  }
  const allowedKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  if (!allowedKorean.test(value)) {
    return '한글만 사용할 수 있습니다.'
  }
  return true
})

// email
defineRule('allowedEmailCharacter', (value) => {
  if (isEmpty(value)) {
    return true
  }
  const emailPattern = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i
  if (!emailPattern.test(value)) {
    return '이메일 형식으로 입력해 주세요.'
  }
  return true
})

// detailAddress
defineRule('allowedKoreanEnglishNumberSpecialCharacter', (value) => {
  if (isEmpty(value)) {
    return true
  }
  const allowedCharacter = /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\d \dA-Za-z\d,./:`'[\]\-="{}~!@#$%&*()_+]/
  if (allowedCharacter.test(value)) {
    return '해당 특수문자만 사용할 수 있습니다.( ,./:`\'[]-="{}~!@#$%&*()_+ )'
  }
  return true
})
