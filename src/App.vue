<template>
  <div id="app">
    <Banner :cloudname="cloudName" />
    <h1>
      <span>{{ courseTitle }}</span> <span>{{ courseDate }}</span>
    </h1>
    <h2>Create a Badge</h2>
    <Form :cloudname="cloudName" :preset="preset" />

    <div class="child-page-listing">
      <h2>Badge Gallery</h2>

      <Gallery />
      <!-- end grid container -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Form from './components/Form.vue'
import Banner from './components/Banner.vue'
import Gallery from './components/Gallery.vue'

export default {
  name: 'App',
  components: {
    Banner,
    Form,
    Gallery
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
  created() {
    const urlParams = new URLSearchParams(window.location.search)
    this.cloudName = urlParams.get('cn') || 'pictures77'
    this.courseTitle = urlParams.get('title') || 'Test'
    this.courseDate = urlParams.get('date') || '2020'
    this.fetchStudents(this.cloudName)
      .then(studentList => {
        console.log(JSON.stringify(studentList, null, 2))
      })
      .catch(error => {
        console.error(JSON.stringify(error, null, 2))
      })
  },
  methods: {
    ...mapActions(['fetchStudents'])
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
