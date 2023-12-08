<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <Suspense>
      <RouterView />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>
