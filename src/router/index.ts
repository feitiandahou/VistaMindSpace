import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/website',
      name: 'website-hub',
      component: () => import('@/views/websitehub/WebsitHub.vue'),
    },
    {
      path: '/prompt',
      name: 'ai-prompt-words',
      component: () => import('@/views/aiprompt/AiPromptWords.vue'),
    },
    {
      path: '/personal',
      name: 'personal-center',
      component: () => import('@/views/personalcenter/PersonalCenter.vue'),
    },
  ],
})

export default router
