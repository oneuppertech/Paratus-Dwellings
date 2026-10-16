<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

/* ---------- ASSETS ----------
   Change these filenames to match what is in your src/assets folder.
   If an image is missing it hides itself and the gradient fallback shows. */
const asset = (name) => new URL(`../assets/${name}`, import.meta.url).href
const images = {
  logo: asset('paratus-dwellings-logo.jpeg'),
  hero: asset('hero.jpg'),
  about: asset('about.jpg'),
  cleaning: asset('cleaning.jpg'),
  project1: asset('project-1.jpg'),
  project2: asset('project-2.jpg'),
  project3: asset('project-3.jpg'),
  project4: asset('project-4.jpg'),
  project5: asset('project-5.jpg'),
  project6: asset('project-6.jpg'),
  training: asset('training.jpg')
}
const hideBroken = (e) => (e.target.style.display = 'none')

/* ---------- NAV ---------- */
const scrolled = ref(false)
const menuOpen = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 40)
const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills Academy', href: '#skills' },
  { label: 'Contact', href: '#contact' }
]

/* ---------- DATA ---------- */
const stats = [
  { value: 250, suffix: '+', label: 'Homes Delivered' },
  { value: 120, suffix: '+', label: 'Artisans Trained' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' }
]
const counts = ref(stats.map(() => 0))
const statsEl = ref(null)
let statsObserver = null
let counted = false

const runCounters = () => {
  if (counted) return
  counted = true
  const duration = 1800
  const start = performance.now()
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    counts.value = stats.map((s) => Math.round(s.value * eased))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

const services = [
  {
    icon: 'fa-solid fa-house-chimney',
    title: 'Residential Construction',
    text: 'Quality new-build homes designed around safety, comfort and long-term value.'
  },
  {
    icon: 'fa-solid fa-trowel-bricks',
    title: 'Renovation & Remodelling',
    text: 'Breathe new life into existing spaces with modern finishes and smart upgrades.'
  },
  {
    icon: 'fa-solid fa-broom',
    title: 'Domestic Cleaning',
    text: 'Reliable home cleaning to keep houses, flats and living spaces fresh, clean and comfortable.'
  },
  {
    icon: 'fa-solid fa-building',
    title: 'Commercial Cleaning',
    text: 'Professional cleaning solutions for offices, business premises and shared spaces.'
  },
  {
    icon: 'fa-solid fa-key',
    title: 'End-of-Tenancy Cleaning',
    text: 'Thorough property cleaning to help landlords, tenants and letting agents prepare properties for handover.'
  },
  {
    icon: 'fa-solid fa-helmet-safety',
    title: 'Safety & Compliance',
    text: 'A safety-conscious approach to property work, with appropriate procedures for each job.'
  },
  {
    icon: 'fa-solid fa-users-gear',
    title: 'Skilled Workforce',
    text: 'Practical skills development that supports quality workmanship and employment opportunities.'
  },
  {
    icon: 'fa-solid fa-ruler-combined',
    title: 'Design & Planning',
    text: 'Practical planning for property improvements, making the most of every square metre.'
  },
  {
    icon: 'fa-solid fa-spray-can-sparkles',
    title: 'Post-Construction Cleaning',
    text: 'Removal of building dust and debris, helping prepare renovated and newly built properties for use.'
  }
]

const reasons = [
  {
    icon: 'fa-solid fa-shield-heart',
    title: 'Safe Homes',
    text: 'Built with certified materials and rigorous site safety.'
  },
  {
    icon: 'fa-solid fa-hands-holding-circle',
    title: 'Skilled People',
    text: 'We invest in training the people who build your home.'
  },
  {
    icon: 'fa-solid fa-sun',
    title: 'Brighter Futures',
    text: 'Housing that uplifts families and strengthens communities.'
  }
]

const steps = [
  { n: '01', title: 'Consultation', text: 'We listen to your needs, budget and vision.' },
  { n: '02', title: 'Design & Quote', text: 'Clear plans and transparent pricing, no surprises.' },
  {
    n: '03',
    title: 'Build',
    text: 'Our skilled crews bring the plan to life with regular updates.'
  },
  { n: '04', title: 'Handover', text: 'Final inspection, walkthrough and a home ready to live in.' }
]

const filters = ['All', 'Residential', 'Renovation', 'Cleaning', 'Community']
const activeFilter = ref('All')
const projects = [
  { title: 'Family Bungalow', cat: 'Residential', img: images.project1 },
  { title: 'Modern Duplex', cat: 'Residential', img: images.project2 },
  { title: 'Kitchen Makeover', cat: 'Renovation', img: images.project3 },
  { title: 'Community Housing', cat: 'Community', img: images.project4 },
  { title: 'Home Extension', cat: 'Renovation', img: images.project5 },
  { title: 'Terrace Estate', cat: 'Residential', img: images.project6 },
  {
    title: 'Residential Deep Clean',
    cat: 'Cleaning',
    img: images.cleaning
  }
]
const visibleProjects = () =>
  activeFilter.value === 'All' ? projects : projects.filter((p) => p.cat === activeFilter.value)

const skills = [
  'Masonry & Bricklaying',
  'Carpentry & Joinery',
  'Electrical Installation',
  'Plumbing & Pipefitting',
  'Painting & Finishing',
  'Site Safety & Health'
]

const testimonials = [
  {
    name: 'Client Name',
    role: 'Homeowner',
    text: 'Paratus delivered our home on time and the finish is outstanding. The team was professional throughout.'
  },
  {
    name: 'Client Name',
    role: 'Property Developer',
    text: 'Skilled crews, clear communication and real attention to safety. We will definitely work with them again.'
  },
  {
    name: 'Client Name',
    role: 'Homeowner',
    text: 'Our renovation completely transformed the house. It feels brighter, safer and brand new.'
  }
]

const faqs = [
  {
    q: 'How do I get a quote?',
    a: 'Send us a message using the form below or call us. We will arrange a consultation and provide a detailed quote.'
  },
  {
    q: 'Do you offer training programmes?',
    a: 'Yes. Our Skills Academy trains and certifies people in building trades and connects them with real projects.'
  },
  {
    q: 'How long does a typical build take?',
    a: 'It depends on size and complexity. We agree a clear timeline during the design stage and keep you updated.'
  },
  {
    q: 'What cleaning services do you offer?',
    a: 'We offer domestic, commercial, end-of-tenancy and post-construction cleaning, depending on your requirements and service availability.'
  },
  {
    q: 'Can I request a cleaning quote?',
    a: 'Yes. Contact us with your property type, location, cleaning requirements and preferred date so we can discuss your needs and provide a quote.'
  }
]
const openFaq = ref(0)

const form = ref({ name: '', email: '', phone: '', message: '', service: '' })
const sent = ref(false)
const submit = () => {
  // TODO: hook up to your backend / email service
  sent.value = true
  setTimeout(() => (sent.value = false), 4000)
  form.value = { name: '', email: '', phone: '', message: '' }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  statsObserver = new IntersectionObserver(
    (entries) => entries[0].isIntersecting && runCounters(),
    { threshold: 0.4 }
  )
  if (statsEl.value) statsObserver.observe(statsEl.value)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  statsObserver && statsObserver.disconnect()
})
</script>

<template>
  <div class="font-sans text-slate-700 bg-white overflow-x-hidden scroll-smooth">
    <!-- NAVBAR -->
    <header
      class="fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-white/90 backdrop-blur shadow-lg py-2"
    >
      <div class="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <a href="#home" class="flex items-center gap-2">
          <img :src="images.logo" alt="Paratus Dwellings" class="h-12 w-auto" @error="hideBroken" />
        </a>
        <nav class="hidden lg:flex items-center gap-8">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            class="relative text-sm font-semibold text-[#0A2A5C] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#A8E80F] after:transition-all hover:after:w-full"
            >{{ l.label }}</a
          >
          <a
            href="#contact"
            class="px-5 py-2.5 rounded-full bg-[#A8E80F] text-[#0A2A5C] font-bold text-sm hover:bg-[#0A2A5C] hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-md"
          >
            Get a Quote
          </a>
        </nav>
        <button
          class="lg:hidden text-2xl text-[#0A2A5C]"
          @click="menuOpen = !menuOpen"
          aria-label="Menu"
        >
          <i :class="menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
        </button>
      </div>
      <transition name="drop">
        <div
          v-if="menuOpen"
          class="lg:hidden bg-white shadow-xl mt-2 mx-4 rounded-2xl p-5 space-y-3"
        >
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            @click="menuOpen = false"
            class="block font-semibold text-[#0A2A5C] py-1"
            >{{ l.label }}</a
          >
          <a
            href="#contact"
            @click="menuOpen = false"
            class="block text-center px-5 py-3 rounded-full bg-[#A8E80F] text-[#0A2A5C] font-bold"
            >Get a Quote</a
          >
        </div>
      </transition>
    </header>

    <!-- HERO -->
    <section
      id="home"
      class="relative min-h-screen flex items-center bg-gradient-to-br from-[#061a3a] via-[#0A2A5C] to-[#12418a] overflow-hidden"
    >
      <img
        :src="images.hero"
        alt=""
        class="absolute inset-0 w-full h-full object-cover opacity-25"
        @error="hideBroken"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#061a3a]/90 to-transparent"></div>
      <!-- floating blobs -->
      <div
        class="blob absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#A8E80F]/20 blur-3xl"
      ></div>
      <div
        class="blob-slow absolute bottom-0 left-10 w-72 h-72 rounded-full bg-[#A8E80F]/10 blur-3xl"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-5 pt-32 pb-24 grid lg:grid-cols-2 gap-14 items-center"
      >
        <div>
          <span
            data-aos="fade-down"
            class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#A8E80F] text-xs font-bold tracking-widest uppercase"
          >
            <i class="fa-solid fa-house"></i> Safe Homes · Skilled People · Brighter Futures
          </span>
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            class="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Building Safe Homes.<br />
            <span class="text-[#A8E80F]">Empowering Skilled People.</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" class="mt-6 text-lg text-slate-200 max-w-xl">
            Paratus Dwellings delivers quality, secure homes while training the skilled workforce
            behind them, creating brighter futures for families and communities.
          </p>
          <div data-aos="fade-up" data-aos-delay="300" class="mt-9 flex flex-wrap gap-4">
            <a
              href="#contact"
              class="group px-8 py-4 rounded-full bg-[#A8E80F] text-[#0A2A5C] font-bold shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              Start Your Project
              <i
                class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform inline-block"
              ></i>
            </a>
            <a
              href="#projects"
              class="px-8 py-4 rounded-full border-2 border-white/40 text-white font-bold hover:bg-white hover:text-[#0A2A5C] transition-all"
            >
              <i class="fa-solid fa-play mr-2"></i> View Our Work
            </a>
          </div>
        </div>

        <!-- hero visual -->
        <div data-aos="zoom-in" data-aos-delay="200" class="relative hidden lg:flex justify-center">
          <div class="relative w-[420px] h-[420px] float">
            <div class="absolute inset-0 rounded-[3rem] rotate-6 bg-[#A8E80F]/30"></div>
            <div
              class="absolute inset-0 rounded-[3rem] -rotate-3 bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center"
            ></div>
            <div
              class="absolute -left-8 top-10 bg-white rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-3 float-delay"
            >
              <span
                class="w-10 h-10 rounded-full bg-[#A8E80F]/30 text-[#0A2A5C] flex items-center justify-center"
                ><i class="fa-solid fa-shield-halved"></i
              ></span>
              <div>
                <p class="text-xs text-slate-500">Built with</p>
                <p class="font-bold text-[#0A2A5C]">Safety First</p>
              </div>
            </div>
            <div
              class="absolute -right-6 bottom-12 bg-white rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-3 float"
            >
              <span
                class="w-10 h-10 rounded-full bg-[#0A2A5C]/10 text-[#0A2A5C] flex items-center justify-center"
                ><i class="fa-solid fa-graduation-cap"></i
              ></span>
              <div>
                <p class="text-xs text-slate-500">Trained by</p>
                <p class="font-bold text-[#0A2A5C]">Skilled Experts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-2xl bounce-y"
        ><i class="fa-solid fa-chevron-down"></i
      ></a>
    </section>

    <!-- STATS -->
    <section ref="statsEl" class="relative -mt-14 z-10 px-5">
      <div
        class="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100"
      >
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          class="p-8 text-center"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <p class="text-4xl lg:text-5xl font-extrabold text-[#0A2A5C]">
            {{ counts[i] }}<span class="text-[#8fcf0a]">{{ s.suffix }}</span>
          </p>
          <p class="mt-2 text-sm font-semibold text-slate-500 uppercase tracking-wide">
            {{ s.label }}
          </p>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="py-24 px-5">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right" class="relative">
          <div
            class="absolute -top-6 -left-6 w-full h-full rounded-3xl border-4 border-[#A8E80F]"
          ></div>
          <div
            class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A2A5C] to-[#12418a] aspect-[4/3] shadow-2xl"
          >
            <img
              :src="images.about"
              alt="About Paratus Dwellings"
              class="w-full h-full object-cover"
              @error="hideBroken"
            />
          </div>
          <div
            class="absolute -bottom-8 -right-4 bg-[#A8E80F] text-[#0A2A5C] rounded-2xl px-7 py-5 shadow-xl float"
          >
            <p class="text-3xl font-extrabold">15+</p>
            <p class="text-sm font-bold">Years of Excellence</p>
          </div>
        </div>
        <div data-aos="fade-left">
          <p class="text-sm font-bold tracking-widest uppercase text-[#8fcf0a]">About Us</p>
          <h2 class="mt-3 text-3xl lg:text-4xl font-extrabold text-[#0A2A5C] leading-tight">
            More than builders. We build homes, skills and futures.
          </h2>
          <p class="mt-5 text-slate-600 leading-relaxed">
            Paratus Dwellings is built on a simple belief: everyone deserves a safe home, and the
            people who build it deserve skills and opportunity. We combine quality construction with
            practical skills development to strengthen families and communities.
          </p>
          <div class="mt-8 space-y-5">
            <div
              v-for="(r, i) in reasons"
              :key="r.title"
              class="flex gap-4"
              data-aos="fade-up"
              :data-aos-delay="i * 120"
            >
              <span
                class="shrink-0 w-12 h-12 rounded-xl bg-[#0A2A5C] text-[#A8E80F] flex items-center justify-center text-lg"
                ><i :class="r.icon"></i
              ></span>
              <div>
                <h3 class="font-bold text-[#0A2A5C]">{{ r.title }}</h3>
                <p class="text-sm text-slate-600">{{ r.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="py-24 px-5 bg-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <p class="text-sm font-bold tracking-widest uppercase text-[#8fcf0a]">What We Do</p>
          <h2 class="mt-3 text-3xl lg:text-4xl font-extrabold text-[#0A2A5C]">
            Services designed around your home
          </h2>
          <p class="mt-4 text-slate-600">
            From the first sketch to the final handover, we cover every step with care.
          </p>
        </div>
        <div class="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <div
            v-for="(s, i) in services"
            :key="s.title"
            data-aos="fade-up"
            :data-aos-delay="(i % 3) * 120"
            class="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            <div
              class="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#A8E80F]/20 group-hover:scale-[3] transition-transform duration-700"
            ></div>
            <span
              class="relative w-14 h-14 rounded-2xl bg-[#0A2A5C] text-[#A8E80F] flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform"
            >
              <i :class="s.icon"></i>
            </span>
            <h3 class="relative mt-6 text-xl font-bold text-[#0A2A5C]">{{ s.title }}</h3>
            <p class="relative mt-3 text-slate-600 text-sm leading-relaxed">{{ s.text }}</p>
            <a
              href="#contact"
              class="relative mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0A2A5C] group-hover:gap-3 transition-all"
            >
              Learn more <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- PROCESS -->
    <section class="py-24 px-5 bg-[#0A2A5C] relative overflow-hidden">
      <div
        class="blob absolute -left-24 top-10 w-80 h-80 rounded-full bg-[#A8E80F]/10 blur-3xl"
      ></div>
      <div class="max-w-7xl mx-auto relative">
        <div class="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <p class="text-sm font-bold tracking-widest uppercase text-[#A8E80F]">How It Works</p>
          <h2 class="mt-3 text-3xl lg:text-4xl font-extrabold text-white">
            A simple, transparent process
          </h2>
        </div>
        <div class="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(s, i) in steps"
            :key="s.n"
            data-aos="zoom-in"
            :data-aos-delay="i * 150"
            class="relative bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500"
          >
            <p class="text-5xl font-extrabold text-[#A8E80F]/80">{{ s.n }}</p>
            <h3 class="mt-4 text-xl font-bold text-white">{{ s.title }}</h3>
            <p class="mt-2 text-sm text-slate-300">{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects" class="py-24 px-5">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <p class="text-sm font-bold tracking-widest uppercase text-[#8fcf0a]">Our Projects</p>
          <h2 class="mt-3 text-3xl lg:text-4xl font-extrabold text-[#0A2A5C]">
            Homes we are proud of
          </h2>
        </div>
        <div
          class="mt-8 flex flex-wrap justify-center gap-3"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <button
            v-for="f in filters"
            :key="f"
            @click="activeFilter = f"
            class="px-5 py-2 rounded-full text-sm font-bold transition-all"
            :class="
              activeFilter === f
                ? 'bg-[#0A2A5C] text-white shadow-lg'
                : 'bg-slate-100 text-[#0A2A5C] hover:bg-[#A8E80F]'
            "
          >
            {{ f }}
          </button>
        </div>
        <transition-group
          name="grid"
          tag="div"
          class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="p in visibleProjects()"
            :key="p.title"
            class="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#0A2A5C] to-[#12418a] shadow-lg"
          >
            <img
              :src="p.img"
              :alt="p.title"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              @error="hideBroken"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#061a3a]/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition"
            ></div>
            <div
              class="absolute bottom-0 inset-x-0 p-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-500"
            >
              <span class="text-xs font-bold uppercase tracking-widest text-[#A8E80F]">{{
                p.cat
              }}</span>
              <h3 class="mt-1 text-xl font-bold text-white">{{ p.title }}</h3>
            </div>
            <span
              class="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500"
            >
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </span>
          </div>
        </transition-group>
      </div>
    </section>

    <!-- SKILLS ACADEMY -->
    <section id="skills" class="py-24 px-5 bg-slate-50">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right">
          <p class="text-sm font-bold tracking-widest uppercase text-[#8fcf0a]">Skills Academy</p>
          <h2 class="mt-3 text-3xl lg:text-4xl font-extrabold text-[#0A2A5C] leading-tight">
            Training the hands that build tomorrow
          </h2>
          <p class="mt-5 text-slate-600 leading-relaxed">
            Our skills programmes give people hands-on training in construction trades, safety and
            professional practice, opening doors to stable work and better livelihoods.
          </p>
          <ul class="mt-8 grid sm:grid-cols-2 gap-4">
            <li
              v-for="(s, i) in skills"
              :key="s"
              data-aos="fade-up"
              :data-aos-delay="i * 80"
              class="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <span
                class="w-8 h-8 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center text-sm"
                ><i class="fa-solid fa-check"></i
              ></span>
              <span class="font-semibold text-[#0A2A5C] text-sm">{{ s }}</span>
            </li>
          </ul>
          <a
            href="#contact"
            class="mt-9 inline-block px-8 py-4 rounded-full bg-[#0A2A5C] text-white font-bold hover:bg-[#A8E80F] hover:text-[#0A2A5C] transition-all hover:-translate-y-1 shadow-lg"
          >
            Enrol or Partner With Us
          </a>
        </div>
        <div data-aos="fade-left" class="relative">
          <div
            class="rounded-3xl overflow-hidden aspect-square bg-gradient-to-br from-[#A8E80F] to-[#7bc20a] shadow-2xl flex items-center justify-center"
          >
            <img
              :src="images.training"
              alt="Skills training"
              class="w-full h-full object-cover"
              @error="hideBroken"
            />
            <i class="fa-solid fa-helmet-safety absolute text-[8rem] text-[#0A2A5C]/20"></i>
          </div>
          <div class="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl px-6 py-4 float">
            <p class="text-2xl font-extrabold text-[#0A2A5C]">120+</p>
            <p class="text-xs font-semibold text-slate-500">Artisans trained</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="py-24 px-5">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <p class="text-sm font-bold tracking-widest uppercase text-[#8fcf0a]">Testimonials</p>
          <h2 class="mt-3 text-3xl lg:text-4xl font-extrabold text-[#0A2A5C]">
            What our clients say
          </h2>
        </div>
        <div class="mt-14 grid md:grid-cols-3 gap-7">
          <div
            v-for="(t, i) in testimonials"
            :key="i"
            data-aos="flip-up"
            :data-aos-delay="i * 150"
            class="relative bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
          >
            <i class="fa-solid fa-quote-left text-4xl text-[#A8E80F]"></i>
            <p class="mt-4 text-slate-600 leading-relaxed">{{ t.text }}</p>
            <div class="mt-6 flex items-center gap-1 text-[#8fcf0a]">
              <i v-for="n in 5" :key="n" class="fa-solid fa-star text-sm"></i>
            </div>
            <div class="mt-5 flex items-center gap-3">
              <span
                class="w-12 h-12 rounded-full bg-[#0A2A5C] text-[#A8E80F] flex items-center justify-center font-bold"
                >{{ t.name[0] }}</span
              >
              <div>
                <p class="font-bold text-[#0A2A5C]">{{ t.name }}</p>
                <p class="text-xs text-slate-500">{{ t.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 px-5 bg-slate-50">
      <div class="max-w-3xl mx-auto">
        <div class="text-center" data-aos="fade-up">
          <p class="text-sm font-bold tracking-widest uppercase text-[#8fcf0a]">FAQ</p>
          <h2 class="mt-3 text-3xl lg:text-4xl font-extrabold text-[#0A2A5C]">Common questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div
            v-for="(f, i) in faqs"
            :key="f.q"
            data-aos="fade-up"
            :data-aos-delay="i * 100"
            class="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <button
              class="w-full flex items-center justify-between text-left px-6 py-5 font-bold text-[#0A2A5C]"
              @click="openFaq = openFaq === i ? -1 : i"
            >
              {{ f.q }}
              <i
                class="fa-solid fa-chevron-down transition-transform duration-300"
                :class="openFaq === i ? 'rotate-180 text-[#8fcf0a]' : ''"
              ></i>
            </button>
            <div
              class="grid transition-all duration-500"
              :class="openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden">
                <p class="px-6 pb-5 text-slate-600 text-sm">{{ f.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA + CONTACT -->
    <section
      id="contact"
      class="relative py-24 px-5 bg-gradient-to-br from-[#061a3a] via-[#0A2A5C] to-[#12418a] overflow-hidden"
    >
      <div
        class="blob-slow absolute -right-20 top-10 w-96 h-96 rounded-full bg-[#A8E80F]/15 blur-3xl"
      ></div>
      <div class="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div data-aos="fade-right">
          <p class="text-sm font-bold tracking-widest uppercase text-[#A8E80F]">Contact Us</p>
          <h2 class="mt-3 text-3xl lg:text-5xl font-extrabold text-white leading-tight">
            Ready to build a safer, brighter future?
          </h2>
          <p class="mt-5 text-slate-300 max-w-lg">
            Tell us about your project and our team will get back to you shortly.
          </p>
          <ul class="mt-9 space-y-5 text-white">
            <li class="flex items-center gap-4">
              <span
                class="w-12 h-12 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center"
                ><i class="fa-solid fa-phone"></i
              ></span>
              +000 000 000 0000
            </li>
            <li class="flex items-center gap-4">
              <span
                class="w-12 h-12 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center"
                ><i class="fa-solid fa-envelope"></i
              ></span>
              info@paratusdwellings.com
            </li>
            <li class="flex items-center gap-4">
              <span
                class="w-12 h-12 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center"
                ><i class="fa-solid fa-location-dot"></i
              ></span>
              Your office address here
            </li>
          </ul>
        </div>

        <form
          data-aos="fade-left"
          @submit.prevent="submit"
          class="bg-white rounded-3xl p-8 shadow-2xl space-y-5"
        >
          <div class="grid sm:grid-cols-2 gap-5">
            <input
              v-model="form.name"
              required
              type="text"
              placeholder="Full name"
              class="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A8E80F]"
            />
            <input
              v-model="form.phone"
              type="tel"
              placeholder="Phone"
              class="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A8E80F]"
            />
          </div>
          <input
            v-model="form.email"
            required
            type="email"
            placeholder="Email address"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A8E80F]"
          />
          <textarea
            v-model="form.message"
            required
            rows="5"
            placeholder="Tell us about your project"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A8E80F]"
          ></textarea>
          <button
            type="submit"
            class="w-full py-4 rounded-xl bg-[#0A2A5C] text-white font-bold hover:bg-[#A8E80F] hover:text-[#0A2A5C] transition-all hover:-translate-y-0.5 shadow-lg"
          >
            Send Message <i class="fa-solid fa-paper-plane ml-2"></i>
          </button>
          <transition name="drop">
            <p v-if="sent" class="text-center text-sm font-semibold text-green-600">
              <i class="fa-solid fa-circle-check mr-1"></i> Thank you, we will be in touch soon.
            </p>
          </transition>
        </form>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-[#061a3a] text-slate-300 pt-16 pb-8 px-5">
      <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div class="md:col-span-2">
          <div class="flex items-center gap-3">
            <img
              :src="images.logo"
              alt="Paratus Dwellings"
              class="h-14 bg-white rounded-xl p-1"
              @error="hideBroken"
            />
          </div>
          <p class="mt-4 text-sm max-w-sm">Safe Homes | Skilled People | Brighter Futures</p>
          <div class="mt-5 flex gap-3">
            <a
              v-for="i in ['fa-facebook-f', 'fa-instagram', 'fa-x-twitter', 'fa-linkedin-in']"
              :key="i"
              href="#"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#A8E80F] hover:text-[#0A2A5C] hover:-translate-y-1 transition-all"
            >
              <i :class="'fa-brands ' + i"></i>
            </a>
          </div>
        </div>
        <div>
          <h4 class="font-bold text-white mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li v-for="l in links" :key="l.href">
              <a :href="l.href" class="hover:text-[#A8E80F] transition">{{ l.label }}</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-white mb-4">Services</h4>
          <ul class="space-y-2 text-sm">
            <li v-for="s in services.slice(0, 4)" :key="s.title">{{ s.title }}</li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-xs">
        &copy; {{ new Date().getFullYear() }} Paratus Dwellings. All rights reserved.
      </div>
    </footer>

    <!-- back to top -->
    <transition name="drop">
      <a
        v-if="scrolled"
        href="#home"
        class="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#A8E80F] text-[#0A2A5C] flex items-center justify-center shadow-xl hover:-translate-y-1 transition"
      >
        <i class="fa-solid fa-arrow-up"></i>
      </a>
    </transition>
  </div>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-16px);
  }
}
@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, -30px) scale(1.15);
  }
}
@keyframes bounceY {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, 10px);
  }
}

.float {
  animation: float 5s ease-in-out infinite;
}
.float-delay {
  animation: float 6s ease-in-out 1s infinite;
}
.blob {
  animation: blob 9s ease-in-out infinite;
}
.blob-slow {
  animation: blob 14s ease-in-out infinite reverse;
}
.bounce-y {
  animation: bounceY 1.8s ease-in-out infinite;
}

.drop-enter-active,
.drop-leave-active {
  transition: all 0.3s ease;
}
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.grid-enter-active,
.grid-leave-active {
  transition: all 0.5s ease;
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.grid-leave-active {
  position: absolute;
}

@media (prefers-reduced-motion: reduce) {
  .float,
  .float-delay,
  .blob,
  .blob-slow,
  .bounce-y {
    animation: none;
  }
}
</style>
