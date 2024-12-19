<script setup lang="ts">
import ExperienceItem from '@/components/experience/ExperienceItem.vue'
import { Experience } from '@/components/experience/experience.ts'
</script>

<template>
  <div id="experience" class="experience">
    <h2 class="experience__title">Experience</h2>
    <div class="experience__container">
      <ExperienceItem v-for="item in Experience" :item="item" :key="item.title"></ExperienceItem>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.experience {
  margin-top: 90px;
  padding-top: 20px;

  &__title {
    display: none;
    padding-left: 20px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}

@media (max-width: 1024px) {
  .experience {
    margin-top: 80px;

    &__title {
      display: block;
    }

    &__container {
      margin-top: 10px;
      gap: 10px;
    }
  }
}
</style>
