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
@import '../../assets/mixins.scss';

.project-item {
  @include card-item;

  &__image {
    width: 120px;
    height: 100%;
    border-radius: 12px;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    color: var(--light-biege);
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
