<template>
  <div class="form">
    <form class="form-inline">
      <label for="fname">First name:</label><br />
      <input
        type="text"
        v-model="fname"
        id="fname"
        name="fname"
        value=""
        size="12"
        maxlength="11"
        placeholder="First name"
      /><br />
      <label for="lname">Last name:</label><br />
      <input
        type="text"
        v-model="lname"
        id="lname"
        name="lname"
        value=""
        size="12"
        maxlength="11"
        placeholder="Last name"
      /><br />

      <label for="title">Title:</label><br />
      <input
        type="text"
        v-model="title"
        id="title"
        name="title"
        value=""
        size="12"
        maxlength="22"
        placeholder="Title"
      /><br />
      <label for="org">Organization:</label><br />
      <input
        type="text"
        v-model="org"
        id="org"
        name="org"
        value=""
        size="12"
        maxlength="22"
        placeholder="Organization"
      /><br />
      <br />
      <label for="bgcolor">Background color:</label><br />
      <div class="color-container">
        <input
          type="radio"
          v-model="bgcolor"
          name="bgcolor"
          id="y1"
          value="F2D865"
        />
        <label class="color" for="y1"><span class="y1"></span></label>

        <input
          type="radio"
          v-model="bgcolor"
          name="bgcolor"
          id="y2"
          value="F4B21B"
        />
        <label class="color" for="y2"><span class="y2"></span></label>

        <input
          type="radio"
          v-model="bgcolor"
          name="bgcolor"
          id="y3"
          value="DB8226"
        />
        <label class="color" for="y3"><span class="y3"></span></label>

        <input
          type="radio"
          v-model="bgcolor"
          name="bgcolor"
          id="b1"
          value="0071BA"
        />
        <label class="color" for="b1"><span class="b1"></span></label>

        <input
          type="radio"
          v-model="bgcolor"
          name="bgcolor"
          id="b2"
          value="0E2F5A"
        />
        <label class="color" for="b2"><span class="b2"></span></label>

        <input
          type="radio"
          v-model="bgcolor"
          name="bgcolor"
          id="b3"
          value="231F20"
        />
        <label class="color" for="b3"><span class="b3"></span></label>
      </div>
      <button
        id="upload"
        :disabled="inputRequired"
        v-on:click="uploadStudent"
        type="button"
      >
        Upload Image
      </button>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import ListAPIData from '../util/ListAPIData'

export default {
  name: 'Form',
  props: ['cloudname', 'preset'],
  data: function() {
    return {
      fname: '',
      lname: '',
      title: '',
      org: '',
      bgcolor: '',
      uploadWidget: null,
      vToastify: this.$vToastify
    }
  },
  methods: {
    ...mapMutations(['insertStudent']),
    clearForm: function() {
      this.fname = ''
      this.lname = ''
      this.org = ''
      this.bgcolor = ''
    },
    deleteNoFaceImage: function(result, cloudname) {
      console.log('deleteNoFaceImage')
      const token = { token: result.info.delete_token }
      fetch(`https://api.cloudinary.com/v1_1/${cloudname}/delete_by_token`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(token)
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(
            'success deleting image without face',
            JSON.stringify(data, null, 2)
          )
          this.vToastify.error('Image uploaded must have a face')
        })
        .catch(error => {
          console.log('error deleting face', error)
        })
    },
    createContextMap: function() {
      return {
        fname: this.fname || '',
        lname: this.lname || '',
        bgcolor: this.bgcolor || '',
        color: ListAPIData.getContrastL(this.bgcolor),
        title: this.title || '',
        org: this.org || '',
        uploadDate: new Date().toISOString()
      }
    },
    uploadStudent: function() {
      if (
        !this.isUnique({
          fname: this.fname,
          lname: this.lname,
          org: this.org,
          title: this.title
        })
      ) {
        console.log('new student nust be unique')
        this.vToastify.error('Duplicate data. The data entered must be unique.')
        return
      }
      this.uploadWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: this.cloudname,
          upload_preset: this.preset,
          sources: ['local', 'url', 'camera', 'facebook'],
          context: this.createContextMap(),
          clientAllowedFormats: ['png', 'jpeg'],
          return_delete_token: 1
        },
        function(error, result) {
          if (error) {
            console.log(error)
            return
          }
          console.log(result)
          if (result.event === 'success') {
            console.log('success:', JSON.stringify(result, null, 2))
            if (
              result.info &&
              result.info.faces &&
              result.info.faces.length > 0
            ) {
              this.vToastify.success('Successful upload!')

              this.clearForm()

              //add new student to store which update gallery
              this.insertStudent(
                ListAPIData.processSingleStudent(result.info, this.cloudname)
              )
              console.log(
                'new student added:',
                JSON.stringify(this.allStudents)
              )
              // delete image if it doesn't have a face
            } else {
              console.log('Successful upload but no face!')
              this.deleteNoFaceImage(result, this.cloudname)
            }

            if (result.event === 'done') {
              console.log('done event:', result.info)
            }
          }
        }.bind(this)
      )

      this.uploadWidget.open()
    },
    isUnique: function(newStudent) {
      console.log('allStudent', this.allStudents)
      const result = this.allStudents.filter(student => {
        return (
          student.fname === newStudent.fname &&
          student.lname === newStudent.lname &&
          student.title === newStudent.title &&
          student.org === newStudent.org
        )
      })
      return result.length === 0
    },
    doubleEncode: function(str) {
      if (!str) return ''
      let arr = str.split('')
      let newArr = []
      for (let c of arr) {
        newArr.push(encodeURIComponent(encodeURIComponent(c)))
      }
      let newStr = newArr.join('')
      return newStr
    },
    fullname: function(fname, lname) {
      return `${this.doubleEncode(fname || '')}%20${this.doubleEncode(
        lname || ''
      )}`
    }
  },
  computed: {
    ...mapGetters(['allStudents']),

    inputRequired: function() {
      return !(
        this.fname.length > 0 &&
        this.lname.length > 0 &&
        this.org.length > 0 &&
        this.title.length > 0 &&
        this.bgcolor.length > 0
      )
    }
  }
}
</script>

<style scoped>
.form-inline {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.form-inline label {
  margin: 0;
  font-size: 0.8rem;
  color: #0e2f5a;
}

.form-inline input {
  vertical-align: middle;
  margin: 0;
  padding: 0.6rem;
  background-color: #fff;
  border: 0.3rem solid #ddd;
}

.form-inline button {
  padding: 0.6rem 1.2rem;
  background-color: #0e2f5a;
  border: 1px solid #ddd;
  color: white;
  cursor: pointer;
}
.form-inline button:disabled {
  background-color: gray;
  cursor: none;
}
.form-inline button:hover {
  background-color: royalblue;
}

@media only screen and (min-width: 800px) {
  .form-inline label {
    margin: 0.3rem;
  }
  .form-inline button {
    margin: 0 0 0 0.3rem;
  }
  .form-inline button:disabled {
    background-color: gray;
    cursor: none;
  }

  .form-inline input {
    margin: 0.3rem 0;
  }
}
@media (max-width: 800px) {
  .form-inline {
    flex-direction: column;
    align-items: stretch;
  }
  .form-inline button {
    margin-top: 0.3rem;
  }
}

/* color select */
.color-container {
  display: inline-block;
}
input[type='radio'] {
  display: none;
}

input[type='radio']:checked + label span {
  transform: scale(1.25);
}
input[type='radio']:checked + label .y1 {
  border: 2px solid #000;
}
input[type='radio']:checked + label .y2 {
  border: 2px solid #000;
}
input[type='radio']:checked + label .y3 {
  border: 2px solid #000;
}

label.color {
  display: inline-block;
  width: 2em;
  height: 25px;
  margin-right: 2px;
  cursor: pointer;
}

label.color span {
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease-in-out;
}
label.color span.y1 {
  background: #f2d865;
}
label.color span.y2 {
  background: #f4b21b;
}
label.color span.y3 {
  background: #db8226;
}
label.color span.b1 {
  background: #0071ba;
}
label.color span.b2 {
  background: #0e2f5a;
}
label.color span.b3 {
  background: #231f20;
}
</style>
