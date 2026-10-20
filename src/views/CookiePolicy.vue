<script setup>
import FooterView from '@/components/FooterView.vue'
import HeaderView from '@/components/HeaderView.vue'

const EMAIL = 'compliance@paratusdwellings.co.uk'
const WEBSITE = 'https://paratusdwellings.co.uk'
</script>

<template>
  <div class="font-sans text-slate-700 bg-white overflow-x-hidden scroll-smooth">

    <!-- PAGE HEADER -->
    <section class="relative bg-gradient-to-br from-[#061a3a] via-[#0A2A5C] to-[#12418a] pt-40 pb-16 px-5 overflow-hidden">
      <div class="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#A8E80F]/20 blur-3xl"></div>
      <div class="relative max-w-3xl mx-auto">
        <a href="/" class="text-sm font-semibold text-[#A8E80F] hover:underline"><i class="fa-solid fa-arrow-left mr-2"></i>Back to Home</a>
        <h1 data-aos="fade-up" class="mt-5 text-4xl sm:text-5xl font-extrabold text-white leading-tight">Cookie Policy</h1>
        <p data-aos="fade-up" data-aos-delay="100" class="mt-4 text-slate-300">Paratus Dwellings · Last updated: 16 October 2026</p>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="py-16 px-5">
      <article class="policy max-w-3xl mx-auto" data-aos="fade-up">
        <h2>What are cookies?</h2>
        <p>Cookies are small text files stored on your device when you visit a website. Similar technologies might also store information or access information on your device.</p>
        <p>Cookies help websites operate, remember preferences and understand how visitors interact with pages.</p>

        <h2>How we use cookies</h2>
        <p>Depending on the website features enabled, Paratus Dwellings might use:</p>
        <ul>
          <li><strong>Essential cookies:</strong> Support website security and core functions.</li>
          <li><strong>Preference cookies:</strong> Remember selected settings.</li>
          <li><strong>Analytics cookies:</strong> Help us understand website traffic and usage.</li>
          <li><strong>Functional cookies:</strong> Support optional website features.</li>
          <li><strong>Marketing cookies:</strong> Support advertising or marketing measurement, if introduced.</li>
        </ul>
        <p>We will disclose the cookies actually used on our website and their purposes through our cookie consent interface.</p>

        <h2>Consent and cookie management</h2>
        <p>Cookies that are strictly necessary for a service you request are generally exempt from consent requirements.</p>
        <p>We will obtain consent before placing non-essential cookies or using similar technologies where consent is required by law.</p>
        <p>Our cookie banner should provide options to accept all cookies, reject non-essential cookies and manage preferences.</p>
        <p>You should also be able to change or withdraw your consent after your initial selection.</p>
        <p>Blocking cookies through your browser settings might affect some website functions.</p>

        <h2>Third-party cookies</h2>
        <p>Some website features might involve third-party services, such as analytics tools, embedded media or maps. Those services might collect technical information or place cookies when enabled.</p>
        <p>We will identify applicable third-party technologies and provide relevant information through our cookie settings.</p>

        <h2>Changes to this policy</h2>
        <p>We might update this policy when our website features or cookie practices change. The latest version will be published on our website.</p>

        <!-- CONTACT CARD -->
        <div class="mt-14 rounded-3xl bg-slate-50 border-t-4 border-[#A8E80F] p-8">
          <h2 class="!mt-0">Contact Paratus Dwellings</h2>
          <p>For safeguarding concerns, privacy requests, cookie enquiries, complaints or general information, contact:</p>
          <p class="!mt-3">
            <strong class="text-[#0A2A5C]">Paratus Dwellings</strong><br />
            Email: <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a><br />
            Website: <a :href="WEBSITE" target="_blank" rel="noopener noreferrer">{{ WEBSITE }}</a>
          </p>
          <p>We are committed to protecting privacy, promoting safety and treating everyone who engages with our services fairly and respectfully.</p>
        </div>

        <p class="mt-8 text-sm text-slate-500">Document review: These policies should be reviewed regularly and updated whenever our services, legal obligations or website technologies change.</p>
      </article>
    </section>

  </div>
</template>

<style scoped>
.policy h2 { margin-top: 2.5rem; font-size: 1.5rem; font-weight: 800; line-height: 1.3; color: #0A2A5C; }
.policy h2:first-child { margin-top: 0; }
.policy h3 { margin-top: 1.75rem; font-size: 1.15rem; font-weight: 800; color: #0A2A5C; }
.policy p { margin-top: 1rem; line-height: 1.75; }
.policy ul { margin-top: 1rem; display: grid; gap: 0.6rem; }
.policy li { position: relative; padding-left: 1.75rem; line-height: 1.7; }
.policy li::before { content: ''; position: absolute; left: 0; top: 0.65rem; width: 0.6rem; height: 0.6rem; border-radius: 9999px; background: #A8E80F; }
.policy a { color: #0A2A5C; font-weight: 700; text-decoration: underline; text-decoration-color: #A8E80F; text-underline-offset: 3px; word-break: break-word; }
.policy a:hover { background: #A8E80F; }
</style>