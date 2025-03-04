<script setup lang="ts">
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import IconLinkedin from '@/components/icons/IconLinkedin.vue'
import IconGithub from '@/components/icons/IconGithub.vue'
import IconBehance from '@/components/icons/IconBehance.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import Lines from '@/components/header/Lines.vue'

const IconLinkedinRaw = markRaw(IconLinkedin)
const IconGithubRaw = markRaw(IconGithub)
const IconBehanceRaw = markRaw(IconBehance)
const IconInstagramRaw = markRaw(IconInstagram)

const activeSection = ref('about')

const navLinks = ref([
  { title: 'About', to: '#about', id: 'about' },
  { title: 'Experience', to: '#experience', id: 'experience' },
  { title: 'Projects', to: '#projects', id: 'projects' },
])

const socials = ref([
  { link: 'https://www.linkedin.com/in/hanna-kryvaruchka-fog', icon: IconLinkedinRaw },
  { link: 'https://github.com/Krivoruchko-Anna?tab=repositories', icon: IconGithubRaw },
  { link: 'https://www.behance.net/anna49fogbb16', icon: IconBehanceRaw },
  {
    link: 'https://www.instagram.com/anna49foggy/profilecard/?igsh=d3VkbXgxc2Fydzcy',
    icon: IconInstagramRaw,
  },
])

const sections = ['about', 'experience', 'projects']

const observer = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries.find((entry) => entry.isIntersecting)
    if (visibleSection && !isScrollListenerDisabled.value) {
      activeSection.value = visibleSection.target.id
    }
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50% 0px',
  },
)

const updateActiveSection = (link: string) => {
  activeSection.value = link
}

const isScrollListenerDisabled = ref(false)

const disableListener = () => {
  isScrollListenerDisabled.value = true
  setTimeout(() => {
    isScrollListenerDisabled.value = false
  }, 500)
}

onMounted(() => {
  sections.forEach((section) => {
    const element = document.getElementById(section)
    if (element) observer.observe(element)
  })
})

onUnmounted(() => {
  sections.forEach((section) => {
    const element = document.getElementById(section)
    if (element) observer.unobserve(element)
  })
})
</script>

<template>
  <div class="header">
    <Lines />

    <div class="header__info">
      <h1 class="header__name">Anna Krivoruchko</h1>
      <h2 class="header__title">Front End Developer</h2>
      <p class="header__description">
        I build responsive, pixel-perfect web applications that deliver seamless digital
        experiences.
      </p>
    </div>

    <nav class="header__navigation">
      <ul class="header__nav-list">
        <li
          class="header__nav-item"
          :class="{ active: activeSection === link.id }"
          v-for="link in navLinks"
          :key="link.id"
          @click="updateActiveSection(link.id)"
        >
          <router-link @click.prevent="disableListener" :to="link.to">
            {{ link.title }}
          </router-link>
        </li>
      </ul>
    </nav>

    <ul class="header__links">
      <li v-for="(link, index) in socials" :key="index" class="header__link">
        <a :href="link.link" target="_blank">
          <component class="header__icon" :is="link.icon"></component>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.header {
  position: sticky;
  top: 0;
  padding: 60px 20px 60px 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100vh;
  height: 100vh;

  &__name {
    font-size: 34px;
    font-weight: 700;
    color: var(--light-biege);
  }

  &__title {
    font-size: 22px;
    font-weight: 500;
    color: var(--light-blue);
  }

  &__description {
    max-width: 360px;
    margin-top: 10px;
    font-size: 16px;
  }

  &__links {
    margin-top: 12px;
    display: flex;
    gap: 20px;
  }

  &__icon {
    width: 24px;

    path {
      transition: 0.3s all;
    }

    &:hover {
      path {
        fill: var(--yellow);
      }
    }
  }

  &__navigation {
    margin-top: 12px;
  }

  &__nav-item {
    text-transform: uppercase;
    width: fit-content;
    margin-top: 14px;
    transition: 0.5s all;

    a {
      display: flex;
      align-items: center;
      gap: 16px;

      &:before {
        content: '';
        display: block;
        width: 40px;
        height: 1px;
        background-color: var(--biege);
        transition: 0.3s all;
      }
    }

    &:hover {
      letter-spacing: 9px;

      a {
        &:before {
          width: 50px;
        }
      }
    }
  }
}

.active {
  a {
    font-weight: 600;
    color: var(--light-blue);
    letter-spacing: 9px;

    &:before {
      width: 90px;
      height: 2px;
      background-color: var(--light-blue);
    }

    &:hover {
      &:before {
        width: 90px;
      }
    }
  }
}

@media (max-width: 1024px) {
  .header {
    height: 250px;
    padding: 10px 10px 20px 50px;

    &__navigation {
      display: none;
    }

    &__description {
      max-width: 100%;
    }

    &__icon {
      &:hover {
        path {
          fill: var(--biege);
        }
      }
    }
  }
}

@media (max-width: 378px) {
  .header {
    height: 320px;
  }
}
</style>
