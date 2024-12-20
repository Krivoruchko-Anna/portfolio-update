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

const isScrollListenerDisabled = ref(false)

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

const updateActiveSection = (link: string) => {
  activeSection.value = link
}
const disableListener = () => {
  isScrollListenerDisabled.value = true

  setTimeout(() => {
    isScrollListenerDisabled.value = false
  }, 500)
}

const handleScroll = () => {
  if (isScrollListenerDisabled.value) return

  const offsets = sections.map((id) => {
    const element = document.getElementById(id)
    if (!element) return { id, offset: Infinity }
    return { id, offset: element.getBoundingClientRect().top }
  })

  const closestSection = offsets.reduce((prev, curr) =>
    Math.abs(curr.offset) < Math.abs(prev.offset) ? curr : prev,
  )

  if (closestSection.id !== activeSection.value) {
    updateActiveSection(closestSection.id)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
          <router-link @click="disableListener" :to="link.to">
            {{ link.title }}
          </router-link>
        </li>
      </ul>
    </nav>

    <ul class="header__links">
      <li v-for="link in socials" :key="link.icon" class="header__link">
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
</style>
