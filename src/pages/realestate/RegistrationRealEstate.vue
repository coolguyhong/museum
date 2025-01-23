<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import ContentTitle from '@/components/ContentTitle.vue'
import {ref} from 'vue'

const test = ref('')

const address = () => {
  new window.daum.Postcode({
    oncomplete: function(data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
      // 예제를 참고하여 다양한 활용법을 확인해 보세요.
    }
  }).open();
}

</script>

<template>
  <v-container fluid>
    <ContentTitle>
      부동산 물건
      <Breadcrumb>
        <span>부동산 물건</span>
        <span>부동산 물건 등록</span>
      </Breadcrumb>
    </ContentTitle>
    <v-row>
      <v-col cols="auto">
        <v-text-field v-model="test" />
        <v-btn @click="address">
          주소검색
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">

</style>
