import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import AboutPage from '@/views/AboutPage.vue'
import CleaningPage from '@/views/CleaningPage.vue'
import CompliancePage from '@/views/CompliancePage.vue'
import ContactPage from '@/views/ContactPage.vue'
import FaqPage from '@/views/FaqPage.vue'
import GalleryPage from '@/views/GalleryPage.vue'
import JourneyPage from '@/views/JourneyPage.vue'
import SafeGuarding from '@/views/SafeGuarding.vue'
import ServicesPage from '@/views/ServicesPage.vue'
import SkillsPage from '@/views/SkillsPage.vue'
import SupportPage from '@/views/SupportPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/cleaning',
      name: 'cleaning',
      component: CleaningPage
    },
    {
      path: '/compliance',
      name: 'compliance',
      component: CompliancePage
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqPage
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryPage
    },
    {
      path: '/journey',
      name: 'journey',
      component: JourneyPage
    },
    {
      path: '/safeguarding',
      name: 'safeguarding',
      component: SafeGuarding
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesPage
    },
    {
      path: '/skills',
      name: 'skills',
      component: SkillsPage
    },
    {
      path: '/support',
      name: 'support',
      component: SupportPage
    },
   
  ],
  scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }

  return {
    top: 0,
    left: 0,
    behavior: 'smooth'
  }
}
})


export default router
