import { mount, DOMWrapper } from '@vue/test-utils'
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest'
import Lines from '@/components/header/Lines.vue'

vi.mock('gsap', () => ({
  to: vi.fn(),
}))

describe('Lines.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(Lines)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the correct number of lines', () => {
    const paths = wrapper.findAll('path')
    expect(paths.length).toBe(3)
  })

  it('initializes lines with correct attributes', () => {
    const paths = wrapper.findAll('path')

    const lines = wrapper.vm.lines as Array<{
      ref: { value: SVGPathElement | null }
      controlPoint: number
      initialColor: string
      secondaryColor: string
      isInitial: boolean
    }>

    paths.forEach((path: DOMWrapper<SVGPathElement>, index: number) => {
      const line = lines[index]
      expect(path.attributes('d')).toBe(
        `M ${line.controlPoint},0 Q ${line.controlPoint},500 ${line.controlPoint},1000`,
      )
      expect(path.attributes('stroke')).toBe(line.initialColor)
    })
  })
})
