<script setup lang="ts">
import { ref, onMounted, onUnmounted, markRaw, onBeforeMount } from 'vue'
import { gsap } from 'gsap';
import IconLinkedin from "@/components/icons/IconLinkedin.vue";
import IconGithub from "@/components/icons/IconGithub.vue";
import IconBehance from "@/components/icons/IconBehance.vue";
import IconInstagram from "@/components/icons/IconInstagram.vue";

const IconLinkedinRaw = markRaw(IconLinkedin);
const IconGithubRaw = markRaw(IconGithub);
const IconBehanceRaw = markRaw(IconBehance);
const IconInstagramRaw = markRaw(IconInstagram);

const activeSection = ref('about')

const line1 = ref<SVGPathElement | null>(null);
const line2 = ref<SVGPathElement | null>(null);
const line3 = ref<SVGPathElement | null>(null);

const controlPoints = {
  line1: 40,
  line2: 60,
  line3: 80,
};

const initialLines = ref({
  line1: {
    initialColor: "#7FBED1", secondaryColor: "#577080", isInitial: true,
  },
  line2: {
    initialColor: "#D86937", secondaryColor: "#E9DBC9", isInitial: true,
  },
  line3: {
    initialColor: "#F0A728", secondaryColor: "#AF8260", isInitial: true,
  }
})

const onMouseMove = (event: MouseEvent, line: string) => {
  const svgBounds = (event.target as SVGElement).getBoundingClientRect();
  const mouseX = event.clientX - svgBounds.left;

  const maxOffset = 100;
  const centerX = controlPoints[line];
  const newControlPoint = Math.min(Math.max(centerX + (mouseX - centerX) * 0.9, centerX - maxOffset), centerX + maxOffset);

  if (line === 'line1' && line1.value) {
    initialLines.value.line1.isInitial = !initialLines.value.line1.isInitial
    const color = initialLines.value.line1.isInitial ? initialLines.value.line1.initialColor : initialLines.value.line1.secondaryColor

    gsap.to(line1.value, {
      duration: 0.2,
      attr: {
        d: `M 40,0 Q ${newControlPoint},500 40,1000`,
      },
      stroke: color,
      ease: "power1.out",
    });
  }

  if (line === 'line2' && line2.value) {
    initialLines.value.line2.isInitial = !initialLines.value.line2.isInitial
    const color = initialLines.value.line2.isInitial ? initialLines.value.line2.initialColor : initialLines.value.line2.secondaryColor

    gsap.to(line2.value, {
      duration: 0.2,
      attr: {
        d: `M 60,0 Q ${newControlPoint},500 60,1000`,
      },
      stroke: color,
      ease: "power1.out",
    });
  }

  if (line === 'line3' && line3.value) {
    initialLines.value.line3.isInitial = !initialLines.value.line3.isInitial
    const color = initialLines.value.line3.isInitial ? initialLines.value.line3.initialColor : initialLines.value.line3.secondaryColor

    gsap.to(line3.value, {
      duration: 0.2,
      attr: {
        d: `M 80,0 Q ${newControlPoint},500 80,1000`,
      },
      stroke: color,
      ease: "power1.out",
    });
  }
};

const onLeave = (line: string) => {
  const duration = 0.7;

  if (line === 'line1' && line1.value) {
    const color = initialLines.value.line1.isInitial ? initialLines.value.line1.secondaryColor : initialLines.value.line1.initialColor

    gsap.to(line1.value, {
      duration: duration,
      attr: {
        d: "M 40,0 Q 40,500 40,1000",
      },
      stroke: color,
      ease: "bounce.out",
    });
  }

  if (line === 'line2' && line2.value) {
    const color = initialLines.value.line2.isInitial ? initialLines.value.line2.secondaryColor : initialLines.value.line2.initialColor

    gsap.to(line2.value, {
      duration: duration,
      attr: {
        d: "M 60,0 Q 60,500 60,1000",
      },
      stroke: color,
      ease: "bounce.out",
    });
  }

  if (line === 'line3' && line3.value) {
    const color = initialLines.value.line3.isInitial ? initialLines.value.line3.secondaryColor : initialLines.value.line3.initialColor

    gsap.to(line3.value, {
      duration: duration,
      attr: {
        d: "M 80,0 Q 80,500 80,1000",
      },
      stroke: color,
      ease: "bounce.out",
    });
  }
};

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
  { link: 'https://www.instagram.com/anna49foggy/profilecard/?igsh=d3VkbXgxc2Fydzcy', icon: IconInstagramRaw },
])

const sections = ['about', 'experience', 'projects'];

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
    const element = document.getElementById(id);
    if (!element) return { id, offset: Infinity };
    return { id, offset: element.getBoundingClientRect().top };
  });

  const closestSection = offsets.reduce((prev, curr) =>
    Math.abs(curr.offset) < Math.abs(prev.offset) ? curr : prev
  );

  if (closestSection.id !== activeSection.value) {
    updateActiveSection(closestSection.id)
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="header">
    <div class="header__lines">
      <div class="container">
        <svg class="line-container" width="100" height="100%" viewBox="0 0 100 1000">
          <path
            ref="line1"
            class="line"
            d="M 40,0 Q 40,500 40,1000"
            fill="transparent"
            stroke="#7FBED1"
            stroke-width="2"
            @mouseleave="onLeave('line1')"
            @mousemove="onMouseMove($event, 'line1')"
          />
          <path
            ref="line2"
            class="line"
            d="M 60,0 Q 60,500 60,1000"
            fill="transparent"
            stroke="#D86937"
            stroke-width="2"
            @mouseleave="onLeave('line2')"
            @mousemove="onMouseMove($event, 'line2')"
          />
          <path
            ref="line3"
            class="line"
            d="M 80,0 Q 80,500 80,1000"
            fill="transparent"
            stroke="#F0A728"
            stroke-width="2"
            @mouseleave="onLeave('line3')"
            @mousemove="onMouseMove($event, 'line3')"
          />
        </svg>
      </div>

      <div class="mobile-lines">
        <div class="mobile-line line-1"></div>
        <div class="mobile-line line-2"></div>
        <div class="mobile-line line-3"></div>
      </div>
    </div>

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

  &__lines {
    position: absolute;
    left: -30px;
    height: calc(100% - 80px);
    cursor: pointer;

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% - 30px);
    }

    .line-container {
      width: 100px;
      height: 100%;
    }

    .line {
      transition: path 1s;
    }

    .mobile-lines {
      display: none;
      gap: 4px;

      .mobile-line {
        width: 2px;
        height: 232px;
      }

      .line-1 {
        background-color: var(--light-blue);
      }

      .line-2 {
        background-color: var(--orange);
      }

      .line-3 {
        background-color: var(--yellow);
      }
    }
  }

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

    &__lines {
      left: 15px;
      height: 100%;

      .container {
        display: none;
      }

      .mobile-lines {
        display: flex;
      }
    }
  }
}
</style>
