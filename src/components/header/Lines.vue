<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'

const line1 = ref<SVGPathElement | null>(null)
const line2 = ref<SVGPathElement | null>(null)
const line3 = ref<SVGPathElement | null>(null)

const controlPoints = {
  line1: 40,
  line2: 60,
  line3: 80,
}

const initialLines = ref({
  line1: {
    initialColor: '#7FBED1',
    secondaryColor: '#577080',
    isInitial: true,
  },
  line2: {
    initialColor: '#D86937',
    secondaryColor: '#E9DBC9',
    isInitial: true,
  },
  line3: {
    initialColor: '#F0A728',
    secondaryColor: '#AF8260',
    isInitial: true,
  },
})

const onMouseMove = (event: MouseEvent, line: string) => {
  const svgBounds = (event.target as SVGElement).getBoundingClientRect()
  const mouseX = event.clientX - svgBounds.left

  const maxOffset = 100
  const centerX = controlPoints[line]
  const newControlPoint = Math.min(
    Math.max(centerX + (mouseX - centerX) * 0.9, centerX - maxOffset),
    centerX + maxOffset,
  )

  if (line === 'line1' && line1.value) {
    initialLines.value.line1.isInitial = !initialLines.value.line1.isInitial
    const color = initialLines.value.line1.isInitial
      ? initialLines.value.line1.initialColor
      : initialLines.value.line1.secondaryColor

    gsap.to(line1.value, {
      duration: 0.2,
      attr: {
        d: `M 40,0 Q ${newControlPoint},500 40,1000`,
      },
      stroke: color,
      ease: 'power1.out',
    })
  }

  if (line === 'line2' && line2.value) {
    initialLines.value.line2.isInitial = !initialLines.value.line2.isInitial
    const color = initialLines.value.line2.isInitial
      ? initialLines.value.line2.initialColor
      : initialLines.value.line2.secondaryColor

    gsap.to(line2.value, {
      duration: 0.2,
      attr: {
        d: `M 60,0 Q ${newControlPoint},500 60,1000`,
      },
      stroke: color,
      ease: 'power1.out',
    })
  }

  if (line === 'line3' && line3.value) {
    initialLines.value.line3.isInitial = !initialLines.value.line3.isInitial
    const color = initialLines.value.line3.isInitial
      ? initialLines.value.line3.initialColor
      : initialLines.value.line3.secondaryColor

    gsap.to(line3.value, {
      duration: 0.2,
      attr: {
        d: `M 80,0 Q ${newControlPoint},500 80,1000`,
      },
      stroke: color,
      ease: 'power1.out',
    })
  }
}

const onLeave = (line: string) => {
  const duration = 0.7

  if (line === 'line1' && line1.value) {
    const color = initialLines.value.line1.isInitial
      ? initialLines.value.line1.secondaryColor
      : initialLines.value.line1.initialColor

    gsap.to(line1.value, {
      duration: duration,
      attr: {
        d: 'M 40,0 Q 40,500 40,1000',
      },
      stroke: color,
      ease: 'bounce.out',
    })
  }

  if (line === 'line2' && line2.value) {
    const color = initialLines.value.line2.isInitial
      ? initialLines.value.line2.secondaryColor
      : initialLines.value.line2.initialColor

    gsap.to(line2.value, {
      duration: duration,
      attr: {
        d: 'M 60,0 Q 60,500 60,1000',
      },
      stroke: color,
      ease: 'bounce.out',
    })
  }

  if (line === 'line3' && line3.value) {
    const color = initialLines.value.line3.isInitial
      ? initialLines.value.line3.secondaryColor
      : initialLines.value.line3.initialColor

    gsap.to(line3.value, {
      duration: duration,
      attr: {
        d: 'M 80,0 Q 80,500 80,1000',
      },
      stroke: color,
      ease: 'bounce.out',
    })
  }
}
</script>

<template>
  <div class="lines">
    <div class="container">
      <svg class="line-container" width="100" height="100%" viewBox="0 0 100 1000">
        <path
          ref="line1"
          class="line"
          d="M 40,0 Q 40,500 40,1000"
          fill="transparent"
          stroke="#7FBED1"
          stroke-width="2"
          @mouseleave="onLeave('line1')"
          @mousemove="onMouseMove($event, 'line1')"
        />
        <path
          ref="line2"
          class="line"
          d="M 60,0 Q 60,500 60,1000"
          fill="transparent"
          stroke="#D86937"
          stroke-width="2"
          @mouseleave="onLeave('line2')"
          @mousemove="onMouseMove($event, 'line2')"
        />
        <path
          ref="line3"
          class="line"
          d="M 80,0 Q 80,500 80,1000"
          fill="transparent"
          stroke="#F0A728"
          stroke-width="2"
          @mouseleave="onLeave('line3')"
          @mousemove="onMouseMove($event, 'line3')"
        />
      </svg>
    </div>

    <div class="mobile-lines">
      <div class="mobile-line line-1"></div>
      <div class="mobile-line line-2"></div>
      <div class="mobile-line line-3"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lines {
  position: absolute;
  left: -30px;
  height: calc(100% - 80px);
  cursor: pointer;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 30px);
  }

  .line-container {
    width: 100px;
    height: 100%;
  }

  .line {
    transition: path 1s;
  }

  .mobile-lines {
    display: none;
    gap: 4px;

    .mobile-line {
      width: 2px;
      height: 232px;
    }

    .line-1 {
      background-color: var(--light-blue);
    }

    .line-2 {
      background-color: var(--orange);
    }

    .line-3 {
      background-color: var(--yellow);
    }
  }
}

@media (max-width: 1024px) {
  .lines {
    left: 15px;
    height: 100%;

    .container {
      display: none;
    }

    .mobile-lines {
      display: flex;
    }
  }
}
</style>
