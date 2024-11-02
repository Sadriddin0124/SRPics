<template>
  <v-carousel class="slide" show-arrows="hover" cycle hide-delimiter-background interval="3000" hide-delimiters>
    <v-carousel-item v-for="(slide, i) in images" :key="i">
        <div class="d-flex fill-height justify-center align-center full-width position-relative">
            <img :src="slide?.urls.small" :alt="slide?.alt_description" class="slider_img">
            <v-container class="h-100 position-relative z-2 w-100 d-flex flex-column container_slide">
                <h2 class=" text-h3 font-weight-bold">Welcome to our website!</h2>
                <p>You can find beautiful images that you wanted. Just type and see your choices.</p>
            </v-container>
        </div>
    </v-carousel-item>
  </v-carousel>
  <!-- <div class="h-100 position-relative z-2 bg-gray-accent-3 w-100 container_slide">
        <div class="flex flex-column container-fluid w-100">
            <h2 class=" text-h3 font-weight-bold">Welcome to our website!</h2>
            <p>You can find beautiful images that you wanted. Just type and see your choices.</p>
        </div>
    </div> -->
</template>
<script setup>
import { useImagesStore } from "@/stores/app";
const store = useImagesStore()
const images = computed(() => store?.carousel?.results || []);

onMounted(() => {
    store.carouselData()
})
</script>
<style scoped>
.slide {
    width: 100%;
    height: 100vh !important;
}
.slider_img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(.6);
}
.container_slide {
    display: flex;
    max-height: 100vh;
    justify-content: center;
    gap: 20px;
}
.container_slide h2, p {
    color: white;
}
@media (max-width: 1024px) {
    .slide {
        height: 80vh !important;
    }
}
@media (max-width: 620px) {
    .slide {
        height: 60vh !important;
    }
}
@media (max-width: 447px) {
    .slide {
        height: 50vh !important;
    }
}
</style>