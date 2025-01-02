import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Experience from '@/components/experience/Experience.vue'
import ExperienceItem from '@/components/experience/ExperienceItem.vue'
import { Experience as mockExperience } from '@/components/experience/experience.ts'

describe('Experience.vue', () => {
  it('renders the title correctly', () => {
    const wrapper = mount(Experience)
    expect(wrapper.find('.experience__title').text()).toBe('Experience')
  })

  it('renders the correct number of ExperienceItem components', () => {
    const wrapper = mount(Experience)
    const items = wrapper.findAllComponents(ExperienceItem)
    expect(items.length).toBe(mockExperience.length)
  })

  it('passes the correct props to ExperienceItem components', () => {
    const wrapper = mount(Experience)
    const items = wrapper.findAllComponents(ExperienceItem)

    items.forEach((itemWrapper, index) => {
      expect(itemWrapper.props('item')).toEqual(mockExperience[index])
    })
  })
})
