<script setup lang="ts">
import ProjectItem from '@/components/projects/ProjectItem.vue'
import { Projects, PetProjects } from '@/components/projects/projects.ts'
</script>

<template>
  <div id="projects" class="projects">
    <h2 class="projects__title">Projects</h2>
    <div class="projects__container">
      <ProjectItem v-for="project in Projects" :key="project.link" :project="project"></ProjectItem>
    </div>
  </div>

  <div class="projects">
    <h2 class="projects__title show">Just for fun</h2>
    <div class="projects__container">
      <ProjectItem
        v-for="project in PetProjects"
        :key="project.link"
        :project="project"
      ></ProjectItem>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.projects {
  margin-top: 100px;
  padding-top: 20px;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__title {
    display: none;
    padding-left: 20px;
  }

  .show {
    margin-bottom: 30px;
    padding-left: 20px;
    display: block;
  }
}

@media (max-width: 1024px) {
  .projects {
    margin-top: 80px;

    &__container {
      margin-top: 20px;
      gap: 10px;
    }

    &__title {
      display: block;
    }
  }
}
</style>
