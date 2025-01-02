import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ExperienceItem from '@/components/experience/ExperienceItem.vue'
import type { ExperienceItemType } from '@/components/experience/experience.ts'

describe('ExperienceItem.vue', () => {
  const mockItem: ExperienceItemType = {
    title: 'Frontend Developer',
    description: 'Developed and maintained the user interface.',
    date: '2022 - Present',
    link: 'https://example.com',
    stack: ['Vue.js', 'TypeScript', 'TailwindCSS'],
  }

  it('renders the item title correctly', () => {
    const wrapper = mount(ExperienceItem, {
      props: {
        item: mockItem,
      },
    })

    const title = wrapper.find('.experience-item__role')
    expect(title.text()).toBe(mockItem.title)
  })

  it('renders the item description correctly', () => {
    const wrapper = mount(ExperienceItem, {
      props: {
        item: mockItem,
      },
    })

    const description = wrapper.find('.experience-item__description')
    expect(description.text()).toBe(mockItem.description)
  })

  it('renders the item date correctly', () => {
    const wrapper = mount(ExperienceItem, {
      props: {
        item: mockItem,
      },
    })

    const date = wrapper.find('.experience-item__date')
    expect(date.text()).toBe(mockItem.date)
  })

  it('renders the correct link URL', () => {
    const wrapper = mount(ExperienceItem, {
      props: {
        item: mockItem,
      },
    })

    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe(mockItem.link)
  })

  it('renders the correct stack items', () => {
    const wrapper = mount(ExperienceItem, {
      props: {
        item: mockItem,
      },
    })

    const stackItems = wrapper.findAll('.experience-item__stack-item')
    expect(stackItems.length).toBe(mockItem.stack.length)

    stackItems.forEach((stackItem, index) => {
      expect(stackItem.text()).toBe(mockItem.stack[index])
    })
  })

  it('opens the link in a new tab', () => {
    const wrapper = mount(ExperienceItem, {
      props: {
        item: mockItem,
      },
    })

    const link = wrapper.find('a')
    expect(link.attributes('target')).toBe('_blank')
  })
})
