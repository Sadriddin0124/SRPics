<template>
    <button @click="shareContent" class="share-button">
      Share This
    </button>
  </template>
  
  <script setup>
  const shareContent = async () => {
    const shareData = {
      title: 'Check this out!',
      text: 'This is a great article about share buttons!',
      url: 'https://example.com', // Replace with your URL
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
  </script>
  
  <style scoped>
  .share-button {
    padding: 10px 15px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  </style>
  