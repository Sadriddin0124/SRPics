<template>
  <v-app v-if="me">
    <app-bar/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <auth v-else/>
</template>

<script setup>
const me = localStorage.getItem("me")
</script>
