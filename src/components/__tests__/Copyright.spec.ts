import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Copyright from '@/components/Copyright.vue'

describe('Copyright Component', () => {
  it('renders the current year and static text', () => {
    const currentYear = new Date().getFullYear()
    const wrapper = mount(Copyright)

    expect(wrapper.text()).toContain(`© ${currentYear} Anna Krivoruchko`)
    expect(wrapper.text()).toContain('All Rights Reserved.')
  })
})
