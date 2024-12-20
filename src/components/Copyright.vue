<script setup lang="ts">
import { ref } from 'vue'

const currentYear = ref<number>(new Date().getFullYear())
</script>

<template>
  <div class="copyright">© {{ currentYear }} Anna Krivoruchko. All Rights Reserved.</div>
</template>

<style scoped lang="scss">
.copyright {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.6;
}
</style>
