import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
const client_id = "client_id=59cegTi0aTgwHxhiFv-oqZqz0pWOaD1R2OwH0OUbVi8"
const BASE_URL = "https://api.unsplash.com"

export const useImagesStore = defineStore('images', () => {

  // state

  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  
  //actions

  const fetchData = async (page) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${BASE_URL}/search/photos?query=latest&_page=${page}&per_page=30&${client_id}`);
      data.value = response.data;
      console.log(response?.data);
      
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
      const response = await axios.get(`${BASE_URL}/search/photos?query=${value}&_page=1&per_page=30&${client_id}`);
      data.value = response.data;
      console.log(response?.data);
      return response.data
    } catch (err) {
      error.value = err.message || 'Something went wrong';
    } finally {
      loading.value = false;
    }
  };

  //getters

  return { 
    //state

    data,
    loading,
    error,

    //actions

    fetchData,
    searchData


  }
})