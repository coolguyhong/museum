<script setup>
import { ref } from 'vue'

const items = ref([
  { title: '부동산 물건', icon: 'mdi-domain', to: '/real-estate' },
  { title: 'Grid List Page', icon: 'mdi-view-grid-outline', to: '/grid-list-page' },
  { title: 'Breakpoints', icon: 'mdi-format-page-break', to: '/breakpoints' },
])
</script>

<template>
  <v-navigation-drawer>
    <v-list nav>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :to="item.to"
        :title="item.title"
        :prepend-icon="item.icon"
        active-class="bg-primary"
        class="py-1"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped lang="sass">

</style>
