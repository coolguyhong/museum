<script setup>
import { ref } from 'vue'

const items = ref([
  { title: 'Grid System', icon: 'mdi-grid-large', to: '/grid-system' },
  { title: 'Grid List Page', icon: 'mdi-view-grid-outline', to: '/grid-list-page' },
  { title: 'Breakpoints', icon: 'mdi-format-page-break', to: '/breakpoints' },
])
</script>

<template>
  <v-navigation-drawer>
    <v-list
      :items="items"
    />
  </v-navigation-drawer>
</template>

<style scoped lang="sass">

</style>
