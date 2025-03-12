<script setup>
import ContentTitle from '@/components/ContentTitle.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { ref } from 'vue'
import { getFormatDate } from '@/utils/date.js'
import { useAxios } from '@vueuse/integrations/useAxios'

const itemsPerPage = ref(10)
const headers = ref([
  { title: '단지명', align: 'start', sortable: false, key: 'buildingName', width: 130 },
  { title: '주소', align: 'start', sortable: false, key: 'roadAddress', width: 190 },
  { title: '상세주소', align: 'start', sortable: false, key: 'detailAddress', width: 80 },
  { title: '소유주', align: 'center', sortable: false, key: 'ownerName', width: 60 },
  { title: '유형', align: 'center', sortable: false, key: 'buildingType', width: 60 },
  { title: '계약시작일', align: 'center', key: 'contractStartDate', width: 90, },
  { title: '계약종료일', align: 'center', key: 'contractEndDate', width: 90, },
  { title: '임대료', align: 'start', sortable: false, key: 'rent', width: 10 },
  { title: '임대사업자', align: 'center', sortable: false, key: 'housingRentalBusinessYn', width: 70 },
  { title: 'Actions', align: 'center', sortable: false, key: 'actions', width: 1 },
])
const serverItems = ref([])
const totalItems = ref(0)
const searchAptComplexName = ref('')
const searchDetailAddress = ref('')
const ownerName = ref('')
const contractEndDt = ref([])

const moveToDetail = (item) => {
  alert('moveToDetail : ' + item.buildingName)
}
const deleteItem = (item) => {
  alert('deleteItem: ' + item.buildingName)
}
const register = () => {
  alert('moteToRegister')
}
const search = () => {
  execute()
}

const contractEndDtFrom = ref('')
const contractEndDtTo = ref('')
const changeContractEndDt = (value) => {
  contractEndDtFrom.value = getFormatDate(value[0], 'YYYY-MM-DD')
  contractEndDtTo.value = getFormatDate(value[value.length - 1], 'YYYY-MM-DD')
  alert('changeContractEndDt: ' + contractEndDtFrom.value + ' ~ ' + contractEndDtTo.value)
}
const params = ref({
  sortKey: 'contractEndDate',
  sortOrder: 'desc',
  page: 0,
  size: 10
})
const { execute, data, isLoading } = useAxios('/v1/real-estates', { method: 'GET', params: params.value }, {
  onSuccess: (res) => {
    console.log(res)
    alert('list success')
  },
  onError: (error) => {
    console.log(error)
    alert('list error')
  }
})
</script>

<template>
  <v-container fluid>
    <ContentTitle>
      부동산 물건
      <Breadcrumb>
        <span>부동산 물건</span>
        <span>부동산 물건 목록</span>
      </Breadcrumb>
    </ContentTitle>
    <div class="my-7 bg-grey-lighten-3">
      <v-row class="px-6">
        <v-col cols="3">
          <v-text-field
            v-model="searchAptComplexName"
            clearable
            label="단지명"
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="searchDetailAddress"
            clearable
            label="상세주소"
          />
        </v-col>
        <v-col cols="3">
          <div class="d-flex justify-center">
            <v-date-input
              v-model="contractEndDt"
              label="계약종료일"
              prepend-icon=""
              prepend-inner-icon="$calendar"
              clearable
              :show-adjacent-months="true"
              multiple="range"
              @update:model-value="changeContractEndDt"
            />
          </div>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="ownerName"
            clearable
            label="소유주"
          />
        </v-col>
        <v-col cols="1">
          <v-select
            clearable
            :items="['아파트', '오피스텔', '빌라']"
            label="유형"
          />
        </v-col>
      </v-row>
      <v-row
        justify="end"
        class="px-6 mt-0"
      >
        <v-col cols="2">
          <v-btn
            size="x-large"
            block
            @click="search"
          >
            검색
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-row
      justify="end"
      class="mt-10 mb-0"
    >
      <v-col cols="1">
        <v-btn
          size="large"
          block
          @click="register"
        >
          등록
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="isLoading"
      show-current-page
      item-value="aptComplexName"
      @update:options="execute"
    >
      <template #item.aptComplexName="{ item, value }">
        <a
          class="text-decoration-underline"
          href="#"
          style="color : #046582;"
          @click="moveToDetail(item)"
        >{{ value }}</a>
      </template>
      <template #item.actions="{ item }">
        <v-icon
          size="small"
          style="cursor: pointer"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<style scoped lang="sass">

</style>
