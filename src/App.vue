<template>
  <v-app v-if="me">
    <app-bar/>
    <app-menu/>
    <hero v-if="!store.searchActive"/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <auth v-else/>
</template>

<script setup>
import { useImagesStore } from './stores/app';

const me = localStorage.getItem("me")
const store = useImagesStore()
onMounted(() => {
  const search = JSON.parse(localStorage.getItem("search"))
  store.searchActive = search
})
</script>
