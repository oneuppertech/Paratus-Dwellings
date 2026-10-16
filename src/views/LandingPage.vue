<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/* ---------- ASSETS (same filenames as before; missing images hide themselves) ---------- */
const asset = (name) => new URL(`../assets/${name}`, import.meta.url).href
const images = {
  logo: asset('paratus-dwellings-logo.jpeg'),
  hero: asset('hero.jpg'),
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
  { value: 2, suffix: '', label: 'Support Windows: Day & Evening' },
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

    <!-- NAVBAR -->
    <header class="fixed top-7 inset-x-0 z-50 bg-white/90 backdrop-blur shadow-lg py-2">
      <div class="absolute bottom-0 left-0 h-0.5 bg-[#A8E80F]" :style="{ width: progress + '%' }"></div>
      <div class="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <a href="#home"><img :src="images.logo" alt="Paratus Dwellings" class="h-12 w-auto" @error="hideBroken" /></a>
        <nav class="hidden lg:flex items-center gap-7" aria-label="Main">
          <a v-for="l in links" :key="l.href" :href="l.href"
            class="relative text-sm font-semibold text-[#0A2A5C] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#A8E80F] after:transition-all hover:after:w-full">{{ l.label }}</a>
          <a :href="TEL" class="px-5 py-2.5 rounded-full bg-[#A8E80F] text-[#0A2A5C] font-bold text-sm hover:bg-[#0A2A5C] hover:text-white transition-all hover:-translate-y-0.5 shadow-md">
            <i class="fa-solid fa-phone mr-1"></i> {{ PHONE }}
          </a>
        </nav>
        <button class="lg:hidden text-2xl text-[#0A2A5C]" @click="menuOpen = !menuOpen" aria-label="Menu">
          <i :class="menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
        </button>
      </div>
      <transition name="drop">
        <div v-if="menuOpen" class="lg:hidden bg-white shadow-xl mt-2 mx-4 rounded-2xl p-5 space-y-3">
          <a v-for="l in links" :key="l.href" :href="l.href" @click="menuOpen = false" class="block font-semibold text-[#0A2A5C] py-1">{{ l.label }}</a>
          <a :href="TEL" class="block text-center px-5 py-3 rounded-full bg-[#A8E80F] text-[#0A2A5C] font-bold">Call {{ PHONE }}</a>
        </div>
      </transition>
    </header>

    <!-- HERO -->
    <section id="home" class="relative min-h-screen flex items-center bg-gradient-to-br from-[#061a3a] via-[#0A2A5C] to-[#12418a] overflow-hidden">
      <img :src="images.hero" alt="" class="absolute inset-0 w-full h-full object-cover opacity-25" @error="hideBroken" />
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

    <!-- ABOUT -->
    <section id="about" class="py-24 px-5">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right" class="relative">
          <div class="absolute -top-6 -left-6 w-full h-full rounded-3xl border-4 border-[#A8E80F]"></div>
          <div class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A2A5C] to-[#12418a] aspect-[4/3] shadow-2xl">
            <img :src="images.about" alt="Paratus Dwellings supported home" class="w-full h-full object-cover" @error="hideBroken" />
          </div>
          <div class="absolute -bottom-8 -right-4 bg-[#A8E80F] text-[#0A2A5C] rounded-2xl px-7 py-5 shadow-xl float">
            <p class="text-3xl font-extrabold">3+</p>
            <p class="text-sm font-bold">Years Leadership Experience</p>
          </div>
        </div>
        <div data-aos="fade-left">
          <p :class="eyebrow">About Us</p>
          <h2 :class="h2">Supported homes, led by experience and built on safety.</h2>
          <p class="mt-5 text-slate-600 leading-relaxed">
            Paratus Dwellings Ltd provides supported accommodation for adults aged 18 and over. Our
            management team brings more than three years of leadership experience, and we run every home
            with safeguarding, health and safety and local housing compliance at the centre of daily practice.
          </p>
          <p class="mt-4 text-slate-600 leading-relaxed">
            Alongside accommodation, we offer day and evening support, life skills, digital skills and
            employability guidance, so residents can build confidence and move towards independence.
          </p>
          <div class="mt-8 space-y-5">
            <div v-for="(r, i) in reasons" :key="r.title" class="flex gap-4" data-aos="fade-up" :data-aos-delay="i * 120">
              <span class="shrink-0 w-12 h-12 rounded-xl bg-[#0A2A5C] text-[#A8E80F] flex items-center justify-center text-lg"><i :class="r.icon"></i></span>
              <div><h3 class="font-bold text-[#0A2A5C]">{{ r.title }}</h3><p class="text-sm text-slate-600">{{ r.text }}</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="py-24 px-5 bg-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <p :class="eyebrow">What We Do</p>
          <h2 :class="h2">Accommodation and support, built around the individual</h2>
          <p class="mt-4 text-slate-600">Person-centred, strengths-based and goal-focused, with safety and compliance underpinning everything.</p>
        </div>
        <div class="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <div v-for="(s, i) in services" :key="s.title" data-aos="fade-up" :data-aos-delay="(i % 3) * 120"
            class="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div class="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#A8E80F]/20 group-hover:scale-[3] transition-transform duration-700"></div>
            <span class="relative w-14 h-14 rounded-2xl bg-[#0A2A5C] text-[#A8E80F] flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform"><i :class="s.icon"></i></span>
            <h3 class="relative mt-6 text-xl font-bold text-[#0A2A5C]">{{ s.title }}</h3>
            <p class="relative mt-3 text-slate-600 text-sm leading-relaxed">{{ s.text }}</p>
            <a href="#contact" class="relative mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0A2A5C] group-hover:gap-3 transition-all">Enquire <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </section>

    <!-- DAY & EVENING SUPPORT -->
    <section id="support" class="py-24 px-5 bg-[#0A2A5C] relative overflow-hidden">
      <div class="blob absolute -left-24 top-10 w-80 h-80 rounded-full bg-[#A8E80F]/10 blur-3xl"></div>
      <div class="max-w-5xl mx-auto relative">
        <div class="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <p class="text-sm font-bold tracking-widest uppercase text-[#A8E80F]">Day & Evening Support</p>
          <h2 class="mt-3 text-3xl lg:text-4xl font-extrabold text-white">Support that fits the rhythm of real life</h2>
          <p class="mt-4 text-slate-300">Daytime builds skills and opportunities. Evenings keep homes settled, safe and connected.</p>
        </div>
        <div class="mt-10 flex justify-center gap-3" role="tablist">
          <button v-for="(v, k) in support" :key="k" role="tab" :aria-selected="tab === k" @click="tab = k"
            class="px-6 py-3 rounded-full font-bold text-sm transition-all"
            :class="tab === k ? 'bg-[#A8E80F] text-[#0A2A5C] shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'">
            <i :class="v.icon" class="mr-2"></i>{{ v.title }}
          </button>
        </div>
        <transition name="drop" mode="out-in">
          <ul :key="tab" class="mt-10 grid sm:grid-cols-2 gap-4">
            <li v-for="it in support[tab].items" :key="it" class="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-5 text-slate-100 hover:bg-white/10 transition">
              <span class="shrink-0 w-7 h-7 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center text-xs"><i class="fa-solid fa-check"></i></span>
              <span class="text-sm">{{ it }}</span>
            </li>
          </ul>
        </transition>
        <p class="mt-6 text-center text-xs text-slate-400">Support hours depend on the placement and agreed service. We do not provide personal care, nursing or clinical treatment.</p>
      </div>
    </section>

    <!-- SAFEGUARDING -->
    <section id="safeguarding" class="py-24 px-5">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <p :class="eyebrow">Safeguarding</p>
          <h2 :class="h2">Every adult has the right to live safe from abuse, neglect and exploitation</h2>
          <p class="mt-4 text-slate-600">Safeguarding is not an add-on. It shapes how we recruit, train, supervise, record and respond, every day and every evening.</p>
        </div>
        <div class="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(s, i) in safeguarding" :key="s.t" data-aos="zoom-in" :data-aos-delay="(i % 4) * 100"
            class="bg-slate-50 rounded-3xl p-7 hover:bg-[#0A2A5C] hover:-translate-y-2 transition-all duration-500 group">
            <span class="w-12 h-12 rounded-xl bg-[#0A2A5C] text-[#A8E80F] group-hover:bg-[#A8E80F] group-hover:text-[#0A2A5C] flex items-center justify-center text-lg transition"><i :class="s.icon"></i></span>
            <h3 class="mt-5 font-bold text-[#0A2A5C] group-hover:text-white transition">{{ s.t }}</h3>
            <p class="mt-2 text-sm text-slate-600 group-hover:text-slate-300 transition">{{ s.d }}</p>
          </div>
        </div>
        <div data-aos="fade-up" class="mt-12 rounded-3xl bg-gradient-to-br from-[#061a3a] to-[#12418a] p-8 lg:p-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 class="text-xl font-bold text-white"><i class="fa-solid fa-circle-exclamation text-[#A8E80F] mr-2"></i>Worried about someone's safety?</h3>
            <p class="mt-1 text-slate-300 text-sm">If anyone is in immediate danger, call 999. For other concerns, contact our team straight away.</p>
          </div>
          <a :href="TEL" class="px-7 py-3.5 rounded-full bg-[#A8E80F] text-[#0A2A5C] font-bold hover:bg-white transition-all hover:-translate-y-1 shadow-lg"><i class="fa-solid fa-phone mr-2"></i>{{ PHONE }}</a>
        </div>
      </div>
    </section>

    <!-- HEALTH & SAFETY + COMPLIANCE -->
    <section id="compliance" class="py-24 px-5 bg-slate-50">
      <div class="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 items-start">
        <div class="lg:col-span-2" data-aos="fade-right">
          <p :class="eyebrow">Health, Safety & Compliance</p>
          <h2 :class="h2">Safe, lawful and well-maintained homes</h2>
          <p class="mt-5 text-slate-600 leading-relaxed">
            We work to meet applicable health and safety, fire safety, landlord safety and local housing
            requirements, and we cooperate with local authority housing and environmental health teams.
          </p>
          <div class="mt-6 flex flex-col gap-3" role="tablist">
            <button v-for="(c, k) in compliance" :key="k" role="tab" :aria-selected="ctab === k" @click="ctab = k"
              class="flex items-center gap-3 text-left px-5 py-4 rounded-2xl font-bold transition-all"
              :class="ctab === k ? 'bg-[#0A2A5C] text-white shadow-lg translate-x-2' : 'bg-white text-[#0A2A5C] hover:bg-[#A8E80F]'">
              <i :class="c.icon" class="w-6 text-center"></i>{{ c.label }}
            </button>
          </div>
        </div>
        <transition name="drop" mode="out-in">
          <ul :key="ctab" class="lg:col-span-3 bg-white rounded-3xl shadow-xl p-8 space-y-4">
            <li v-for="it in compliance[ctab].items" :key="it" class="flex items-start gap-3">
              <span class="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center text-xs"><i class="fa-solid fa-check"></i></span>
              <span class="text-sm text-slate-700">{{ it }}</span>
            </li>
          </ul>
        </transition>
      </div>
    </section>

    <!-- CLEANING -->
    <section class="py-24 px-5">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right">
          <p :class="eyebrow">Clean Homes, Healthy Living</p>
          <h2 :class="h2">A professional cleaning standard in every home</h2>
          <p class="mt-5 text-slate-600 leading-relaxed">
            Clean, hygienic properties are part of safe living. Our cleaning approach keeps communal areas
            fresh, prepares rooms between residents, and teaches the practical housekeeping skills that
            support independent living.
          </p>
          <div class="mt-8 grid sm:grid-cols-2 gap-4">
            <div v-for="c in cleaning" :key="c.t" class="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 hover:shadow-md hover:-translate-y-1 transition-all">
              <span class="w-9 h-9 rounded-full bg-[#0A2A5C] text-[#A8E80F] flex items-center justify-center text-sm"><i :class="c.icon"></i></span>
              <span class="font-semibold text-[#0A2A5C] text-sm">{{ c.t }}</span>
            </div>
          </div>
          <a href="#contact" class="mt-9 inline-block px-8 py-4 rounded-full bg-[#0A2A5C] text-white font-bold hover:bg-[#A8E80F] hover:text-[#0A2A5C] transition-all hover:-translate-y-1 shadow-lg">Ask About Cleaning</a>
        </div>
        <div data-aos="fade-left" class="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#A8E80F] to-[#7bc20a] shadow-2xl flex items-center justify-center">
          <i class="fa-solid fa-spray-can-sparkles absolute text-[8rem] text-[#0A2A5C]/20"></i>
          <img :src="images.cleaning" alt="Cleaning" class="relative w-full h-full object-cover" @error="hideBroken" />
        </div>
      </div>
    </section>

    <!-- JOURNEY -->
    <section class="py-24 px-5 bg-[#0A2A5C] relative overflow-hidden">
      <div class="blob-slow absolute -right-24 top-10 w-80 h-80 rounded-full bg-[#A8E80F]/10 blur-3xl"></div>
      <div class="max-w-7xl mx-auto relative">
        <div class="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <p class="text-sm font-bold tracking-widest uppercase text-[#A8E80F]">Your Journey</p>
          <h2 class="mt-3 text-3xl lg:text-4xl font-extrabold text-white">Towards independence, one step at a time</h2>
        </div>
        <div class="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          <div v-for="(s, i) in steps" :key="s.n" data-aos="zoom-in" :data-aos-delay="i * 120"
            class="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500">
            <p class="text-4xl font-extrabold text-[#A8E80F]/80">{{ s.n }}</p>
            <h3 class="mt-3 text-lg font-bold text-white">{{ s.title }}</h3>
            <p class="mt-2 text-sm text-slate-300">{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SKILLS & EMPLOYABILITY -->
    <section id="skills" class="py-24 px-5 bg-slate-50">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right">
          <p :class="eyebrow">Life Skills & Employability</p>
          <h2 :class="h2">Building the skills for work and everyday life</h2>
          <p class="mt-5 text-slate-600 leading-relaxed">
            Residents work with our team on practical skills, digital confidence and job readiness. Where
            approved providers are available, we support progress towards relevant certificates.
          </p>
          <ul class="mt-8 grid sm:grid-cols-2 gap-4">
            <li v-for="(s, i) in skills" :key="s" data-aos="fade-up" :data-aos-delay="i * 80"
              class="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <span class="w-8 h-8 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center text-sm"><i class="fa-solid fa-check"></i></span>
              <span class="font-semibold text-[#0A2A5C] text-sm">{{ s }}</span>
            </li>
          </ul>
          <h3 class="mt-9 font-bold text-[#0A2A5C]">Who we support</h3>
          <ul class="mt-3 space-y-2 text-sm text-slate-600">
            <li v-for="g in supportGroups" :key="g"><i class="fa-solid fa-circle-check text-[#8fcf0a] mr-2"></i>{{ g }}</li>
          </ul>
        </div>
        <div data-aos="fade-left" class="relative">
          <div class="rounded-3xl overflow-hidden aspect-square bg-gradient-to-br from-[#0A2A5C] to-[#12418a] shadow-2xl flex items-center justify-center">
            <i class="fa-solid fa-laptop-code absolute text-[8rem] text-[#A8E80F]/20"></i>
            <img :src="images.training" alt="Skills session" class="relative w-full h-full object-cover" @error="hideBroken" />
          </div>
          <div class="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl px-6 py-4 float">
            <p class="text-2xl font-extrabold text-[#0A2A5C]">1:1 Plans</p>
            <p class="text-xs font-semibold text-slate-500">Individual development planning</p>
          </div>
        </div>
      </div>
    </section>

    <!-- GALLERY -->
    <section id="gallery" class="py-24 px-5">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <p :class="eyebrow">Life at Paratus</p>
          <h2 :class="h2">Homes, learning and community</h2>
        </div>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <button v-for="f in filters" :key="f" @click="activeFilter = f" class="px-5 py-2 rounded-full text-sm font-bold transition-all"
            :class="activeFilter === f ? 'bg-[#0A2A5C] text-white shadow-lg' : 'bg-slate-100 text-[#0A2A5C] hover:bg-[#A8E80F]'">{{ f }}</button>
        </div>
        <transition-group name="grid" tag="div" class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="p in visibleGallery" :key="p.title" class="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#0A2A5C] to-[#12418a] shadow-lg">
            <img :src="p.img" :alt="p.title" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" @error="hideBroken" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#061a3a]/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition"></div>
            <div class="absolute bottom-0 inset-x-0 p-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
              <span class="text-xs font-bold uppercase tracking-widest text-[#A8E80F]">{{ p.cat }}</span>
              <h3 class="mt-1 text-xl font-bold text-white">{{ p.title }}</h3>
            </div>
          </div>
        </transition-group>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 px-5 bg-slate-50">
      <div class="max-w-3xl mx-auto">
        <div class="text-center" data-aos="fade-up">
          <p :class="eyebrow">FAQ</p>
          <h2 :class="h2">Common questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="(f, i) in faqs" :key="f.q" data-aos="fade-up" :data-aos-delay="i * 60" class="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button class="w-full flex items-center justify-between gap-4 text-left px-6 py-5 font-bold text-[#0A2A5C]" :aria-expanded="openFaq === i" @click="openFaq = openFaq === i ? -1 : i">
              {{ f.q }}
              <i class="fa-solid fa-chevron-down transition-transform duration-300" :class="openFaq === i ? 'rotate-180 text-[#8fcf0a]' : ''"></i>
            </button>
            <div class="grid transition-all duration-500" :class="openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
              <div class="overflow-hidden"><p class="px-6 pb-5 text-slate-600 text-sm">{{ f.a }}</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT / REFERRAL -->
    <section id="contact" class="relative py-24 px-5 bg-gradient-to-br from-[#061a3a] via-[#0A2A5C] to-[#12418a] overflow-hidden">
      <div class="blob-slow absolute -right-20 top-10 w-96 h-96 rounded-full bg-[#A8E80F]/15 blur-3xl"></div>
      <div class="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div data-aos="fade-right">
          <p class="text-sm font-bold tracking-widest uppercase text-[#A8E80F]">Referrals & Enquiries</p>
          <h2 class="mt-3 text-3xl lg:text-5xl font-extrabold text-white leading-tight">Looking for a safe, supported home?</h2>
          <p class="mt-5 text-slate-300 max-w-lg">
            We welcome enquiries from local authorities, leaving-care teams, social workers, housing teams and
            adults aged 18+. All placements are subject to assessment, suitability and availability.
          </p>
          <ul class="mt-9 space-y-5 text-white">
            <li class="flex items-center gap-4"><span class="w-12 h-12 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center"><i class="fa-solid fa-phone"></i></span><a :href="TEL" class="hover:text-[#A8E80F]">{{ PHONE }}</a></li>
            <li class="flex items-center gap-4"><span class="w-12 h-12 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center"><i class="fa-solid fa-envelope"></i></span><a :href="'mailto:' + EMAIL + '?subject=Supported Accommodation Referral'" class="hover:text-[#A8E80F]">{{ EMAIL }}</a></li>
            <li class="flex items-center gap-4"><span class="w-12 h-12 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center"><i class="fa-solid fa-location-dot"></i></span>Contact us for current locations and availability</li>
          </ul>
        </div>

        <form data-aos="fade-left" @submit.prevent="submit" class="bg-white rounded-3xl p-8 shadow-2xl space-y-4">
          <div class="grid sm:grid-cols-2 gap-4">
            <input v-model="form.name" required type="text" placeholder="Full name" :class="input" />
            <input v-model="form.org" type="text" placeholder="Organisation (if any)" :class="input" />
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <input v-model="form.email" required type="email" placeholder="Email address" :class="input" />
            <input v-model="form.phone" type="tel" placeholder="Phone (optional)" :class="input" />
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <select v-model="form.category" required :class="input">
              <option value="" disabled>Reason for enquiry</option>
              <option v-for="c in categories" :key="c">{{ c }}</option>
            </select>
            <select v-model="form.contact" :class="input">
              <option>Email</option><option>Phone</option>
            </select>
          </div>
          <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
          <textarea v-model="form.message" required rows="4" placeholder="How can we help?" :class="input"></textarea>
          <p class="text-xs text-slate-500"><i class="fa-solid fa-lock mr-1"></i>Please do not include sensitive personal details or case records. We will advise on secure information sharing.</p>
          <label class="flex items-start gap-2 text-xs text-slate-600">
            <input v-model="form.consent" required type="checkbox" class="mt-0.5 accent-[#0A2A5C]" />
            I agree to Paratus Dwellings contacting me about this enquiry.
          </label>
          <button type="submit" class="w-full py-4 rounded-xl bg-[#0A2A5C] text-white font-bold hover:bg-[#A8E80F] hover:text-[#0A2A5C] transition-all hover:-translate-y-0.5 shadow-lg">Send Enquiry <i class="fa-solid fa-paper-plane ml-2"></i></button>
          <transition name="drop">
            <p v-if="sent" class="text-center text-sm font-semibold text-green-600"><i class="fa-solid fa-circle-check mr-1"></i> Thank you, we will be in touch soon.</p>
          </transition>
        </form>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-[#061a3a] text-slate-300 pt-16 pb-24 lg:pb-8 px-5">
      <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div class="md:col-span-2">
          <img :src="images.logo" alt="Paratus Dwellings" class="h-14 bg-white rounded-xl p-1" @error="hideBroken" />
          <p class="mt-4 text-sm max-w-sm">A place to call home. Skills to build your future. Opportunities to grow and thrive.</p>
          <p class="mt-3 text-xs max-w-sm text-slate-400">Supported accommodation for adults aged 18+. We do not provide personal care, nursing or clinical treatment.</p>
        </div>
        <div>
          <h4 class="font-bold text-white mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm"><li v-for="l in links" :key="l.href"><a :href="l.href" class="hover:text-[#A8E80F] transition">{{ l.label }}</a></li></ul>
        </div>
        <div>
          <h4 class="font-bold text-white mb-4">Policies</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#safeguarding" class="hover:text-[#A8E80F] transition">Safeguarding</a></li>
            <li><a href="#" class="hover:text-[#A8E80F] transition">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-[#A8E80F] transition">Cookie Policy</a></li>
            <li><a href="#" class="hover:text-[#A8E80F] transition">Complaints</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-xs">&copy; {{ new Date().getFullYear() }} Paratus Dwellings Ltd. All rights reserved.</div>
    </footer>

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