<template>
  <v-app-bar class=" bg-orange-darken-2 position-fixed">
    <v-app-bar-title>
      <router-link to="/" class=" text-decoration-none text-white" @click="reload">
        <v-avatar color="purple" class=" position-relative">
          <img src="../assets/male.png" alt="User" class=" rounded-circle w-100 h-100" v-if="me.gender === 'male'">
          <img src="../assets/female.png" alt="User" class=" rounded-circle w-100 h-100" v-else-if="me.gender === 'female'">
          <img src="../assets/user.png" alt="User" class=" rounded-circle w-100 h-100" v-else>
        </v-avatar>
      </router-link>
    </v-app-bar-title>
    <form class=" w-25 d-flex justify-end pr-3" @submit="searchImage">
        <v-text-field
        width="100%"
        min-width="200px"
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search templates"
        variant="solo"
        hide-details
        single-line
        @click:append-inner="onClick"
        @blur="active = false"
        v-model="searchValue"
        v-if="active"
        ></v-text-field>
        <v-btn icon="mdi-magnify" v-else @click="active = true"></v-btn>
    </form>
    <template v-slot:append>
      <router-link to="/liked" class=" text-decoration-none text-white" @click="store.scrollToTop">
        <v-btn icon="mdi-heart" :class="active ? 'd-none' : 'd-block'">
        </v-btn>
      </router-link>
      <v-btn icon="mdi-dots-vertical" :class="active ? 'd-none' : 'd-block'" @click="store.changeBarActive"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useImagesStore } from '@/stores/app';
import { ref } from 'vue';
const store = useImagesStore()
const searchValue = ref('')
const router = useRouter()
const reload = () => {
  localStorage.setItem("search", JSON.stringify(false))
  store.searchActive = false
  router.push("/") 
  store.fetchData(1) 
  store.scrollToTop()
}
const getData = async() => {
    const image = await store.searchData(searchValue.value)
    if (image?.status === 200) {
      router.push(`/search/${searchValue.value}`)
      localStorage.setItem("search", JSON.stringify(true))
    }
}
const me = ref(JSON.parse(localStorage.getItem("me")));
const loaded = ref(false);
const loading = ref(false);

const searchImage = (e) => {
    e.preventDefault();
  loading.value = true;
    getData()
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
  store.scrollToTop()
};
const onClick = () => {
  loading.value = true;
    getData()
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
};
const active = ref(false)
</script>

<style lang="scss" scoped></style>
