<template>
  <div id="gallery" class="grid-container">
    <article
      v-for="student in allStudents"
      :key="student.public_id"
      class="student-listing"
    >
      <div class="student-image">
        <a href="#"
          ><img
            :width="width"
            :height="height"
            :src="student.URL"
            :alt="student.fullname"
        /></a>
      </div>

      <!-- <Article :student="encodedStudentData(student)" /> -->
    </article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Article from './components/Article.vue'
// import cl from 'cloudinary-core'

export default {
  name: 'Gallery',
  components: {
    // Article
  },
  data: function() {
    return {
      width: 300,
      height: 400
    }
  },
  computed: {
    ...mapGetters(['allStudents'])
  }
}
</script>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
}
</style>
