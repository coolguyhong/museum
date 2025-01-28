<script setup>
import {ref} from 'vue'
import {useField, useForm} from 'vee-validate'

const isValid = ref(false)
const show1 = ref(false)
const show2 = ref(false)

const { handleSubmit } = useForm({
  validationSchema: {
    id: 'required:아이디|minMax:아이디,6,20|allowedCharacter',
    password: 'required:비밀번호|minMax:비밀번호,8,20|allowedSpecialCharacter|allowedCharacterCombination',
    confirmPassword: 'required:비밀번호 확인|confirmPassword:password',
    name: 'required:이름|allowedKoreanCharacter',
    email: 'required:이메일|allowedEmailCharacter',
    phone: 'required:휴대폰|minMax:휴대폰,11,11',
  },
})
const id = useField('id')
const password = useField('password')
const confirmPassword = useField('confirmPassword')
const name = useField('name')
const email = useField('email')
const phone = useField('phone')

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <v-main>
    <v-container class="fill-height">
      <v-row justify="center">
        <v-col cols="auto">
          <v-img
            class="mx-auto mb-6"
            width="120"
            src="@/assets/logo.png"
          />
          <v-card width="600">
            <v-card-text class="px-10 py-14">
              <v-form
                v-model="isValid"
                @submit.prevent="submit"
              >
                <div class="text-h4 font-weight-black mb-10 text-center">
                  회원가입
                </div>

                <v-text-field
                  v-model="id.value.value"
                  clearable
                  hint="6자 이상 20자 이하의 영문 소문자 혹은 영문 소문자와 숫자를 조합"
                  prepend-icon="mdi-identifier"
                  label="아이디"
                  class="mb-2"
                  :counter="20"
                  :error-messages="id.errorMessage.value"
                />

                <v-text-field
                  v-model="password.value.value"
                  clearable
                  hint="8자 이상 20자 이하 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합"
                  prepend-icon="mdi-lock-outline"
                  label="비밀번호"
                  :type="show1 ? 'text' : 'password'"
                  class="mb-2"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :counter="20"
                  :error-messages="password.errorMessage.value"
                  @click:append="show1 = !show1"
                />

                <v-text-field
                  v-model="confirmPassword.value.value"
                  clearable
                  hint="비밀번호를 한 번 더 입력해 주세요"
                  prepend-icon="mdi-lock-outline"
                  label="비밀번호 확인"
                  :type="show2 ? 'text' : 'password'"
                  class="mb-2"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :counter="20"
                  :error-messages="confirmPassword.errorMessage.value"
                  @click:append="show2 = !show2"
                />

                <v-text-field
                  v-model="name.value.value"
                  clearable
                  hint="이름을 입력해 주세요"
                  prepend-icon="mdi-account"
                  label="이름"
                  class="mb-2"
                  :counter="10"
                  :error-messages="name.errorMessage.value"
                />

                <v-text-field
                  v-model="email.value.value"
                  clearable
                  hint="이메일을 입력해주세요"
                  prepend-icon="mdi-email"
                  label="이메일"
                  type="text"
                  class="mb-2"
                  :error-messages="email.errorMessage.value"
                />

                <v-text-field
                  v-model="phone.value.value"
                  clearable
                  hide-spin-buttons
                  hint="숫자만 입력해주세요"
                  prepend-icon="mdi-cellphone"
                  label="휴대폰"
                  class="mb-2"
                  type="number"
                  :counter="11"
                  :error-messages="phone.errorMessage.value"
                />

                <div class="text-center mt-5">
                  <v-btn
                    class="mt-6"
                    block
                    x-large
                    rounded
                    color="primary"
                    type="submit"
                    :disabled="!isValid"
                  >
                    가입하기
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped lang="sass">

</style>
