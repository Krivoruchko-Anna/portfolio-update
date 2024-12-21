<script setup lang="ts">
import { ref } from 'vue'

const currentYear = ref<number>(new Date().getFullYear())
</script>

<template>
  <div class="copyright">
    © {{ currentYear }} Anna Krivoruchko. <span>All Rights Reserved.</span>
  </div>
</template>

<style scoped lang="scss">
.copyright {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.6;
  text-align: center;

  @media (max-width: 616px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
