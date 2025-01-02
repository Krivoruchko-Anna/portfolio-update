import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
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

vi.mock('@/components/icons/IconLinkedin.vue', () => ({
  default: {
    template: '<div class="mock-icon-linkedin"></div>',
  },
}))

vi.mock('@/components/icons/IconGithub.vue', () => ({
  default: {
    template: '<div class="mock-icon-github"></div>',
  },
}))

vi.mock('@/components/icons/IconBehance.vue', () => ({
  default: {
    template: '<div class="mock-icon-behance"></div>', // Simple mock component
  },
}))

vi.mock('@/components/icons/IconInstagram.vue', () => ({
  default: {
    template: '<div class="mock-icon-instagram"></div>', // Simple mock component
  },
}))

describe('AppHeader.vue', () => {
  let wrapper: any
  let handleScrollSpy: any

  beforeEach(async () => {
    wrapper = mount(AppHeader, {
      global: {
        plugins: [router],
      },
    })

    await router.isReady()
  })

  it('renders the name and title correctly', () => {
    const name = wrapper.find('.header__name')
    const title = wrapper.find('.header__title')

    expect(name.text()).toBe('Anna Krivoruchko')
    expect(title.text()).toBe('Front End Developer')
  })

  it('renders the description correctly', () => {
    const description = wrapper.find('.header__description')
    expect(description.text()).toBe(
      'I build responsive, pixel-perfect web applications that deliver seamless digital experiences.',
    )
  })

  it('renders the navigation links correctly', () => {
    const navItems = wrapper.findAll('.header__nav-item')
    const navLinks = ['About', 'Experience', 'Projects']

    navItems.forEach((item, index) => {
      expect(item.text()).toBe(navLinks[index])
    })
  })

  it('highlights the active section correctly', async () => {
    await wrapper.find('li:nth-child(2)').trigger('click')
    await nextTick()

    const activeItem = wrapper.find('.header__nav-item.active')
    expect(activeItem.text()).toBe('Experience')
  })

  it('adds active class to the correct nav item based on scroll position', async () => {
    wrapper.vm.updateActiveSection('experience')
    await nextTick()

    const activeItem = wrapper.find('.header__nav-item.active')
    expect(activeItem.text()).toBe('Experience')
  })

  it('renders social media icons correctly', () => {
    const socialLinks = wrapper.findAll('.header__link')

    expect(socialLinks.length).toBe(4)

    socialLinks.forEach((link) => {
      const anchor = link.find('a')
      expect(anchor.exists()).toBe(true)
      expect(anchor.attributes('href')).toBeTruthy()

      const component = link.find('.header__icon')
      expect(component.exists()).toBe(true)
      expect(component.attributes('is')).toBe(link.icon)
    })
  })

  it('renders the Lines component', () => {
    const linesComponent = wrapper.findComponent(Lines)
    expect(linesComponent.exists()).toBe(true)
  })

  it('disables scroll listener when a nav item is clicked and checks for router-links', async () => {
    const routerLinks = wrapper.findAllComponents({ name: 'RouterLink' })
    expect(routerLinks.length).toBe(3)

    await routerLinks[0].trigger('click')

    expect(wrapper.vm.isScrollListenerDisabled).toBe(true)
  })
})
