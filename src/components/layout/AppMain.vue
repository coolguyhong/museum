<script setup>
import AppFooter from '@/components/layout/AppFooter.vue'
import AppNavigationDrawer from '@/components/layout/AppNavigationDrawer.vue'
import AppBar from '@/components/layout/AppBar.vue'
import { ref } from 'vue'

const drawer = ref(false);


</script>

<template>
  <AppBar @on-click-nav="drawer = !drawer" />
  <AppNavigationDrawer v-model="drawer" />

  <v-main>
    <v-container fluid>
      <router-view />
    </v-container>
  </v-main>

  <AppFooter />
</template>

<style scoped lang="sass">

</style>
