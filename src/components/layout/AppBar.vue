<script setup>

</script>

<template>
  <v-app-bar
    color="primary"
    density="compact"
  >
    <template #prepend>
      <v-app-bar-nav-icon @click="$emit('onClickNav')" />
    </template>

    <v-app-bar-title>PJS consulting</v-app-bar-title>

    <template #append>
      <v-btn icon="mdi-logout" />
    </template>
  </v-app-bar>
</template>

<style scoped lang="sass">

</style>
