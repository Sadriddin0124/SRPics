<template>
    <div>
        <v-container>
            <h1 class="mt-6">Results for: <span class=" text-amber-accent-3">{{ result }}</span></h1>
        </v-container>
        <Images/>
    </div>
</template>

<script setup>
import { useImagesStore } from '@/stores/app';

const result = window.location.href.split("/")[4]
const store = useImagesStore()
onMounted(() => {
    store.searchData(result)
})
</script>
