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
    ...mapGetters(['allStudents']),
    doubleEncode: function(str) {
      // console.log("double encode");
      if (!str) return ''
      let arr = str.split('')
      let newArr = []
      for (let c of arr) {
        newArr.push(encodeURIComponent(encodeURIComponent(c)))
      }
      let newStr = newArr.join('')
      return newStr
    },
    //build an object for each student that is encoded for the named transformation
    encodedStudentData: function(student) {
      let contextMap =
        student && student.context ? student.context.custom : null
      if (!contextMap) {
        console.log('No context:', JSON.stringify(student, null, 2))
        // create dummy context values
        contextMap = {
          public_id: '',
          fname: '',
          lname: '',
          bgcolor: '',
          title: '',
          org: ''
        }
      }

      // all data that will appear in overlay must be double encoded
      let studentData = { ...contextMap }
      studentData.publicId = student.public_id || ''
      studentData.fullname = `${this.doubleEncode(
        studentData.fname || ''
      )}%20${this.doubleEncode(studentData.lname || '')}`
      studentData.org = this.doubleEncode(studentData.org || '')
      studentData.title = this.doubleEncode(studentData.title || '')
      let bgcolor =
        studentData.bgcolor && studentData.bgcolor.length > 0
          ? studentData.bgcolor
          : '231F20' //default is darkest
      studentData.bgcolor = `!rgb:${bgcolor}!` // does this need to be url encoded?
      studentData.color = `!rgb:${this.getContrastL(bgcolor)}!` //TODO calculate color
      let filler = Array(45)
        .fill('%20')
        .join('')
      //create overlay text
      const overlayText = `!${studentData.fullname}%250A${studentData.title}%250A${studentData.org}%250A${filler}!`
      //create badge URL
      studentData.URL = `https://www.google.com/${overlayText}`
      // studentData.URL = cl.url(
      //   studentData.publicId,
      //   cl
      //     .transformation()
      //     .variables([
      //       ['$data', `${overlayText}`],
      //       ['$color', `${studentData.color}`],
      //       ['$bgcolor', `${studentData.bgcolor}`]
      //     ])
      //     .transformation('v-badge-color')
      // )
      return studentData
    }
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
