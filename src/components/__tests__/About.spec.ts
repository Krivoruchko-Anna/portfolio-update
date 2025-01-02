import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { gsap } from 'gsap'
import About from '@/components/About.vue'

vi.mock('lodash', () => ({
  throttle: (fn: Function) => fn,
}))

vi.mock('gsap', () => ({
  gsap: {
    fromTo: vi.fn(),
  },
}))

describe('About Component', () => {
  it('renders About component properly', () => {
    const wrapper = mount(About)
    expect(wrapper.find('.about__title').text()).toBe('About')
    expect(wrapper.find('.about__info').exists()).toBe(true)
  })

  it('renders photo and circle elements', () => {
    const wrapper = mount(About)
    const photo = wrapper.find('.about__photo')
    const circle = wrapper.find('.about__circle')
    expect(photo.exists()).toBe(true)
    expect(circle.exists()).toBe(true)
  })

  it('calls bounceEffect on photo click', async () => {
    const wrapper = mount(About)
    const photo = wrapper.find('.about__photo')

    await photo.trigger('click')

    expect(gsap.fromTo).toHaveBeenCalledTimes(2)
    expect(gsap.fromTo).toHaveBeenCalledWith(
      expect.anything(),
      { y: 0, x: 0 },
      {
        scale: 0.85,
        y: expect.any(Number),
        x: expect.any(Number),
        skewX: 25,
        skewY: 25,
        duration: 0.1,
        ease: 'elastic.out',
        yoyo: true,
        repeat: 1,
      },
    )
  })
})
