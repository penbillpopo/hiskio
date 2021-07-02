<template>
  <div>
    <NavBar />
    <Nuxt />
  </div>
</template>
<script>
  export default {
    middleware: 'authenticated'
  }
</script>
<style>
html {
  @apply bg-gray-100;
}
</style>
