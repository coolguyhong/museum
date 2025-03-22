<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import ContentTitle from '@/components/ContentTitle.vue'
import VCurrencyField from '@/components/VCurrencyField.vue'
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { addDate, getFormatDate } from '@/utils/date.js'
import { isEmpty } from '@/utils/validation.js'
import { useRouter } from 'vue-router'
import { useAxios } from '@vueuse/integrations/useAxios'

const { handleSubmit, meta } = useForm({
  validationSchema: {
    ownerName: 'required:소유주|minMax:소유주,1,10|allowedKoreanCharacter',
    roadAddress: 'required:도로명 주소',
    parcelAddress: 'required:지번 주소',
    postcode: 'required:우편번호',
    buildingName: 'required:물건명',
    detailAddress: 'required:상세 주소|minMax:상세 주소,1,30|allowedKoreanEnglishNumberSpecialCharacter',
    buildingType: 'required:물건 유형',
    supplyArea: 'required:공급 면적',
    exclusiveArea: 'required:전용 면적',
    purchaseDate: 'required:매수일',
    purchasePrice: 'required:매수 가격',
    rentalType: 'required:임대 유형',
    deposit: 'required:보증금',
    contractStartDate: 'required:계약 시작일',
    contractEndDate: 'required:계약 종료일',
  },
})
const ownerName = useField('ownerName')
const roadAddress = useField('roadAddress')
const parcelAddress = useField('parcelAddress')
const postcode = useField('postcode')
const buildingName = useField('buildingName')
const buildingCode = ref('')
const detailAddress = useField('detailAddress')
const buildingType = useField('buildingType')
const supplyArea = useField('supplyArea')
const exclusiveArea = useField('exclusiveArea')
const purchaseDate = useField('purchaseDate')
const purchasePrice = useField('purchasePrice')
const kbMarketPrice = useField('kbMarketPrice')
const techMarketPrice = useField('techMarketPrice')
const publicMarketPrice = useField('publicMarketPrice')
const rentalType = useField('rentalType')
const deposit = useField('deposit')
const monthlyRent = useField('monthlyRent')
const contractStartDate = useField('contractStartDate')
// TODO 계약 종료일이 계약 시작일 앞설 수 없다.
const contractEndDate = useField('contractEndDate')
const isHousingRentalBusiness = ref(true)
// TODO 별도 validation 추가
// 1. 필수값 입력 여부
const housingRentalType = useField('housingRentalType')
const housingRentalStartDate = useField('housingRentalStartDate')
const housingRentalDutyEndDate = useField('housingRentalDutyEndDate')
const displayHousingRentalDutyEndDate = ref('')

const submit = handleSubmit((values) => {
  const data = {
    ...values,
    isHousingRentalBusiness: isHousingRentalBusiness.value,
  }
  execute({ data })
})

// 주소
const isScriptLoaded = ref(false)
const loadPostcodeScript = () => {
  const script = document.createElement('script')
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  script.onload = () => {
    isScriptLoaded.value = true
  }
  document.head.appendChild(script)
}
loadPostcodeScript()

const openPostcodePopup = () => {
  if (!window.daum || !window.daum.Postcode) {
    return
  }

  new daum.Postcode({
    oncomplete: (data) => {
      roadAddress.value.value = data.roadAddress
      parcelAddress.value.value = data.jibunAddress === '' ? data.autoJibunAddress : data.jibunAddress
      postcode.value.value = data.zonecode
      buildingCode.value = data.buildingCode
      buildingName.value.value = data.buildingName
    }
  }).open()
}

const changePurchaseDate = (value) => {
  purchaseDate.value.value = getFormatDate(value, 'YYYY-MM-DD')
}
const changeContractStartDate = (value) => {
  contractStartDate.value.value = getFormatDate(value, 'YYYY-MM-DD')
}
const changeContractEndDate = (value) => {
  contractEndDate.value.value = getFormatDate(value, 'YYYY-MM-DD')
}
const changeHousingRentalStartDate = (value) => {
  housingRentalStartDate.value.value = getFormatDate(value, 'YYYY-MM-DD')
  setHousingRentalDutyEndDate()
}
const housingRentalTypeItems = [
  { name: '5년임대주택(민간)', duration: 5 },
  { name: '10년임대주택(민간)', duration: 10 },
  { name: '단기임대(4년)', duration: 4 },
  { name: '준공공임대(8년)', duration: 8 },
  { name: '준공공임대(10년)', duration: 10 },
  { name: '단기민간임대주택(4년)', duration: 4 },
  { name: '장기일반민간임대주택(8년)', duration: 8 },
  { name: '장기일반민간임대주택(10년)', duration: 10 },
  { name: '공공지원민간임대주택(8년)', duration: 8 },
  { name: '공공지원민간임대주택(10년)', duration: 10 },
]
const changeHousingRentalType = () => {
  if (isEmpty(housingRentalStartDate.value.value)) {
    return
  }
  setHousingRentalDutyEndDate()
}

const setHousingRentalDutyEndDate = () => {
  housingRentalDutyEndDate.value.value = getFormatDate(
    addDate(housingRentalStartDate.value.value, housingRentalType.value.value.duration, 'year'), 'YYYY-MM-DD')
  displayHousingRentalDutyEndDate.value = getFormatDate(housingRentalDutyEndDate.value.value, 'MM/DD/YYYY')
}

const changeHousingRentalBusiness = () => {
  housingRentalType.value.value = ''
  housingRentalStartDate.value.value = ''
  housingRentalDutyEndDate.value.value = ''
  displayHousingRentalDutyEndDate.value = ''
}

const router = useRouter()
const cancel = () => {
  router.push({ name: 'RealEstate' })
}
const { execute } = useAxios('/v1/real-estates', { method: 'POST' }, {
  onSuccess: () => {
    router.push({ name: 'RealEstate' })
  },
  onError: (error) => {
    console.log(error)
    alert('부동산 물건 등록 실패')
  }
})
</script>

<template>
  <v-container fluid>
    <ContentTitle>
      부동산 물건 등록
      <Breadcrumb>
        <span>부동산 물건</span>
        <span>부동산 물건 등록</span>
      </Breadcrumb>
    </ContentTitle>
    <v-row
      justify="center"
      class="mt-2"
    >
      <v-col
        cols="auto"
      >
        <v-card
          width="600"
          variant="flat"
        >
          <v-card-text>
            <form @submit.prevent="submit">
              <v-row>
                <v-col cols="10">
                  <v-text-field
                    v-model="ownerName.value.value"
                    clearable
                    label="소유주*"
                    :counter="10"
                    :error-messages="ownerName.errorMessage.value"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <v-text-field
                    v-model="roadAddress.value.value"
                    label="도로명 주소"
                    readonly
                    :error-messages="roadAddress.errorMessage.value"
                  />
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    x-large
                    block
                    height="54"
                    :disabled="!isScriptLoaded"
                    @click="openPostcodePopup"
                  >
                    검색
                  </v-btn>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <v-text-field
                    v-model="parcelAddress.value.value"
                    label="지번 주소"
                    readonly
                    :error-messages="parcelAddress.errorMessage.value"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="3">
                  <v-text-field
                    v-model="postcode.value.value"
                    label="우편번호"
                    readonly
                    :error-messages="postcode.errorMessage.value"
                  />
                </v-col>
                <v-col
                  cols="7"
                >
                  <v-text-field
                    v-model="
                      buildingName.value.value"
                    label="물건명"
                    readonly
                    :error-messages="buildingName.errorMessage.value"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <v-text-field
                    v-model="detailAddress.value.value"
                    clearable
                    label="상세 주소*"
                    :counter="30"
                    :error-messages="detailAddress.errorMessage.value"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <v-select
                    v-model="buildingType.value.value"
                    :items="['아파트', '오피스텔', '빌라']"
                    label="물건 유형*"
                    :error-messages="buildingType.errorMessage.value"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="5">
                  <v-text-field
                    v-model="supplyArea.value.value"
                    clearable
                    hide-spin-buttons
                    label="공급 면적*"
                    type="number"
                    suffix="㎡"
                    :error-messages="supplyArea.errorMessage.value"
                  />
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    v-model="exclusiveArea.value.value"
                    clearable
                    hide-spin-buttons
                    label="전용 면적*"
                    type="number"
                    suffix="㎡"
                    :error-messages="exclusiveArea.errorMessage.value"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <v-date-input
                    label="매수일*"
                    clearable
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    :error-messages="purchaseDate.errorMessage.value"
                    @update:model-value="changePurchaseDate"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <VCurrencyField
                    v-model="purchasePrice.value.value"
                    label="매수 가격*"
                    suffix="원"
                    :error-messages="purchasePrice.errorMessage.value"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <VCurrencyField
                    v-model="kbMarketPrice.value.value"
                    label="KB 시세"
                    suffix="원"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <VCurrencyField
                    v-model="techMarketPrice.value.value"
                    label="부동산테크 시세"
                    suffix="원"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <VCurrencyField
                    v-model="publicMarketPrice.value.value"
                    label="공시가격(기준시가)"
                    suffix="원"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <v-select
                    v-model="rentalType.value.value"
                    :items="['전세', '월세']"
                    label="임대 유형*"
                    :error-messages="rentalType.errorMessage.value"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <VCurrencyField
                    v-model="deposit.value.value"
                    label="보증금*"
                    suffix="원"
                    :error-messages="deposit.errorMessage.value"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <VCurrencyField
                    v-model="monthlyRent.value.value"
                    label="월세"
                    suffix="원"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <v-date-input
                    label="계약시작일*"
                    clearable
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    :error-messages="contractStartDate.errorMessage.value"
                    @update:model-value="changeContractStartDate"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <v-date-input
                    label="계약종료일*"
                    clearable
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    :error-messages="contractEndDate.errorMessage.value"
                    @update:model-value="changeContractEndDate"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="10">
                  <v-switch
                    v-model="isHousingRentalBusiness"
                    color="primary"
                    label="주택임대사업자 여부"
                    @update:model-value="changeHousingRentalBusiness"
                  />
                </v-col>
              </v-row>
              <v-row
                v-if="isHousingRentalBusiness"
                class="mt-0"
              >
                <v-col cols="10">
                  <v-select
                    v-model="housingRentalType.value.value"
                    :items="housingRentalTypeItems"
                    item-title="name"
                    item-value="name"
                    return-object
                    label="주택임대 유형*"
                    :error-messages="housingRentalType.errorMessage.value"
                    @update:model-value="changeHousingRentalType"
                  />
                </v-col>
              </v-row>
              <v-row
                v-if="isHousingRentalBusiness"
                class="mt-0"
              >
                <v-col cols="10">
                  <v-date-input
                    label="임대개시일*"
                    clearable
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    :error-messages="housingRentalStartDate.errorMessage.value"
                    @update:model-value="changeHousingRentalStartDate"
                  />
                </v-col>
              </v-row>
              <v-row
                v-if="isHousingRentalBusiness"
                class="mt-0"
              >
                <v-col cols="10">
                  <v-text-field
                    v-model="displayHousingRentalDutyEndDate"
                    readonly
                    label="의무 임대종료일*"
                    prepend-inner-icon="$calendar"
                    :error-messages="housingRentalDutyEndDate.errorMessage.value"
                  />
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-col cols="2">
                  <v-btn
                    block
                    x-large
                    @click="cancel"
                  >
                    취소
                  </v-btn>
                </v-col>
                <v-col cols="2">
                  <v-btn
                    block
                    x-large
                    color="primary"
                    type="submit"
                    :disabled="!meta.valid"
                  >
                    등록
                  </v-btn>
                </v-col>
                <v-col cols="2">
                  <v-spacer />
                </v-col>
              </v-row>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">

</style>
