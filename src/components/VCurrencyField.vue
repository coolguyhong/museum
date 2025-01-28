<script setup>
import {useCurrencyInput} from 'vue-currency-input'
import {watch} from 'vue'

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  modelValue: {
    type: Number
  },
  suffix: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})

const { inputRef, formattedValue, setValue } = useCurrencyInput({
  currency: 'KRW',
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  precision: 0,
  valueRange: { min: 0 },
});
watch(
  () => props.modelValue,
  (value) => {
    setValue(value)
  }
);
</script>

<template>
  <VTextField
    ref="inputRef"
    v-model="formattedValue"
    :label="label"
    :suffix="suffix"
    clearable
  />
</template>

<style scoped lang="sass">

</style>
