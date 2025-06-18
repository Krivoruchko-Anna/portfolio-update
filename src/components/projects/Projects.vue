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

  <div class="projects pet-projects">
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

<style lang="scss">
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
  }

  .show {
    margin-bottom: 30px;
    display: block;
  }

  @media (max-width: 1480px) {
    &__container {
      gap: 14px;
    }
  }

  @media (max-width: 1024px) {
    padding: 20px;
    margin-top: 80px;

    &__container {
      margin-top: 20px;
      gap: 4px;
    }

    &__title {
      display: block;
    }
  }

  @media (max-width: 860px) {
    margin-top: 40px;
  }
}

.pet-projects {
  .projects__container {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 28px;
  }

  .project-item {
    padding: 12px;
    width: 310px;
  }

  @media (max-width: 1480px) {
    flex-direction: column;
    gap: 20px;

    .project-item {
      padding: 8px 20px;
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    .projects {
      &__container {
        margin-top: 20px;
        gap: 4px;
      }
    }

    .project-item {
      padding: 6px 0;
    }
  }
}

@media (max-width: 460px) {
  .projects {
    padding: 12px 6px;
  }
}
</style>
