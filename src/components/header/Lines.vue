<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'

const lines = [
  {
    ref: ref<SVGPathElement | null>(null),
    controlPoint: 40,
    initialColor: '#7FBED1',
    secondaryColor: '#577080',
    isInitial: true,
  },
  {
    ref: ref<SVGPathElement | null>(null),
    controlPoint: 60,
    initialColor: '#D86937',
    secondaryColor: '#E9DBC9',
    isInitial: true,
  },
  {
    ref: ref<SVGPathElement | null>(null),
    controlPoint: 80,
    initialColor: '#F0A728',
    secondaryColor: '#AF8260',
    isInitial: true,
  },
]

const onMouseMove = (event: MouseEvent, lineIndex: number) => {
  const line = lines[lineIndex]
  if (!line.ref.value) return

  const svgBounds = (event.target as SVGElement).getBoundingClientRect()
  const mouseX = event.clientX - svgBounds.left
  const maxOffset = 50
  const centerX = line.controlPoint

  const newControlPoint = Math.min(
    Math.max(centerX + (mouseX - centerX) * 0.9, centerX - maxOffset),
    centerX + maxOffset,
  )

  // Toggle color on interaction
  line.isInitial = !line.isInitial
  const color = line.isInitial ? line.initialColor : line.secondaryColor

  gsap.to(line.ref.value, {
    duration: 0.2,
    attr: {
      d: `M ${line.controlPoint},0 Q ${newControlPoint},500 ${line.controlPoint},1000`,
    },
    stroke: color,
    ease: 'power1.out',
  })
}

const onLeave = (lineIndex: number) => {
  const line = lines[lineIndex]
  if (!line.ref.value) return

  const color = line.isInitial ? line.secondaryColor : line.initialColor

  gsap.to(line.ref.value, {
    duration: 0.9,
    attr: {
      d: `M ${line.controlPoint},0 Q ${line.controlPoint},500 ${line.controlPoint},1000`,
    },
    stroke: color,
    ease: 'bounce.out',
  })
}
</script>

<template>
  <div class="lines">
    <div class="container">
      <svg class="line-container" width="100" height="100%" viewBox="0 0 100 1000">
        <path
          v-for="(line, index) in lines"
          :key="index"
          :ref="line.ref"
          class="line"
          :d="`M ${line.controlPoint},0 Q ${line.controlPoint},500 ${line.controlPoint},1000`"
          fill="transparent"
          :stroke="line.initialColor"
          stroke-width="2"
          @mouseleave="onLeave(index)"
          @mousemove="onMouseMove($event, index)"
        />
      </svg>
    </div>

    <div class="mobile-lines">
      <div
        v-for="(line, index) in lines"
        :key="`mobile-${index}`"
        class="mobile-line"
        :class="`line-${index + 1}`"
      ></div>
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

      @media (max-width: 378px) {
        height: 302px;
      }
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
