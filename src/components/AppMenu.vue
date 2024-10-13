<template>
    <v-card
        :class="store.barActive ? ' right-0 menu' : 'menu rightM'"
    >
    <h3 class=" text-center">Actions</h3>
        <v-btn block class="my-2" @click="toProfile">Profile</v-btn>
        <v-btn block class="my-2" @click="store.changeTheme">change Theme</v-btn>
    </v-card>
</template>

<script setup>
import { useImagesStore } from '@/stores/app';
const store = useImagesStore()
const router = useRouter()
const toProfile = () => {
    router.push('/profile')
    store.changeBarActive()
}
</script>

<style scoped>
    .menu {
        position: fixed;
        top: 64px;
        width: 200px;
        min-height: 100px;
        z-index: 200;
        border-radius: 0 0 5px 5px;
        padding: 10px;
        transition: .4s all;
    }
    .rightM {
        right: -200px;
    }
</style>
