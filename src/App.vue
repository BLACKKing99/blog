<template>
  <router-view
    v-slot="{Component}"
    :key="$route.path"
  >
    <Transition name="el-fade-in">
      <component :is="Component" />
    </Transition>
  </router-view>

  <!-- <keep-alive>
    <router-view />
  </keep-alive> -->
</template>

<script lang="ts" setup></script>
