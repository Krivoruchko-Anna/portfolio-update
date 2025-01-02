import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProjectsComponent from '@/components/projects/Projects.vue'
import ProjectItem from '@/components/projects/ProjectItem.vue'
import { Projects, PetProjects } from '@/components/projects/projects.ts'

describe('Project Component', () => {
  it('renders the "Projects" section with correct ProjectItem components', () => {
    const wrapper = mount(ProjectsComponent)

    const projectsTitle = wrapper.find('.projects__title')
    expect(projectsTitle.text()).toBe('Projects')

    const projectItems = wrapper.findAllComponents(ProjectItem)
    expect(projectItems.length).toBe(Projects.length + PetProjects.length)
  })

  it('renders both sections with correct containers', () => {
    const wrapper = mount(ProjectsComponent)

    const projectsSection = wrapper.find('.projects')
    const petProjectsSection = wrapper.find('.projects.pet-projects')

    expect(projectsSection.exists()).toBe(true)
    expect(petProjectsSection.exists()).toBe(true)
  })
})
