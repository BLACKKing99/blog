<template>
  <div class="particles-js-box">
    <div id="particles-js" />
  </div>
</template>

<script lang="ts" setup>
import particlesJs from './util/particles.js'
import particlesJsConfig from './util/particles.json'

onMounted(() => {
  particlesJs('particles-js', particlesJsConfig)
})
</script>

<style scoped lang="scss">
.particles-js-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  #particles-js {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
