<template>
  <div id="app">
    <Banner cloudname="pictures77"/>
  </div>
</template>

<script>
import Banner from "./components/Banner.vue";

export default {
  name: "App",
  components: {
    Banner
  }
};
</script>

<style>
body{
  margin: 0;
  padding: 0;
  background-color: black;
}

</style>
