import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import Images from '@/pages/images.vue';
import Liked from '@/pages/liked.vue';
import Profile from '@/pages/Profile.vue';
import Search from '@/pages/search.vue';

// Yangi qo'lda marshrutlar
const customRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Images, // Qo'shilgan sahifani import qilish
  },
  {
    path: '/liked',
    name: 'Liked',
    component: Liked, // Qo'shilgan sahifani import qilish
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/search/:id",
    name: "Search",
    component: Search
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([...routes, ...customRoutes]), // Yangi marshrutni mavjudlariga qo'shish
});

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
});

export default router;
