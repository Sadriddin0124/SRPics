<template>
  <div class="full-width fill-height bg-grey-darken-4">
    <v-card
      class="mx-auto bg-grey-darken-4 gap-0 rounded-0 pt-6"
      max-width="1200"
    >
      <v-container fluid class="px-0 px-sm-5">
        <v-row v-if="storeImages.loading">
          <v-col v-for="(item, index) in loadingData"
            class=" mb-2"
            :key="index"
            :cols="
              width < 1024 && width > 700 ? 6 : width < 700 ? 12 : colsFn(index)
            ">
            <v-skeleton-loader
              class="mx-auto border"
              type="card-avatar, actions"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row dense v-else>
          <v-col
            v-for="(item, index) in images"
            :key="index"
            :cols="
              width < 1024 && width > 700 ? 6 : width < 700 ? 12 : colsFn(index)
            "
          >
            <v-card class="rounded-0">
              <v-img
                :src="item.urls.small_s3"
                class="align-end object-fit-cover"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                :height="
                  width < 960 && width > 700
                    ? '200px'
                    : width > 700 && width > 420
                    ? '300px'
                    : width < 420
                    ? 'auto'
                    : '300px'
                "
                cover
              >
                <v-card-title
                  class="text-white"
                  v-text="item.description"
                ></v-card-title>
              </v-img>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  icon="mdi-heart"
                  size="small"
                  @click="disLikedPhoto(item?.id)"
                  v-if="likedItems.includes(item?.id)"
                ></v-btn>
                <v-btn
                  color="medium-emphasis"
                  icon="mdi-heart"
                  size="small"
                  @click="likedPhoto(item?.id)"
                  v-else
                ></v-btn>
                <v-btn
                  color="medium-emphasis"
                  icon="mdi-download"
                  size="small"
                  @click="downloadImage(item)"
                ></v-btn>
                <v-btn
                  color="medium-emphasis"
                  icon="mdi-share-variant"
                  size="small"
                  @click="storeImages.shareContent(item)"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-pagination
      :length="12"
      v-model="currentPage"
      @click="switchPage"
      class="mt-6"
    ></v-pagination>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useImagesStore } from "@/stores/app";

const storeImages = useImagesStore();
const images = computed(() => storeImages?.likedImages || []);
console.log(images.value);

const loadingData = [1, 2, 3, 4, 5];
const currentPage = ref(1);
const likedItems = ref(JSON.parse(localStorage.getItem("liked")) || []); // Reaktiv likedItems

onMounted(() => {
  const page = Number(localStorage.getItem("page"));
  if (page) {
    currentPage.value = page;
  } else {
    currentPage.value = 1;
  }
  storeImages.likedPhotos(currentPage.value);
});

const switchPage = () => {
  localStorage.setItem("page", currentPage.value);
  storeImages.fetchData(currentPage.value); // Refresh data instead of reload
};

const downloadImage = (item) => {
  const imageUrl = item.urls.raw;
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${item.slug}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error("Error downloading the image: ", error);
    });
};

const width = ref(window.innerWidth);
const updateSize = () => {
  width.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSize);
});

const selected = [0, 1, 5, 6, 10, 11, 15, 16, 20, 21, 25, 26];
const colsFn = (index) => {
  return selected.includes(index) ? 6 : 4;
};

const likedPhoto = (id) => {
  if (!likedItems.value.includes(id)) {
    likedItems.value.push(id); // Add the liked item
    localStorage.setItem("liked", JSON.stringify(likedItems.value)); // Save to localStorage
  }
};

const disLikedPhoto = (id) => {
  likedItems.value = likedItems.value.filter(item => item !== id); // Remove the disliked item
  localStorage.setItem("liked", JSON.stringify(likedItems.value)); // Update localStorage
};
</script>
