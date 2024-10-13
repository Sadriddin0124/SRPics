<template>
    <div class=" px-2 py-10 d-flex flex-column align-items-center w-100 justify-content-center">
        <div class="mx-auto position-relative w-25 h-25 mb-10">
            <div class="rounded-circle w-100 h-100 overflow-hidden cursor-pointer" @click="imageActive = !imageActive">
                <img src="../assets/male.png" alt="User" class=" rounded-circle w-100 h-100" v-if="me.gender === 'male'">
                <img src="../assets/female.png" alt="User" class=" rounded-circle w-100 h-100" v-else-if="me.gender === 'female'">
                <img src="../assets/user.png" alt="User" class=" rounded-circle w-100 h-100" v-else>
            </div>
            <div class="w-100 flex position-absolute zed" v-if="imageActive" @click="imageActive = !imageActive">
                <img @click="changeGender('male')" src="../assets/male.png" alt="Male" class=" rounded-circle w-50 h-50 border-primary rounded-circle cursor-pointer bg-blue">
                <img @click="changeGender('female')" src="../assets/female.png" alt="Female" class=" rounded-circle w-50 h-50 border-primary rounded-circle cursor-pointer bg-blue">
            </div>
      </div>
      <v-responsive
        class="mx-auto mt-16"
        max-width="344"
        width="100%"
    >
        <v-text-field
        v-model="me.firstName"
        hide-details="auto"
        label="First Name"
        clearable
        ></v-text-field>
        <v-text-field
        v-model="me.lastName"
        hide-details="auto"
        label="Last Name"
        clearable
        ></v-text-field>
        <v-text-field
        v-model="me.email"
        hide-details="auto"
        label="Email"
        clearable
        ></v-text-field>
        <v-text-field
        v-model="me.password"
        hide-details="auto"
        label="Password"
        clearable
        ></v-text-field>
        <v-btn
            width="100%"
          min-width="164"
          color="blue"
          class="mt-3"
          @click="SaveData"
        >
          save
        </v-btn>
        <v-btn append-icon="$logOut" color="red" variant="outlined" block class="mt-3">
            Log Out
        </v-btn>
    </v-responsive>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const me = ref(JSON.parse(localStorage.getItem("me"))); // Reaktiv likedItems

  const imageActive = ref(false);
  const changeGender = (gender) => {
    const aboutMe = {...me.value, gender: gender}
    localStorage.setItem("me", JSON.stringify(aboutMe))
    me.value = aboutMe
};
const SaveData = () => {
    localStorage.setItem("me", JSON.stringify(me.value))
    console.log(me);
    
  }
  </script>
  <style scoped>
.zed {
    z-index: 30;
}
.zed img:hover {
    border: 5px solid violet
}
</style>