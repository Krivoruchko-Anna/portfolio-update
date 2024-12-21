<script setup lang="ts">
import About from '@/components/About.vue'
import Experience from '@/components/experience/Experience.vue'
import Projects from '@/components/projects/Projects.vue'
</script>

<template>
  <div class="main">
    <About></About>
    <Experience></Experience>
    <Projects></Projects>
  </div>
</template>

<style scoped lang="scss">
.main {
  padding-bottom: 60px;

  @media (max-width: 616px) {
    padding-bottom: 100px;
  }
}
</style>
