import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
const client_id = "59cegTi0aTgwHxhiFv-oqZqz0pWOaD1R2OwH0OUbVi8"
const BASE_URL = "https://api.unsplash.com"
export const useImagesStore = defineStore('images', () => {

  // state

  const data = ref(null);
  const carousel = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const likedItems = JSON.parse(localStorage.getItem("liked")) // Reaktiv likedItems
  const likedImages = ref(null)
  const barActive = ref(false)
  
  //actions
  const changeBarActive = () => {
    barActive.value = !barActive.value
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const changeTheme = () => {
    let theme = localStorage.getItem("theme")
    if (!theme) {
      localStorage.setItem("theme", "dark")
    }else if (theme === "dark") {
      localStorage.setItem("theme", "light")
    }else if(theme === "light"){
      localStorage.setItem("theme", "dark")
    }
    window.location.reload()
  }
  //get
  const fetchData = async (page) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${BASE_URL}/search/photos?query=${page}&_page=${page}&per_page=30&client_id=${client_id}`);
      data.value = response.data;
      console.log(response.data);
    } catch (err) {
      error.value = err.message || 'Something went wrong';
    } finally {
      loading.value = false;
    }
  };
  const carouselData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${BASE_URL}/search/photos?query=season&_page=1&per_page=30&client_id=${client_id}`);
      carousel.value = response.data;
      console.log(response.data);
    } catch (err) {
      error.value = err.message || 'Something went wrong';
    } finally {
      loading.value = false;
    }
  };
  const searchData = async (value) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${BASE_URL}/search/photos?query=${value}&_page=1&per_page=30&client_id=${client_id}`);
      data.value = response.data;
      return response
    } catch (err) {
      error.value = err.message || 'Something went wrong';
    } finally {
      loading.value = false;
    }
  };
  const likedPhotos = async (page) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${BASE_URL}/search/photos?query=latest&_page=${page}&per_page=30&client_id=${client_id}`);
      const filtered = response.data.results.filter(item=> likedItems.includes(item?.id))
      likedImages.value = filtered;
    } catch (err) {
      error.value = err.message || 'Something went wrong';
    } finally {
      loading.value = false;
    }
  };

  //functions
  const shareContent = async (item) => {
    const shareData = {
      url: item, // Replace with your URL
    };
  
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Successful share');
      } else {
        alert('Share this link: ' + shareData.url);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };


  return { 
    //state

    data,
    loading,
    error,
    carousel,
    likedImages,
    barActive,

    //actions

    fetchData,
    searchData,
    likedPhotos,
    shareContent,
    changeBarActive,
    changeTheme,
    carouselData,
    scrollToTop
  }
})
