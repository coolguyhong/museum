<script setup>
import ContentTitle from '@/components/ContentTitle.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { ref } from 'vue'

const aptComplexName = ref('')

const desserts = [
  {
    aptComplexName: 'Frozen Yogurt',
    address: 159,
    detailAddress: 6.0,
    type: 24,
    rent: 4.0,
    contractStartDt: '1',
    contractEndDt: '1',
    rentalBusinessYn: '1',
  },
  {
    aptComplexName: 'Frozen Yogurt',
    address: 159,
    detailAddress: 6.0,
    type: 24,
    rent: 4.0,
    contractStartDt: '1',
    contractEndDt: '1',
    rentalBusinessYn: '1',
  },
  {
    aptComplexName: 'Frozen Yogurt',
    address: 159,
    detailAddress: 6.0,
    type: 24,
    rent: 4.0,
    contractStartDt: '1',
    contractEndDt: '1',
    rentalBusinessYn: '1',
  },
  {
    aptComplexName: 'Frozen Yogurt',
    address: 159,
    detailAddress: 6.0,
    type: 24,
    rent: 4.0,
    contractStartDt: '1',
    contractEndDt: '1',
    rentalBusinessYn: '1',
  },
  {
    aptComplexName: 'Frozen Yogurt',
    address: 159,
    detailAddress: 6.0,
    type: 24,
    rent: 4.0,
    contractStartDt: '1',
    contractEndDt: '1',
    rentalBusinessYn: '1',
  },
  {
    aptComplexName: 'Frozen Yogurt',
    address: 159,
    detailAddress: 6.0,
    type: 24,
    rent: 4.0,
    contractStartDt: '1',
    contractEndDt: '1',
    rentalBusinessYn: '1',
  },
  {
    aptComplexName: 'Frozen Yogurt',
    address: 159,
    detailAddress: 6.0,
    type: 24,
    rent: 4.0,
    contractStartDt: '1',
    contractEndDt: '1',
    rentalBusinessYn: '1',
  },
  {
    aptComplexName: 'Frozen Yogurt',
    address: 159,
    detailAddress: 6.0,
    type: 24,
    rent: 4.0,
    contractStartDt: '1',
    contractEndDt: '1',
    rentalBusinessYn: '1',
  },
  {
    aptComplexName: 'Frozen Yogurt',
    address: 159,
    detailAddress: 6.0,
    type: 24,
    rent: 4.0,
    contractStartDt: '1',
    contractEndDt: '1',
    rentalBusinessYn: '1',
  },
  {
    aptComplexName: 'Frozen Yogurt',
    address: 159,
    detailAddress: 6.0,
    type: 24,
    rent: 4.0,
    contractStartDt: '1',
    contractEndDt: '1',
    rentalBusinessYn: '1',
  },
  {
    aptComplexName: 'Frozen Yogurt',
    address: 159,
    detailAddress: 6.0,
    type: 24,
    rent: 4.0,
    contractStartDt: '1',
    contractEndDt: '1',
    rentalBusinessYn: '1',
  },
]

const FakeAPI = {
  async fetch ({ page, itemsPerPage, sortBy }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = desserts.slice()

        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }

        const paginated = items.slice(start, end)

        resolve({ items: paginated, total: items.length })
      }, 500)
    })
  },
}

const itemsPerPage = ref(10)
const headers = ref([
  {
    title: '단지명',
    align: 'center',
    sortable: false,
    key: 'aptComplexName',
  },
  {
    title: '주소',
    align: 'center',
    sortable: false,
    key: 'address'
  },
  {
    title: '상세주소',
    align: 'center',
    sortable: false,
    key: 'detailAddress'
  },
  {
    title: '유형',
    align: 'center',
    sortable: false,
    key: 'type'
  },
  { title: '임대료',
    align: 'center',
    sortable: false,
    key: 'rent'
  },
  {
    title: '계약시작일',
    align: 'center',
    key: 'contractStartDt'
  },
  {
    title: '계약종료일',
    align: 'center',
    key: 'contractEndDt'
  },
  {
    title: '임대사업자',
    align: 'center',
    sortable: false,
    key: 'rentalBusinessYn'
  },
])
const search = ref('')
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)

const loadItems = (page, itemsPerPage, sortBy) => {
  loading.value = true
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    serverItems.value = items
    totalItems.value = total
    loading.value = false
  })
}
loadItems(0, 10, [{key: 'contractEndDt', order: 'desc'}])
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
            v-model="aptComplexName"
            clearable
            label="단지명"
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="aptComplexName"
            clearable
            label="상세주소"
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="aptComplexName"
            clearable
            label="소유주"
          />
        </v-col>
        <v-col cols="3">
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
          >
            검색
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="name"
      @update:options="loadItems"
    />
  </v-container>
</template>

<style scoped lang="sass">

</style>
