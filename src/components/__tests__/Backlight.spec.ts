import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { gsap } from 'gsap'
import Backlight from '@/components/Backlight.vue'

vi.mock('gsap', () => ({
  gsap: {
    to: vi.fn(),
    set: vi.fn(),
  },
}))

describe('Backlight Component', () => {
  let addEventListenerSpy: vi.SpyInstance
  let removeEventListenerSpy: vi.SpyInstance

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(document, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders Backlight component properly', () => {
    const wrapper = mount(Backlight)
    expect(wrapper.find('.backlight').exists()).toBe(true)
  })

  it('sets initial gsap properties on mount', async () => {
    mount(Backlight)

    await new Promise((r) => setTimeout(r, 500))

    expect(gsap.set).toHaveBeenCalledWith(expect.anything(), {
      width: 500,
      height: 500,
      opacity: 0.2,
      boxShadow: '0 0 100px rgba(121, 88, 73, 0.5)',
    })
  })

  it('adds mousemove and mouseleave event listeners on mount', async () => {
    const wrapper = mount(Backlight)
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 600))

    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(addEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function))
  })

  it('removes event listeners on unmount', async () => {
    const wrapper = mount(Backlight)
    await wrapper.vm.$nextTick()

    wrapper.unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function))
  })

  it('handles mousemove and updates backlight position', async () => {
    const wrapper = mount(Backlight)
    await wrapper.vm.$nextTick()

    const mockEvent = { clientX: 100, clientY: 200 } as MouseEvent

    const backlightElement = wrapper.find('.backlight').element as HTMLElement
    Object.defineProperty(backlightElement, 'offsetWidth', { value: 500 })
    Object.defineProperty(backlightElement, 'offsetHeight', { value: 500 })

    document.dispatchEvent(new MouseEvent('mousemove', mockEvent))

    await new Promise((resolve) => setTimeout(resolve, 600))

    expect(gsap.to).toHaveBeenCalled()
    expect(gsap.to).toHaveBeenCalledWith(expect.anything(), {
      duration: 0.1,
      x: 100,
      y: 200,
      ease: 'power1.out',
    })
  })

  it('handles mouseleave and updates backlight properties', async () => {
    const wrapper = mount(Backlight)

    const gsapSpy = vi.spyOn(gsap, 'to')

    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')

    const mockEvent = new MouseEvent('mouseleave')

    await wrapper.vm.$nextTick()

    document.dispatchEvent(mockEvent)

    await new Promise((resolve) => setTimeout(resolve, 600))
    expect(addEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function))

    expect(gsapSpy).toHaveBeenCalledWith(expect.anything(), {
      width: 500,
      height: 500,
      opacity: 0.2,
      duration: 0.2,
      ease: 'power2.out',
    })
  })
})
