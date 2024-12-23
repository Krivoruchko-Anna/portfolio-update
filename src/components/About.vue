<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import { throttle } from 'lodash'

const photo = ref<HTMLImageElement | null>(null)
const circle = ref<HTMLImageElement | null>(null)

const getRandomSign = (): number => {
  return Math.random() < 0.5 ? -100 : 100
}

const bounceEffect = throttle(() => {
  if (!photo.value) return

  const randomX = getRandomSign()
  const randomY = getRandomSign()

  gsap.fromTo(
    photo.value,
    { y: 0, x: 0 },
    {
      scale: 0.85,
      y: randomY,
      x: randomX,
      skewX: 25,
      skewY: 25,
      duration: 0.1,
      ease: 'elastic.out',
      yoyo: true,
      repeat: 1,
    },
  )

  gsap.fromTo(
    circle.value,
    { y: 0, x: 0 },
    {
      scale: 0.9,
      y: 0,
      x: 0,
      skewX: 0,
      skewY: 0,
      duration: 0.1,
      ease: 'elastic.out',
      yoyo: true,
      repeat: 1,
    },
  )
}, 900)
</script>

<template>
  <div id="about" class="about">
    <h2 class="about__title">About</h2>

    <div class="about__container">
      <div ref="circle" class="about__circle"></div>
      <img
        src="/main_photo.png"
        class="about__photo"
        alt="photo"
        ref="photo"
        @click="bounceEffect"
      />

      <div class="about__info">
        <p>
          I am a Frontend Developer with over three years of commercial experience, specializing in
          creating dynamic and user-friendly web applications using modern technologies like Vue.js,
          TypeScript, and Lit. Throughout my career, I have worked on diverse projects ranging from
          international trading platforms and online education tools to charity initiatives and
          cutting-edge monitoring solutions. My work focuses on delivering seamless user experiences
          by developing efficient features, optimizing performance, and maintaining high-quality
          code standards.
        </p>
        <p>
          Collaboration and continuous learning are at the heart of my approach. I thrive in Agile
          environments, actively participating in planning, code reviews, and technical discussions
          to ensure successful project outcomes. Outside of work, I enjoy expressing creativity
          through making silver jewelry, exploring new places while traveling, and immersing myself
          in music and books.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  position: relative;
  padding-top: 60px;

  &__container {
    display: flex;
    gap: 24px;
  }

  &__title {
    display: none;
  }

  &__photo {
    width: 150px;
    height: 150px;
    filter: brightness(0.9);
    animation: deform-circle 8s infinite ease-in-out;
    transition: 0.5s all;
    cursor: pointer;

    &:hover {
      transform: scale(0.9);
    }

    @media (max-width: 1186px) {
      width: 120px;
      height: 120px;
    }
  }

  &__circle {
    position: absolute;
    top: 9%;
    left: -30px;
    width: 190px;
    height: 190px;
    border-radius: 50%;
    border: 1px solid var(--dark-brown);
    background: radial-gradient(circle at top left, var(--orange), var(--yellow));
    opacity: 0.6;
    animation: deform-circle 8s infinite ease-in-out;
    transition: 0.5s all;

    &:hover {
      transform: scale(1.05) rotate(49deg);
    }

    @media (max-width: 1186px) {
      top: 8%;
      left: -17px;
      width: 150px;
      height: 150px;
    }
  }

  p {
    margin-bottom: 12px;
    font-size: 16px;
  }
}

@media (max-width: 1024px) {
  .about {
    margin-top: 30px;
    padding: 60px 20px 0 20px;

    &__container {
      margin-top: 20px;
      align-items: center;
    }

    &__title {
      display: block;
    }

    &__photo {
      display: none;
    }

    &__circle {
      display: none;
    }
  }
}

@keyframes deform-circle {
  0% {
    border-radius: 50%;
  }
  25% {
    border-radius: 45% 60% 50% 50%;
  }
  50% {
    border-radius: 60% 45% 60% 45%;
  }
  75% {
    border-radius: 50% 50% 45% 60%;
  }
  100% {
    border-radius: 50%;
  }
}
</style>
