<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

const isValid = ref(false)

const { handleSubmit } = useForm({
  validationSchema: {
    id: 'required:아이디',
    password: 'required:비밀번호',
  },
})
const id = useField('id')
const password = useField('password')

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})

const router = useRouter()
const onClickSignUp = () => {
  router.push('/sign-up')
}
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
          <v-card width="460">
            <v-card-text class="px-12 py-16">
              <v-form
                v-model="isValid"
                @submit.prevent="submit"
              >
                <div class="text-h4 font-weight-black mb-10 text-center">
                  로그인
                </div>

                <v-text-field
                  v-model="id.value.value"
                  clearable
                  prepend-icon="mdi-identifier"
                  label="아이디"
                  class="mb-2"
                  :error-messages="id.errorMessage.value"
                />

                <v-text-field
                  v-model="password.value.value"
                  clearable
                  prepend-icon="mdi-lock-outline"
                  label="비밀번호"
                  type="password"
                  class="mb-2"
                  :error-messages="password.errorMessage.value"
                />

                <v-btn
                  type="submit"
                  class="mt-10"
                  block
                  x-large
                  rounded
                  color="primary"
                  :disabled="!isValid"
                >
                  로그인
                </v-btn>
                <v-btn
                  type="submit"
                  class="mt-6"
                  block
                  x-large
                  rounded
                  color="secondary"
                  @click="onClickSignUp"
                >
                  회원가입
                </v-btn>
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
