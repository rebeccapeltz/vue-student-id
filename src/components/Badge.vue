<template>
  <div class="badge">
    <a href="#"><img :width="width" :height="height" :src="url" :alt="alt"/></a>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  props: ['width', 'height', 'url', 'alt']
}
</script>
