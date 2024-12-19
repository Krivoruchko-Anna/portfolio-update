<script setup lang="ts">
import type { ProjectItemType } from '@/components/projects/projects.ts'

defineProps<{
  project: ProjectItemType
}>()
</script>

<template>
  <a :href="project.link" target="_blank" class="project-item">
    <img :src="`/projects/${project.image}.jpg`" class="project-item__image" :alt="project.title" />

    <div class="project-item__info">
      <div class="project-item__title">{{ project.title }}</div>
      <div class="project-item__description">{{ project.description }}</div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.project-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  cursor: pointer;
  transition: 0.3s all;
  border-radius: 8px;
  border: 2px transparent solid;

  &:hover {
    background-color: #85654e;
    box-shadow: #AF8260 10px -10px 0px -2px, #F0A728 10px -10px, #D86937 20px -20px 0px -2px, #6C3428 20px -20px;
  }

  &__image {
    width: 120px;
    height: 100%;
    border-radius: 12px;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    color: #FFF8E8;
  }
}

@media (max-width: 1024px) {
  .project-item {
    padding: 12px;

    &:hover {
      background-color: transparent;
      box-shadow: none;
    }

    &__image {
      width: 100px;
    }
  }
}
</style>
