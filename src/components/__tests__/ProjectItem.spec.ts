import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProjectItem from '@/components/projects/ProjectItem.vue'
import { ProjectItemType } from '@/components/projects/projects.ts'

describe('ProjectItem Component', () => {
  const project: ProjectItemType = {
    title: 'Test Project',
    description: 'A description for the test project.',
    image: 'test-project-image',
    link: 'https://test-project.com',
  }

  it('renders the project title correctly', () => {
    const wrapper = mount(ProjectItem, {
      props: {
        project,
      },
    })

    const title = wrapper.find('.project-item__title')
    expect(title.text()).toBe('Test Project')
  })

  it('renders the project description correctly', () => {
    const wrapper = mount(ProjectItem, {
      props: {
        project,
      },
    })

    const description = wrapper.find('.project-item__description')
    expect(description.text()).toBe('A description for the test project.')
  })

  it('renders the correct project image with src and alt attributes', () => {
    const wrapper = mount(ProjectItem, {
      props: {
        project,
      },
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/projects/test-project-image.jpg')
    expect(img.attributes('alt')).toBe('Test Project')
  })

  it('renders a link with the correct href attribute', () => {
    const wrapper = mount(ProjectItem, {
      props: {
        project,
      },
    })

    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('https://test-project.com')
    expect(link.attributes('target')).toBe('_blank')
  })

  it('applies the "project-item" class to the root element', () => {
    const wrapper = mount(ProjectItem, {
      props: {
        project,
      },
    })

    expect(wrapper.classes()).toContain('project-item')
  })
})
