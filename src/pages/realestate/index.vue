<script setup>
import ContentTitle from '@/components/ContentTitle.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import {ref} from 'vue'
import {getFormatDate} from '@/utils/date.js'

const desserts = [
  {
    aptComplexName: '동탄지웰에스테이트',
    address: '경기도 화성시 동탄반석로 160',
    detailAddress: 'B동 704호',
    ownerName: '박준홍',
    type: '오피스텔',
    rent: '15000/7.5',
    contractStartDt: '2024-03-02',
    contractEndDt: '2025-03-02',
    rentalBusinessYn: 'Y',
  },
  {
    aptComplexName: '동탄현대하이페리온',
    address: '경기도 화성시 동탄반석로 156',
    detailAddress: '515호',
    ownerName: '박준홍',
    type: '오피스텔',
    rent: '16000/5',
    contractStartDt: '2024-03-02',
    contractEndDt: '2025-10-21',
    rentalBusinessYn: 'Y',
  },
  {
    aptComplexName: '동탄트라이엄프',
    address: '경기도 화성시 메타폴리스로 47-11',
    detailAddress: '815호',
    ownerName: '박준홍',
    type: '오피스텔',
    rent: '15500',
    contractStartDt: '2024-03-02',
    contractEndDt: '2025-05-30',
    rentalBusinessYn: 'Y',
  },
  {
    aptComplexName: '센트럴시티',
    address: '경기도 화성시 노작로 175',
    detailAddress: '1610호',
    ownerName: '박준홍',
    type: '오피스텔',
    rent: '19000',
    contractStartDt: '2024-03-02',
    contractEndDt: '2025-09-20',
    rentalBusinessYn: 'Y',
  },
  {
    aptComplexName: '동탄파라곤',
    address: '경기도 화성시 동탄반석로 172',
    detailAddress: '478호',
    ownerName: '박준홍',
    type: '오피스텔',
    rent: '17500/4',
    contractStartDt: '2024-03-02',
    contractEndDt: '2025-10-23',
    rentalBusinessYn: 'Y',
  },
  {
    aptComplexName: '삼성스마트쉐르빌',
    address: '경기도 화성시 노작로 207',
    detailAddress: '1804호',
    ownerName: '박준홍',
    type: '오피스텔',
    rent: '14300/10',
    contractStartDt: '2024-03-02',
    contractEndDt: '2027-01-20',
    rentalBusinessYn: 'Y',
  },
  {
    aptComplexName: '동탄헤리움',
    address: '경기도 화성시 동탄하나1길 61',
    detailAddress: '814호',
    ownerName: '박준홍',
    type: '오피스텔',
    rent: '12700',
    contractStartDt: '2024-03-02',
    contractEndDt: '2026-02-21',
    rentalBusinessYn: 'Y',
  },
  {
    aptComplexName: '동탄푸르지오시티',
    address: '경기도 화성시 동탄원천로 360',
    detailAddress: '1610호',
    ownerName: '박준홍',
    type: '오피스텔',
    rent: '12000/15',
    contractStartDt: '2024-03-02',
    contractEndDt: '2026-02-28',
    rentalBusinessYn: 'Y',
  },
  {
    aptComplexName: '광교푸르지오시티3단지',
    address: '경기도 용인시 수지구 광교중앙로296번길 14',
    detailAddress: '1005호',
    ownerName: '박준홍',
    type: '오피스텔',
    rent: '13000/30',
    contractStartDt: '2024-03-02',
    contractEndDt: '2025-10-27',
    rentalBusinessYn: 'Y',
  },
  {
    aptComplexName: '한라비발디파크',
    address: '경기도 수원시 권선구 효원로256번길 33',
    detailAddress: '1120호',
    ownerName: '박준홍',
    type: '오피스텔',
    rent: '21000',
    contractStartDt: '2024-03-02',
    contractEndDt: '2026-08-13',
    rentalBusinessYn: 'Y',
  },
  {
    aptComplexName: '송파파크하비오푸르지오',
    address: '서울 송파구 송파대로 111',
    detailAddress: '203동 1203호',
    ownerName: '박준홍',
    type: '오피스텔',
    rent: '23000',
    contractStartDt: '2024-03-02',
    contractEndDt: '2027-03-04',
    rentalBusinessYn: 'Y',
  },
  {
    aptComplexName: '송파아이파크',
    address: '서울 송파구 법원로 55',
    detailAddress: 'E동 1505호',
    ownerName: '박준홍',
    type: '오피스텔',
    rent: '300/200',
    contractStartDt: '2024-03-02',
    contractEndDt: '2025-04-17',
    rentalBusinessYn: 'N',
  },
  {
    aptComplexName: '신성,신안,쌍용,진흥',
    address: '경기 수원시 영통구 매영로310번길 12',
    detailAddress: '544동 1307호',
    ownerName: '박준홍',
    type: '아파트',
    rent: '18000',
    contractStartDt: '2024-03-02',
    contractEndDt: '2027-01-30',
    rentalBusinessYn: 'N',
  },
  {
    aptComplexName: '신명,한국',
    address: '경기 수원시 영통구 봉영로1770번길 21',
    detailAddress: '203동 503호',
    ownerName: '박준홍',
    type: '아파트',
    rent: '27000',
    contractStartDt: '2024-03-02',
    contractEndDt: '2025-09-04',
    rentalBusinessYn: 'N',
  },
  {
    aptComplexName: '주공그린빌12단지',
    address: '경기 안산시 단원구 광덕2로 74',
    detailAddress: '1207동 903호',
    ownerName: '박준홍',
    type: '아파트',
    rent: '26000',
    contractStartDt: '2024-03-02',
    contractEndDt: '2025-08-16',
    rentalBusinessYn: 'Y',
  },
  {
    aptComplexName: '햇빛23단지주공',
    address: '경기 고양시 덕양구 화신로 105',
    detailAddress: '2305동 501호',
    ownerName: '박준홍',
    type: '아파트',
    rent: '17000',
    contractStartDt: '2024-03-02',
    contractEndDt: '2025-09-23',
    rentalBusinessYn: 'N',
  },
  {
    aptComplexName: '달빛1단지',
    address: '경기 고양시 덕양구 화중로 217',
    detailAddress: '107동 401호',
    ownerName: '박준홍',
    type: '아파트',
    rent: '34500',
    contractStartDt: '2024-03-02',
    contractEndDt: '2027-03-14',
    rentalBusinessYn: 'Y',
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
          if (sortOrder === 'desc') {
            const result = items.sort((a, b) => a[sortKey] > b[sortKey] ? -1 : 1)
            const paginated = result.slice(start, end === -1 ? undefined : end)

            resolve({ items: paginated, total: items.length })
          } else {
            const result = items.sort((a, b) => a[sortKey] < b[sortKey] ? -1 : 1)
            const paginated = result.slice(start, end === -1 ? undefined : end)

            resolve({ items: paginated, total: items.length })
          }
        } else {
          const paginated = items.slice(start, end === -1 ? undefined : end)

          resolve({ items: paginated, total: items.length })
        }
      }, 500)
    })
  },
}

const itemsPerPage = ref(10)
const headers = ref([
  { title: '단지명', align: 'start', sortable: false, key: 'aptComplexName', width: 130 },
  { title: '주소', align: 'start', sortable: false, key: 'address', width: 190 },
  { title: '상세주소', align: 'start', sortable: false, key: 'detailAddress', width: 80 },
  { title: '소유주', align: 'center', sortable: false, key: 'ownerName', width: 60 },
  { title: '유형', align: 'center', sortable: false, key: 'type', width: 60 },
  { title: '계약시작일', align: 'center', key: 'contractStartDt', width: 90,},
  { title: '계약종료일', align: 'center', key: 'contractEndDt', width: 90,},
  { title: '임대료', align: 'start', sortable: false, key: 'rent', width: 10 },
  { title: '임대사업자', align: 'center', sortable: false, key: 'rentalBusinessYn', width: 70 },
  { title: 'Actions', align: 'center', sortable: false, key: 'actions', width: 1 },
])
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)

const loadItems = ({ page, itemsPerPage, sortBy }) => {
  loading.value = true
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    serverItems.value = items
    totalItems.value = total
    loading.value = false
  })
}

const searchAptComplexName = ref('')
const searchDetailAddress = ref('')
const ownerName = ref('')
const contractEndDt = ref([])

const moveToDetail = (item) => {
  alert('moveToDetail : ' + item.aptComplexName)
}
const deleteItem = (item) => {
  alert('deleteItem: ' + item.aptComplexName)
}
const register = () => {
  alert('moteToRegister')
}
const search = () => {
  alert('search')
}

const contractEndDtFrom = ref('')
const contractEndDtTo = ref('')
const changeContractEndDt = (value) => {
  contractEndDtFrom.value = getFormatDate(value[0], 'YYYY-MM-DD')
  contractEndDtTo.value = getFormatDate(value[value.length - 1], 'YYYY-MM-DD')
  alert('changeContractEndDt: ' + contractEndDtFrom.value + ' ~ ' + contractEndDtTo.value)
}
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
      :loading="loading"
      show-current-page
      item-value="aptComplexName"
      @update:options="loadItems"
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
