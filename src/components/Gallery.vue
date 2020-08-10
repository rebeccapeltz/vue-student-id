<template>
  <div id="gallery" class="grid-container">
    <article
      v-for="student in allStudents"
      :key="student.public_id"
      class="student-listing"
    >
      <Badge
        :height="height"
        :width="width"
        :url="student.URL"
        :alt="student.fullname"
      />
    </article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Badge from './Badge'

export default {
  name: 'Gallery',
  components: {
    Badge
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
