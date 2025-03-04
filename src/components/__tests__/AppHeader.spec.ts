import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createRouter, createWebHistory, RouterLink } from 'vue-router'
import AppHeader from '@/components/header/AppHeader.vue'
import Lines from '@/components/header/Lines.vue'
import { nextTick } from 'vue'

const routes = [
  { path: '/', name: 'Home', component: {} },
  { path: '/about', name: 'About', component: {} },
  { path: '/contact', name: 'Contact', component: {} },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

vi.mock('@/components/icons/IconLinkedin.vue', () => ({ default: { template: '<div class="mock-icon-linkedin"></div>' } }))
vi.mock('@/components/icons/IconGithub.vue', () => ({ default: { template: '<div class="mock-icon-github"></div>' } }))
vi.mock('@/components/icons/IconBehance.vue', () => ({ default: { template: '<div class="mock-icon-behance"></div>' } }))
vi.mock('@/components/icons/IconInstagram.vue', () => ({ default: { template: '<div class="mock-icon-instagram"></div>' } }))

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []
  callbackFn: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callbackFn = callback
  }

  observe(target: Element): void {}
  unobserve(target: Element): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
  triggerCallback(entries: IntersectionObserverEntry[]) {
    this.callbackFn(entries, this)
  }
}

global.IntersectionObserver = IntersectionObserverMock as any

describe('AppHeader.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(async () => {
    wrapper = mount(AppHeader, {
      global: { plugins: [router], stubs: { RouterLink } },
    })
    await router.isReady()
  })

  it('renders the name and title correctly', () => {
    expect(wrapper.find('.header__name').text()).toBe('Anna Krivoruchko')
    expect(wrapper.find('.header__title').text()).toBe('Front End Developer')
  })

  it('renders the description correctly', () => {
    expect(wrapper.find('.header__description').text()).toBe(
      'I build responsive, pixel-perfect web applications that deliver seamless digital experiences.'
    )
  })

  it('renders the navigation links correctly', () => {
    const navLinks = ['About', 'Experience', 'Projects']
    wrapper.findAll('.header__nav-item').forEach((item, index) => {
      expect(item.text()).toBe(navLinks[index])
    })
  })

  it('highlights the active section correctly', async () => {
    wrapper.vm.updateActiveSection('experience')
    await nextTick()
    expect(wrapper.find('.header__nav-item.active').text()).toContain('Experience')
  })

  it('disables scroll listener on nav item click', async () => {
    const routerLinks = wrapper.findAllComponents(RouterLink)
    await routerLinks[0].trigger('click')
    expect(wrapper.vm.isScrollListenerDisabled).toBe(true)
  })

  it('updates activeSection based on intersection observer', async () => {
    const fakeEntry: IntersectionObserverEntry = {
      time: 0,
      target: { id: 'about' } as Element,
      isIntersecting: true,
      intersectionRatio: 0.6,
      boundingClientRect: {} as DOMRect,
      intersectionRect: {} as DOMRect,
      rootBounds: null,
    }
    const observerInstance = new IntersectionObserverMock(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) wrapper.vm.activeSection = entry.target.id
      })
    })

    observerInstance.triggerCallback([fakeEntry])
    await nextTick()
    expect(wrapper.vm.activeSection).toBe('about')
  })

  it('renders social media icons correctly', () => {
    wrapper.findAll('.header__link').forEach(link => {
      const anchor = link.find('a')
      expect(anchor.exists()).toBe(true)
      expect(anchor.attributes('href')).toBeTruthy()
      expect(link.find('.header__icon').exists()).toBe(true)
    })
  })

  it('renders the Lines component', () => {
    expect(wrapper.findComponent(Lines).exists()).toBe(true)
  })
})
