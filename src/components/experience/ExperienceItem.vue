<script setup lang="ts">
import type { ExperienceItemType } from '@/components/experience/experience.ts'

defineProps<{
  item: ExperienceItemType
}>()
</script>

<template>
  <a target="_blank" :href="item.link" class="experience-item">
    <div class="experience-item__date">
      {{ item.date }}
    </div>
    <div class="experience-item__main">
      <div class="experience-item__role">{{ item.title }}</div>
      <div class="experience-item__description">{{ item.description }}</div>
      <div class="experience-item__stack">
        <div class="experience-item__stack-item" v-for="tech in item.stack" :key="tech">
          {{ tech }}
        </div>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
@import '../../assets/mixins.scss';

.experience-item {
  @include card-item;
  gap: 30px;

  &__role {
    color: var(--light-biege);
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
  }

  &__date {
    flex-shrink: 0;
    font-size: 14px;
    text-transform: uppercase;
  }

  &__description {
    margin-top: 20px;
  }

  &__stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
  }

  &__stack-item {
    padding: 5px 10px;
    border-radius: 20px;
    color: var(--light-biege);
    background-color: var(--dark-blue);
    font-weight: 500;
    transition: 0.3s all;

    &:hover {
      background-color: var(--dark-blue-1);
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 10px;

    &__description {
      margin-top: 10px;
    }

    &:hover {
      background-color: transparent;
      box-shadow: none;
    }
  }
}
</style>
