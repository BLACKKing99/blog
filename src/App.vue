<template>
  <router-view />
  <audio
    :src="musicStore.currentUrl"
    autoplay
    ref="audioRef"
  />
</template>

<script lang="ts" setup>
import { useAudio } from './hooks/useAudio'
import { useMusicStore } from './sotre/module/music'

const musicStore = useMusicStore()

const { audioRef } = useAudio()
</script>

<style lang="scss">
</style>
