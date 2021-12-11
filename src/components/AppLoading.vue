<template>
<div class="loading">
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M496 176h-58v-64h-76v122H150V112H74v64H16v160h58v64h76V278h212v122h76v-64h58V176z"></path></svg>
</div>
</template>

<style lang="sass" scoped>
@keyframes spinning
  from
    transform: translate(-50%, -50%) rotate(0deg)
  to
    transform: translate(-50%, -50%) rotate(180deg)
.loading
  position: fixed
  width: 100vw
  height: 100vh
  left: 0
  top: 0
  background-color: #FFFA
  z-index: 10
  svg
    z-index: 11
    position: fixed
    width: 150px
    height: 150px
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    animation: spinning infinite 1s
</style>
