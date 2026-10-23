<template>
  <footer
    class="bg-white text-slate-600 border-t-4 border-[#A8E80F] shadow-[0_-8px_30px_rgba(10,42,92,.08)] pt-16 pb-8 px-5"
  >
    <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
      <!-- Company information -->
      <div class="md:col-span-2">
        <RouterLink to="/">
          <img :src="images.logo" alt="Paratus Dwellings" class="h-14 w-auto" @error="hideBroken" />
        </RouterLink>

        <p class="mt-4 text-sm max-w-sm">
          A place to call home. Skills to build your future. Opportunities to grow and thrive.
        </p>

        <p class="mt-3 text-xs max-w-sm text-slate-500">
          Supported accommodation for adults aged 18+. We do not provide personal care, nursing or
          clinical treatment.
        </p>

        <!-- Company Address -->
<div class="mt-5 flex items-start gap-3 text-sm">
  <div
    class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#A8E80F]/20 text-[#0A2A5C]"
  >
    <i class="fa-solid fa-location-dot text-base"></i>
  </div>

  <div>
    <h4 class="font-bold text-[#0A2A5C] mb-1">
      Paratus Dwellings Ltd
    </h4>

    <address class="not-italic leading-6 text-slate-500">
      Office 21822<br />
      182–184 High Street North<br />
      East Ham, London<br />
      E6 2JA, United Kingdom
    </address>

    <a
      href="https://www.google.com/maps/search/?api=1&query=Office+21822%2C+182-184+High+Street+North%2C+East+Ham%2C+London+E6+2JA"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-2 inline-flex items-center gap-1 font-semibold text-[#0A2A5C] hover:text-[#15803d] transition"
    >
      Get directions
      <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
    </a>
  </div>
</div>

        <a
          href="https://www.cleaning.paratusdwellings.co.uk/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-[#A8E80F] text-[#0A2A5C] font-bold text-sm shadow-md hover:bg-[#0A2A5C] hover:text-white hover:-translate-y-0.5 transition-all duration-300"
        >
          <i class="fa-solid fa-broom"></i>
          Visit Our Cleaning Agency
          <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
        </a>
      </div>

      <!-- Quick links -->
      <div>
        <h4 class="font-bold text-[#0A2A5C] mb-4">Quick Links</h4>

        <ul class="space-y-2 text-sm">
          <li v-for="link in links" :key="link.to">
            <RouterLink
              :to="link.to"
              class="hover:text-[#0A2A5C] hover:underline decoration-[#A8E80F] decoration-2 underline-offset-4 transition"
              active-class="text-[#15803d]"
              exact-active-class="text-[#15803d]"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Policies -->
      <div>
        <h4 class="font-bold text-[#0A2A5C] mb-4">Policies</h4>

        <ul class="space-y-2 text-sm">
          <li>
            <RouterLink to="/safeguardingpolicy" class="footer-link"> Safeguarding </RouterLink>
          </li>

          <li>
            <RouterLink to="/privacy" class="footer-link"> Privacy Policy </RouterLink>
          </li>

          <li>
            <RouterLink to="/cookie" class="footer-link"> Cookie Policy </RouterLink>
          </li>

          <li>
            <RouterLink to="/compliant" class="footer-link"> Complaints </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Copyright -->
    <div
      class="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-500"
    >
      &copy; {{ currentYear }} Paratus Dwellings Ltd. All rights reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const asset = (name: string) => new URL(`../assets/${name}`, import.meta.url).href

const images = {
  logo: asset('paratus-dwellings-logo.png')
}

const currentYear = new Date().getFullYear()

const hideBroken = (event: Event) => {
  ;(event.target as HTMLImageElement).style.display = 'none'
}

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Support', to: '/support' },
  { label: 'Safeguarding', to: '/safeguarding' },
  { label: 'Referrals', to: '/contact' },
  { label: 'Skills', to: '/skills' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'FAQs', to: '/faq' }
]
</script>

<style scoped>
.footer-link {
  @apply hover:text-[#0A2A5C] hover:underline
         decoration-[#A8E80F] decoration-2
         underline-offset-4 transition;
}
</style>
