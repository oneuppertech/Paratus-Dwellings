
<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

withDefaults(
  defineProps<{
    variant?: 'hero' | 'footer'
  }>(),
  {
    variant: 'hero'
  }
)

const asset = (name: string) =>
  new URL(`../assets/${name}`, import.meta.url).href

const credentials = [
  {
    name: 'Admiral × Tide',
    description: 'Admiral and Tide partnership',
    image: asset('admiral-tide.jpeg'),
    imageClass: 'w-[280px] sm:w-[340px] lg:w-[390px]'
  },
  {
    name: 'ICO Registered',
    description: 'Information Commissioner’s Office registration',
    image: asset('ico.png'),
    imageClass: 'w-[240px] sm:w-[270px] lg:w-[310px]'
  },
  {
    name: 'Health & Safety',
    description: 'Committed to Health and Safety',
    image: asset('hse.jpeg'),
    imageClass: 'w-[300px] sm:w-[360px] lg:w-[410px]'
  },
  {
    name: 'DBS Checked',
    description: 'Trusted and reliable support professionals',
    image: asset('dbs.jpg'),
    imageClass: 'w-[340px] sm:w-[400px] lg:w-[460px]'
  }
]

const paused = ref(false)
const failedImages = ref<string[]>([])

const visibleCredentials = computed(() =>
  credentials.filter(item => !failedImages.value.includes(item.name))
)

const markBroken = (name: string) => {
  if (!failedImages.value.includes(name)) {
    failedImages.value.push(name)
  }
}

const prefersReducedMotion = ref(false)
let motionQuery: MediaQueryList | undefined

const updateMotionPreference = (event: MediaQueryListEvent | MediaQueryList) => {
  prefersReducedMotion.value = event.matches
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateMotionPreference(motionQuery)
  motionQuery.addEventListener('change', updateMotionPreference)
})

onBeforeUnmount(() => {
  motionQuery?.removeEventListener('change', updateMotionPreference)
})
</script>

<template>
  <section
    v-if="visibleCredentials.length"
    class="trust-credentials relative w-full overflow-hidden"
    :class="variant === 'hero' ? 'trust-hero' : 'trust-footer'"
    aria-label="Our registrations, partnerships and professional commitments"
  >
    <div v-if="variant === 'footer'" class="text-center mb-6">
      <span
        class="text-xs font-bold uppercase tracking-[0.25em] text-[#15803d]"
      >
        Our Commitment
      </span>

      <h3 class="mt-2 text-xl sm:text-2xl font-extrabold text-[#0A2A5C]">
        Trusted, Registered & Committed to Safety
      </h3>

      <p class="mt-2 text-sm text-slate-500">
        Building confidence through accountability, safety and trusted partnerships.
      </p>
    </div>

    <div
      class="trust-window"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
      @focusin="paused = true"
      @focusout="paused = false"
    >
      <div
        class="trust-track"
        :class="{ 'is-paused': paused || prefersReducedMotion }"
      >
        <!-- First set -->
        <div class="trust-group">
          <div
            v-for="item in visibleCredentials"
            :key="item.name"
            class="trust-item"
          >
            <img
              :src="item.image"
              :alt="item.description"
              :class="item.imageClass"
              loading="eager"
              @error="markBroken(item.name)"
            />
          </div>
        </div>

        <!-- Duplicate set for seamless scrolling -->
        <div class="trust-group" aria-hidden="true">
          <div
            v-for="item in visibleCredentials"
            :key="`duplicate-${item.name}`"
            class="trust-item"
          >
            <img
              :src="item.image"
              alt=""
              :class="item.imageClass"
              loading="eager"
              @error="markBroken(item.name)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-credentials {
  isolation: isolate;
}

.trust-hero {
  max-width: 1280px;
  margin-inline: auto;
}

.trust-footer {
  max-width: 1280px;
  margin: 0 auto 4rem;
  padding: 0 1.25rem;
}

.trust-window {
  width: 100%;
  overflow: hidden;
  position: relative;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 4%,
    black 96%,
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    black 4%,
    black 96%,
    transparent
  );
}

.trust-track {
  display: flex;
  width: max-content;
  animation: trust-scroll 35s linear infinite;
  will-change: transform;
}

.trust-track.is-paused {
  animation-play-state: paused;
}

.trust-group {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 1.5rem;
  padding-right: 1.5rem;
}

.trust-item {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  min-height: 110px;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 8px 25px rgba(10, 42, 92, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.trust-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(10, 42, 92, 0.15);
}

.trust-item img {
  display: block;
  height: 85px;
  max-width: none;
  object-fit: contain;
}

.trust-footer .trust-item {
  min-height: 120px;
  background: #fff;
  border-color: #e2e8f0;
}

.trust-footer .trust-item img {
  height: 95px;
}

@keyframes trust-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 640px) {
  .trust-group {
    gap: 0.75rem;
    padding-right: 0.75rem;
  }

  .trust-item {
    min-height: 85px;
    padding: 0.4rem 0.65rem;
    border-radius: 12px;
  }

  .trust-item img {
    height: 65px;
  }

  .trust-footer .trust-item img {
    height: 70px;
  }

  .trust-footer {
    margin-bottom: 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .trust-track {
    animation: none;
  }

  .trust-window {
    overflow-x: auto;
    -webkit-mask-image: none;
    mask-image: none;
  }

  .trust-item:hover {
    transform: none;
  }
}
</style>
