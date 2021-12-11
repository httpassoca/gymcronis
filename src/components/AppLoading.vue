<template>
<div class="loading">
  <div class="loader">
    loader
  </div>
</div>
</template>

<style lang="sass" scoped>
.loading
  position: absolute
  width: 100vw
  height: 100vh
  left: 0
  .loader
    position: fixed
    width: 200px
    height: 200px
    background-color: lime
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
</style>
