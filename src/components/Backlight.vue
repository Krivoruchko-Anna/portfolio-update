<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const backlight = ref<HTMLElement | null>(null)

const handleMouseMove = ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!backlight.value) return

  gsap.to(backlight.value, {
    x: x - backlight.value.offsetWidth / 2,
    y: y - backlight.value.offsetHeight / 2,
    duration: 0.1,
    ease: 'power1.out',
  })
}

const handleMouseLeave = () => {
  if (!backlight.value) return

  gsap.to(backlight.value, {
    width: 500,
    height: 500,
    opacity: 0.2,
    duration: 0.2,
    ease: 'power2.out',
  })
}

onMounted(() => {
  if (backlight.value) {
    gsap.set(backlight.value, {
      width: 500,
      height: 500,
      opacity: 0.2,
      boxShadow: '0 0 100px rgba(121, 88, 73, 0.5)',
    })
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<template>
  <div ref="backlight" class="backlight"></div>
</template>

<style scoped lang="scss">
.backlight {
  position: fixed;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(155, 141, 134, 0.4), var(--main-brown));
  pointer-events: none;
  transition:
    width 0.2s,
    height 0.2s,
    opacity 0.2s;
  will-change: transform, opacity, width, height;
  transform: translate(-50%, 0%);
  opacity: 0;

  @media (max-width: 1024px) {
    display: none;
  }
}
</style>
