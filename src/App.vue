<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
// import { useRouter } from "vue-router";

import AppHeader from '@/components/AppHeader.vue'
import AppMain from '@/components/AppMain.vue'
import LavaLamp from "@/components/LavaLamp.vue";
import IconUp from "@/components/icons/IconUp.vue";
import Backlight from "@/components/Backlight.vue";
import Copyright from "@/components/Copyright.vue";

// const router = useRouter()

const showArrow = ref(false);

const handleScroll = () => {
  showArrow.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// onBeforeMount(() => {
//   router.push('')
// })

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Backlight />
  <LavaLamp />

  <IconUp
    class="up-arrow"
    :class="{ 'show': showArrow }"
    @click="scrollToTop"
  />

  <header>
    <AppHeader />
  </header>

  <main>
    <AppMain />
  </main>

  <Copyright />
</template>

<style lang="scss">
header, main {
  z-index: 1;
}

header {
  width: 44%;
}

main {
  width: 56%;
}

.up-arrow {
  position: fixed;
  right: 100px;
  bottom: 40px;
  width: 40px;
  height: 40px;
  opacity: 0;
  cursor: pointer;
  pointer-events: none;
  transition: 0.3s opacity;
  z-index: 2;

  path {
    transition: 0.3s all;
  }

  &:hover {
    g {
      path {
        fill: var(--biege);
      }
    }
  }

  @media (max-width: 1680px) {
    right: 40px;
    bottom: 30px;
  }
}

.show {
  opacity: 1;
  pointer-events: auto;
}

@media (max-width: 1024px) {
  header, main {
    width: 100%;
  }

  .up-arrow {
    &:hover {
      g {
        path {
          fill: var(--light-blue);
        }
      }
    }
  }
}
</style>
