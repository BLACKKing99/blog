<template>
  <router-view
    v-slot="{Component}"
    :key="$route.path"
  >
    <Transition name="el-fade-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script lang="ts" setup></script>
