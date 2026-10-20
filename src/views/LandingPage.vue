<script setup>
import FooterView from '@/components/FooterView.vue'
import HeaderView from '@/components/HeaderView.vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import AboutPage from './AboutPage.vue'
import ServicesPage from './ServicesPage.vue'
import SupportPage from './SupportPage.vue'
import SafeGuarding from './SafeGuarding.vue'
import CompliancePage from './CompliancePage.vue'
import CleaningPage from './CleaningPage.vue'
import JourneyPage from './JourneyPage.vue'
import SkillsPage from './SkillsPage.vue'
import GalleryPage from './GalleryPage.vue'
import FaqPage from './FaqPage.vue'
import ContactPage from './ContactPage.vue'

/* ---------- ASSETS (same filenames as before; missing images hide themselves) ---------- */
const asset = (name) => new URL(`../assets/${name}`, import.meta.url).href
const images = {
  logo: asset('paratus-dwellings-logo.png'),
  hero: asset('Hero-image.jpeg'),
  about: asset('about.jpg'),
  cleaning: asset('cleaning.jpg'),
  training: asset('training.jpg'),
  p1: asset('project-1.jpg'),
  p2: asset('project-2.jpg'),
  p3: asset('project-3.jpg'),
  p4: asset('project-4.jpg'),
  p5: asset('project-5.jpg'),
  p6: asset('project-6.jpg')
}
const hideBroken = (e) => (e.target.style.display = 'none')
const PHONE = '07350 154705'
const TEL = 'tel:07350154705'
const EMAIL = 'info@paratusdwellings.co.uk'

/* shared class strings */
const eyebrow = 'text-sm font-bold tracking-widest uppercase text-[#8fcf0a]'
const h2 = 'mt-3 text-3xl lg:text-4xl font-extrabold text-[#0A2A5C] leading-tight'
const input =
  'w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A8E80F]'

/* ---------- NAV / UI STATE ---------- */
const scrolled = ref(false)
const progress = ref(0)
const menuOpen = ref(false)
const cookies = ref(true)
const onScroll = () => {
  scrolled.value = window.scrollY > 40
  const h = document.documentElement.scrollHeight - window.innerHeight
  progress.value = h > 0 ? (window.scrollY / h) * 100 : 0
}
const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Day & Evening', href: '#support' },
  { label: 'Safeguarding', href: '#safeguarding' },
  { label: 'Referrals', href: '#contact' }
]

/* ---------- DATA ---------- */
const stats = [
  { value: 18, suffix: '+', label: 'Adults Supported' },
  { value: 3, suffix: '+', label: 'Years Leadership Experience' },
  { value: 2, suffix: '', label: 'Support Window: 24 Hours' },
  { value: 5, suffix: '', label: 'Step Individual Journey' }
]
const counts = ref(stats.map(() => 0))
const statsEl = ref(null)
let statsObserver = null
let counted = false
const runCounters = () => {
  if (counted) return
  counted = true
  const start = performance.now()
  const tick = (now) => {
    const p = Math.min((now - start) / 1600, 1)
    const e = 1 - Math.pow(1 - p, 3)
    counts.value = stats.map((s) => Math.round(s.value * e))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

const reasons = [
  { icon: 'fa-solid fa-shield-heart', title: 'Safe Homes', text: 'Safeguarding-led, health and safety-checked, and compliant with local housing requirements.' },
  { icon: 'fa-solid fa-hands-holding-circle', title: 'Skilled People', text: 'Life skills, digital skills and employability support for confident independence.' },
  { icon: 'fa-solid fa-sun', title: 'Brighter Futures', text: 'Person-centred plans that turn goals into real next steps.' }
]

const services = [
  { icon: 'fa-solid fa-house-chimney-user', title: 'Supported Accommodation', text: 'A stable, safe and welcoming place to live for adults aged 18+ working towards independence.' },
  { icon: 'fa-solid fa-sun-bright', title: 'Day & Evening Support', text: 'Structured daytime support and a settled, supervised evening environment.' },
  { icon: 'fa-solid fa-person-walking-arrow-right', title: 'Independent Living Skills', text: 'Budgeting, cooking, shopping, time management and household routines.' },
  { icon: 'fa-solid fa-broom', title: 'Housekeeping & Cleaning', text: 'Clean, hygienic homes and shared spaces, plus practical cleaning skills for residents.' },
  { icon: 'fa-solid fa-briefcase', title: 'Employability Support', text: 'CVs, job searching, applications, interview practice and workplace readiness.' },
  { icon: 'fa-solid fa-laptop', title: 'Digital Skills', text: 'Everyday digital confidence, with certification pathways where approved providers are available.' },
  { icon: 'fa-solid fa-user-shield', title: 'Safeguarding', text: 'Clear procedures to protect adults, record concerns and escalate them appropriately.' },
  { icon: 'fa-solid fa-helmet-safety', title: 'Health & Safety', text: 'Risk assessments, fire safety and regular property and activity checks.' },
  { icon: 'fa-solid fa-clipboard-check', title: 'Housing Compliance', text: 'Working to meet local housing, licensing and landlord safety requirements.' }
]

const tab = ref('day')
const support = {
  day: {
    icon: 'fa-solid fa-sun',
    title: 'Day Support',
    items: [
      'Individual development planning and key-work sessions',
      'Budgeting, cooking and household routine coaching',
      'CV writing, job searching and interview practice',
      'Digital skills sessions and online applications',
      'Help attending appointments, education and training',
      'Tenancy, housing and property-related guidance'
    ]
  },
  evening: {
    icon: 'fa-solid fa-moon',
    title: 'Evening Support',
    items: [
      'A calm, safe and welcoming evening environment',
      'Support with meal routines, shared living and wind-down',
      'Prompt response to concerns, incidents and house issues',
      'Guided activities, social groups and peer connection',
      'Check-ins and awareness of well-being changes',
      'Escalation of safeguarding concerns through proper channels'
    ]
  }
}

const safeguarding = [
  { icon: 'fa-solid fa-user-lock', t: 'Designated Safeguarding Lead', d: 'A named lead who receives, records and acts on concerns.' },
  { icon: 'fa-solid fa-id-card-clip', t: 'Safer Recruitment', d: 'Robust recruitment checks, including DBS, references and induction.' },
  { icon: 'fa-solid fa-graduation-cap', t: 'Regular Training', d: 'Staff trained to spot abuse, neglect, exploitation and online harm.' },
  { icon: 'fa-solid fa-triangle-exclamation', t: 'Clear Escalation', d: 'Concerns are recorded and referred to the local authority safeguarding team.' },
  { icon: 'fa-solid fa-person-circle-question', t: 'Missing Person Protocol', d: 'A defined response when a resident is unexpectedly absent.' },
  { icon: 'fa-solid fa-scale-balanced', t: 'Boundaries & Dignity', d: 'Professional boundaries, equality and respect in every interaction.' },
  { icon: 'fa-solid fa-lock', t: 'Confidentiality', d: 'Personal information is protected and shared only when necessary.' },
  { icon: 'fa-solid fa-bullhorn', t: 'Feedback & Whistleblowing', d: 'Clear complaints and whistleblowing routes for residents and staff.' }
]

const ctab = ref('hs')
const compliance = {
  hs: {
    label: 'Health & Safety',
    icon: 'fa-solid fa-helmet-safety',
    items: [
      'Risk assessments for properties, residents and planned activities',
      'Fire risk assessment, working alarms, clear escape routes and regular fire drills',
      'Accident and incident recording with managed follow-up actions',
      'First aid awareness and emergency procedures',
      'Safe kitchen practice and food hygiene awareness',
      'Lone working and staff safety arrangements',
      'Scheduled property inspections and prompt repairs reporting'
    ]
  },
  housing: {
    label: 'Local Housing Compliance',
    icon: 'fa-solid fa-clipboard-check',
    items: [
      'Annual gas safety checks and valid certification',
      'Electrical installation condition checks within required timescales',
      'Smoke and carbon monoxide alarms, tested regularly',
      'Legionella risk awareness and water-safety checks',
      'HMO and supported-housing licensing, where applicable',
      'Properties kept free from hazards under the Housing Health and Safety Rating System',
      'Clear licence or tenancy agreements and Right to Rent checks',
      'Working with local authority housing and environmental health teams'
    ]
  },
  clean: {
    label: 'Cleaning & Hygiene',
    icon: 'fa-solid fa-spray-can-sparkles',
    items: [
      'Planned cleaning schedules for communal areas',
      'Deep cleans between residents and end-of-tenancy cleaning',
      'COSHH-aware cleaning products and safe storage',
      'Pest, damp and mould awareness with fast reporting',
      'Waste and recycling routines',
      'Resident housekeeping coaching and shared-space standards'
    ]
  }
}

const cleaning = [
  { icon: 'fa-solid fa-house-circle-check', t: 'Home & Communal Cleaning' },
  { icon: 'fa-solid fa-key', t: 'End-of-Tenancy Cleaning' },
  { icon: 'fa-solid fa-sparkles', t: 'Deep Cleans & Refresh' },
  { icon: 'fa-solid fa-hand-sparkles', t: 'Resident Housekeeping Skills' }
]

const steps = [
  { n: '01', title: 'Initial Assessment', text: 'We discuss circumstances, strengths, risks and support needs.' },
  { n: '02', title: 'Development Plan', text: 'Agree practical goals for living, learning and work.' },
  { n: '03', title: 'Skills Development', text: 'Structured life, digital and employability sessions.' },
  { n: '04', title: 'Education & Work', text: 'Support into training, job searches and interviews.' },
  { n: '05', title: 'Progress & Independence', text: 'Review achievements and plan the next step.' }
]

const filters = ['All', 'Accommodation', 'Learning', 'Community', 'Cleaning']
const activeFilter = ref('All')
const gallery = [
  { title: 'Shared Living Space', cat: 'Accommodation', img: images.p1 },
  { title: 'Private Bedroom', cat: 'Accommodation', img: images.p2 },
  { title: 'Cooking Session', cat: 'Learning', img: images.p3 },
  { title: 'Digital Skills Class', cat: 'Learning', img: images.training },
  { title: 'Community Outing', cat: 'Community', img: images.p4 },
  { title: 'Group Activity', cat: 'Community', img: images.p5 },
  { title: 'Communal Area Clean', cat: 'Cleaning', img: images.cleaning },
  { title: 'Welcoming Entrance', cat: 'Accommodation', img: images.p6 }
]
const visibleGallery = computed(() =>
  activeFilter.value === 'All' ? gallery : gallery.filter((p) => p.cat === activeFilter.value)
)

const skills = [
  'Budgeting & Money Management',
  'Cooking & Meal Planning',
  'Digital Skills & Online Safety',
  'CV, Applications & Interviews',
  'Time & Household Management',
  'Communication & Confidence'
]

const supportGroups = [
  'Care leavers preparing for independent living',
  'Adults transitioning into independent living',
  'Adults seeking education, training or work',
  'Adults facing housing instability'
]

const faqs = [
  { q: 'Who is your accommodation for?', a: 'Adults aged 18 and over who need a safe home and practical support to build independent living skills, including care leavers and those at risk of housing instability. Every placement is subject to assessment, suitability and availability.' },
  { q: 'What are your support hours?', a: 'We provide day and evening support. Exact hours depend on the placement and the service agreed with the referrer. Contact us to discuss.' },
  { q: 'How do you keep residents safe?', a: 'Through safeguarding procedures, trained staff, risk assessments, fire and property safety checks, and clear routes for raising concerns.' },
  { q: 'Do you provide personal care or nursing?', a: 'No. We do not provide personal care, nursing or clinical treatment. Our focus is accommodation, practical independence skills and employability.' },
  { q: 'Do you offer cleaning services?', a: 'Cleaning is part of how we keep homes safe and hygienic, including communal and end-of-tenancy cleaning, and we teach practical housekeeping skills. Ask us about wider cleaning enquiries.' },
  { q: 'Who can make a referral?', a: 'Local authorities, leaving-care teams, social workers, housing teams, personal advisers, education and employment providers, and adults or their representatives.' },
  { q: 'Is accommodation guaranteed after a referral?', a: 'No. Placements depend on assessment, suitability and availability.' },
  { q: 'Do you guarantee certificates or jobs?', a: 'No. We support residents towards relevant certificates and employment, but outcomes depend on provider arrangements, eligibility and individual progress.' }
]
const openFaq = ref(0)

const categories = ['Supported accommodation', 'Referral enquiry', 'Independent living support', 'Employability and training', 'Digital skills', 'Cleaning enquiry', 'Partnership', 'General enquiry']
const blank = () => ({ name: '', org: '', email: '', phone: '', category: '', contact: 'Email', message: '', consent: false, website: '' })
const form = ref(blank())
const sent = ref(false)
const submit = () => {
  if (form.value.website) return // honeypot spam trap
  // TODO: connect to your backend / secure email service
  sent.value = true
  setTimeout(() => (sent.value = false), 5000)
  form.value = blank()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  statsObserver = new IntersectionObserver((e) => e[0].isIntersecting && runCounters(), { threshold: 0.4 })
  if (statsEl.value) statsObserver.observe(statsEl.value)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  statsObserver && statsObserver.disconnect()
})
</script>

<template>
  <div class="font-sans text-slate-700 bg-white overflow-x-hidden scroll-smooth">
    <!-- SAFEGUARDING STRIP -->
    <div class="fixed top-0 inset-x-0 z-[60] bg-[#061a3a] text-white text-xs sm:text-sm py-1.5 px-4 text-center">
      <i class="fa-solid fa-triangle-exclamation text-[#A8E80F] mr-1"></i>
      In immediate danger? Call <strong>999</strong>. Safeguarding concern?
      <a :href="TEL" class="font-bold text-[#A8E80F] underline">{{ PHONE }}</a>
    </div>

    <header-view/>

    <!-- HERO -->
    <section id="home" class="relative min-h-screen flex items-center bg-gradient-to-br from-[#061a3a] via-[#0A2A5C] to-[#12418a] overflow-hidden">
      <img :src="images.hero" alt="" class="absolute inset-0 w-full h-full object-cover" @error="hideBroken" />
      <div class="absolute inset-0 bg-gradient-to-r from-[#061a3a]/90 to-transparent"></div>
      <div class="blob absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#A8E80F]/20 blur-3xl"></div>
      <div class="blob-slow absolute bottom-0 left-10 w-72 h-72 rounded-full bg-[#A8E80F]/10 blur-3xl"></div>

      <div class="relative max-w-7xl mx-auto px-5 pt-40 pb-24 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span data-aos="fade-down" class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#A8E80F] text-xs font-bold tracking-widest uppercase">
            <i class="fa-solid fa-house"></i> Supported Accommodation · Adults 18+
          </span>
          <h1 data-aos="fade-up" data-aos-delay="100" class="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            A Place to Call Home.<br />
            <span class="text-[#A8E80F]">Skills to Build Your Future.</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" class="mt-6 text-lg text-slate-200 max-w-xl">
            Safe, well-managed supported accommodation for adults aged 18 and over, with day and evening
            support, practical life skills and employability, delivered with a strong focus on safeguarding,
            health and safety and housing compliance.
          </p>
          <div data-aos="fade-up" data-aos-delay="300" class="mt-9 flex flex-wrap gap-4">
            <a href="#contact" class="group px-8 py-4 rounded-full bg-[#A8E80F] text-[#0A2A5C] font-bold shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all">
              Make a Referral <i class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform inline-block"></i>
            </a>
            <a href="#services" class="px-8 py-4 rounded-full border-2 border-white/40 text-white font-bold hover:bg-white hover:text-[#0A2A5C] transition-all">
              <i class="fa-solid fa-compass mr-2"></i> Explore Our Services
            </a>
          </div>
        </div>

        <div data-aos="zoom-in" data-aos-delay="200" class="relative hidden lg:flex justify-center">
          <div class="relative w-[420px] h-[420px] float">
            <div class="absolute inset-0 rounded-[3rem] rotate-6 bg-[#A8E80F]/30"></div>
            <div class="absolute inset-0 rounded-[3rem] -rotate-3 bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center">
              <i class="fa-solid fa-house-chimney-user text-[7rem] text-[#A8E80F]/40"></i>
            </div>
            <div class="absolute -left-8 top-10 bg-white rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-3 float-delay">
              <span class="w-10 h-10 rounded-full bg-[#A8E80F]/30 text-[#0A2A5C] flex items-center justify-center"><i class="fa-solid fa-shield-halved"></i></span>
              <div><p class="text-xs text-slate-500">Always</p><p class="font-bold text-[#0A2A5C]">Safeguarding First</p></div>
            </div>
            <div class="absolute -right-6 bottom-12 bg-white rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-3 float">
              <span class="w-10 h-10 rounded-full bg-[#0A2A5C]/10 text-[#0A2A5C] flex items-center justify-center"><i class="fa-solid fa-sun"></i><i class="fa-solid fa-moon ml-0.5"></i></span>
              <div><p class="text-xs text-slate-500">Support</p><p class="font-bold text-[#0A2A5C]">Day & Evening</p></div>
            </div>
          </div>
        </div>
      </div>
      <a href="#about" class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-2xl bounce-y" aria-label="Scroll down"><i class="fa-solid fa-chevron-down"></i></a>
    </section>

    <!-- STATS -->
    <section ref="statsEl" class="relative -mt-14 z-10 px-5">
      <div class="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
        <div v-for="(s, i) in stats" :key="s.label" class="p-8 text-center" data-aos="fade-up" :data-aos-delay="i * 100">
          <p class="text-4xl lg:text-5xl font-extrabold text-[#0A2A5C]">{{ counts[i] }}<span class="text-[#8fcf0a]">{{ s.suffix }}</span></p>
          <p class="mt-2 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <about-page/>

  
    <ServicesPage/>
    
  

    <FaqPage/>

    <ContactPage/>
   

    <!-- MOBILE STICKY CALL BAR -->
    <div class="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 bg-white shadow-[0_-4px_20px_rgba(0,0,0,.1)]">
      <a :href="TEL" class="py-3.5 text-center font-bold text-[#0A2A5C]"><i class="fa-solid fa-phone mr-2"></i>Call</a>
      <a href="#contact" class="py-3.5 text-center font-bold bg-[#A8E80F] text-[#0A2A5C]"><i class="fa-solid fa-paper-plane mr-2"></i>Refer</a>
    </div>

    <!-- COOKIE BANNER -->
    <transition name="drop">
      <div v-if="cookies" class="fixed bottom-16 lg:bottom-6 left-4 right-4 lg:right-auto lg:max-w-md z-[55] bg-[#0A2A5C] text-white rounded-2xl p-5 shadow-2xl">
        <p class="text-sm">We use essential cookies, and optional analytics cookies only with your consent.</p>
        <div class="mt-3 flex gap-3">
          <button @click="cookies = false" class="px-5 py-2 rounded-full bg-[#A8E80F] text-[#0A2A5C] font-bold text-sm">Accept</button>
          <button @click="cookies = false" class="px-5 py-2 rounded-full border border-white/40 text-sm font-semibold hover:bg-white/10">Essential only</button>
        </div>
      </div>
    </transition>

    <!-- back to top -->
    <transition name="drop">
      <a v-if="scrolled" href="#home" aria-label="Back to top" class="fixed bottom-20 lg:bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center shadow-xl hover:-translate-y-1 transition"><i class="fa-solid fa-arrow-up"></i></a>
    </transition>
  </div>
</template>

<style scoped>
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
@keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(30px, -30px) scale(1.15); } }
@keyframes bounceY { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 10px); } }
.float { animation: float 5s ease-in-out infinite; }
.float-delay { animation: float 6s ease-in-out 1s infinite; }
.blob { animation: blob 9s ease-in-out infinite; }
.blob-slow { animation: blob 14s ease-in-out infinite reverse; }
.bounce-y { animation: bounceY 1.8s ease-in-out infinite; }
.drop-enter-active, .drop-leave-active { transition: all 0.3s ease; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-10px); }
.grid-enter-active, .grid-leave-active { transition: all 0.5s ease; }
.grid-enter-from, .grid-leave-to { opacity: 0; transform: scale(0.9); }
.grid-leave-active { position: absolute; }
@media (prefers-reduced-motion: reduce) {
  .float, .float-delay, .blob, .blob-slow, .bounce-y { animation: none; }
}
</style>