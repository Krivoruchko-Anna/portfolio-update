<script setup lang="ts">
const circles = [
  {
    id: 1,
    left: '14%',
    size: 100,
    delay: '9s',
    gradient: 'var(--lava-orange), var(--lava-orange-1)',
  },
  {
    id: 2,
    left: '32%',
    size: 120,
    delay: '5s',
    gradient: 'var(--lava-orange-1), var(--yellow-lava)',
  },
  { id: 3, left: '60%', size: 80, delay: '0s', gradient: 'var(--biege), var(--light-brown)' },
  { id: 4, left: '85%', size: 90, delay: '11s', gradient: 'var(--lava-orange), var(--red)' },
  {
    id: 5,
    left: '9px',
    size: 94,
    delay: '10s',
    gradient: 'var(--lava-orange-2), var(--yellow-lava)',
  },
  {
    id: 6,
    left: '92%',
    size: 60,
    delay: '2s',
    gradient: 'var(--lava-orange), var(--lava-orange-1)',
  },
]

const middleCircles = [
  { id: 7, left: '49%', size: 90, delay: '3s', gradient: 'var(--lava-orange), var(--red)' },
  { id: 8, left: '25%', size: 94, delay: '1s', gradient: 'var(--light-brown), var(--biege)' },
]
</script>

<template>
  <div class="lava-lamp">
    <div
      v-for="circle in circles"
      :key="circle.id"
      class="circle"
      :style="{
        left: circle.left,
        width: `${circle.size}px`,
        height: `${circle.size}px`,
        animationDelay: circle.delay,
        background: `radial-gradient(circle at top left, ${circle.gradient})`,
      }"
    ></div>

    <div
      v-for="circle in middleCircles"
      :key="circle.id"
      class="circle-m"
      :style="{
        left: circle.left,
        width: `${circle.size}px`,
        height: `${circle.size}px`,
        animationDelay: circle.delay,
        background: `radial-gradient(circle at top right, ${circle.gradient})`,
      }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.lava-lamp {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 99vw;
  height: 100%;
  z-index: 0;
  pointer-events: none;

  @media (max-width: 1024px) {
    max-width: 84vw;
  }
}

.circle,
.circle-m {
  position: absolute;
  bottom: 0;
  border-radius: 50%;
  border: 2px solid var(--dark-brown);
  opacity: 0;
  animation:
    floatUp 40s linear infinite,
    deform 6s infinite ease-in-out;
}

.circle-m {
  bottom: 65%;
  animation:
    floatUp-m 18s linear infinite,
    deform 8s infinite ease-in-out;
}

@keyframes floatUp {
  0% {
    bottom: 0;
    opacity: 0;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    bottom: 100%;
    opacity: 0;
  }
}

@keyframes floatUp-m {
  0% {
    bottom: 65%;
    opacity: 0;
  }
  30% {
    opacity: 0.9;
  }
  100% {
    bottom: 100%;
    opacity: 0;
  }
}

@keyframes deform {
  0%,
  100% {
    transform: scale(1);
    border-radius: 50%;
  }
  25% {
    transform: scale(1.2);
    border-radius: 40% 60% 50% 50%;
  }
  50% {
    transform: scale(0.8);
    border-radius: 60% 40% 60% 40%;
  }
  75% {
    transform: scale(1.1);
    border-radius: 50% 50% 40% 60%;
  }
}
</style>
