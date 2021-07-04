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

/*toasted */
.toasted-container .toasted{
  top:-15px!important;
}
.toasted .primary.success, .toasted.toasted-primary.success{
  background-color: #49a7ff!important;
}
.toasted .primary.error, .toasted.toasted-primary.error{
  background-color: #e34a4a!important;
}
</style>
