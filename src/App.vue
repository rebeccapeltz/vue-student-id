<template>
  <div id="app">
    <Banner :cloudname="cloudName" />
    <h1>
      <span>{{ courseTitle }}</span> <span>{{ courseDate }}</span>
    </h1>
    <h2>Create a Badge</h2>
    <Form :cloudname="cloudName" :preset="preset" />
  </div>
</template>

<script>
import Form from './components/Form.vue'
import Banner from './components/Banner.vue'

export default {
  name: 'App',
  components: {
    Banner,
    Form
  },
  data: function() {
    return {
      cloudName: '',
      courseTitle: '',
      courseDate: '',
      preset: 'student-id',
      dupsAllowed: false,
      namedTransform: 'v-badge-color'
    }
  },
  mounted: function() {
    let urlParams = new URLSearchParams(window.location.search)
    this.cloudName = urlParams.get('cn') || 'pictures77'
    this.courseTitle = urlParams.get('title') || 'Test'
    this.courseDate = urlParams.get('date') || '2020'
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  padding: 0.3rem;
  font-family: 'Montserrat', arial, sans-serif;
  background: #f2f2f2;
}
</style>
