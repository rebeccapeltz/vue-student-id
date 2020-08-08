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
      uploadWidget: null
    }
  },
  methods: {
    ...mapMutations(['addStudent']),
    clearForm: function() {
      this.fname = ''
      this.lname = ''
      this.org = ''
      this.bgcolor = ''
    },
    deleteNoFaceImage: function(result) {
      console.log('deleteNoFaceImage')
      const token = { token: result.info.delete_token }
      fetch(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/delete_by_token`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(token)
        }
      )
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(
            'success deleting image without face',
            JSON.stringify(data, null, 2)
          )
          //the upload button should be turned back on
          // TODO upload button on?
          // setUploadButton(true);
          // toast("Image uploaded must have a face.", "warn");
        })
        .catch(error => {
          console.log('error deleting face', error)
        })
    },
    hexdec: function(hex) {
      return hex
        .toLowerCase()
        .split('')
        .reduce(
          (result, ch) => result * 16 + '0123456789abcdefgh'.indexOf(ch),
          0
        )
    },
    getContrast: function(hexcolor) {
      let r = this.hexdec(hexcolor.substr(0, 2))
      let g = this.hexdec(hexcolor.substr(2, 2))
      let b = this.hexdec(hexcolor.substr(4, 2))
      let l = r * 0.2126 + g * 0.7152 + b * 0.0722
      return l >= 128 ? '000000' : 'ffffff'
    },
    createContextMap: function() {
      return {
        fname: this.fname || '',
        lname: this.lname || '',
        bgcolor: this.bgcolor || '',
        color: this.getContrast(this.bgcolor),
        title: this.title || '',
        org: this.org || '',
        uploadDate: new Date().toISOString()
      }
    },
    uploadStudent: function() {
      if (this.isUnique()) {
        console.log('new student is unique')

        this.uploadWidget = window.cloudinary.createUploadWidget(
          {
            cloudName: this.cloudname,
            upload_preset: this.preset,
            sources: ['local', 'url', 'camera', 'facebook'],
            context: this.createContextMap(),
            clientAllowedFormats: ['png', 'jpeg'],
            return_delete_token: 1
          },
          (error, result) => {
            //wait for success
            if (!error) {
              console.log('UW non error event', result.event)
              if (result.event === 'success') {
                console.log('success:', JSON.stringify(result, null, 2))
                //TODO disable the upload button clearform
                if (
                  result.info &&
                  result.info.faces &&
                  result.info.faces.length > 0
                ) {
                  // toast("Successful face upload.", "info");
                  this.clearForm()
                  //add image to gallery

                  this.addStudent(result.info)

                  console.log(
                    'new student added:',
                    JSON.stringify(this.allStudents)
                  )

                  // put new student in an array and send to populate
                  // TODO gallery
                  // populateGallery([result.info],true);
                } else {
                  console.log('Successful upload but no face!')
                  this.deleteNoFaceImage(result)
                }
              }
              if (result.event === 'done') {
                console.log('done event:', result.info)
              }
            } else {
              console.log('UW error event', error)
              // launch_toast(`Upload error: ${error}`, 'warn')
            }
          }
        )
        // toast("Successful face upload.", "info");
      } else {
        // toast("Duplicates not allowed", "warn");
      }
      this.uploadWidget.open()
    },
    isUnique: function() {
      console.log('allStudent', this.allStudents)
      const result = this.allStudents.filter(student => {
        return (
          student.context.custom.fname === this.fname &&
          student.context.custom.lname === this.lname &&
          student.context.custom.title === this.title &&
          student.context.custom.org === this.org
        )
      })
      return result.length === 0
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
