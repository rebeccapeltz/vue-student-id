<template>
  <div class="banner">
    <div v-if="show" class= "top full">
      <p>
        This web page is to be used for instructional purposes. The data entered
        is stored as meta data with your image on the course's Cloudinary
        account. We ask that you don't share the link to this site publicly. You
        can remove your data from this page by supplying the first name and last
        name associated with your picture. This will open your email app and it
        will be forwarded to training for deletion.
      </p>
      <p>
        To delete your image and data from this page, provide first name and
        last name used to create Student id:
        <input type="text"  v-model="firstName" placeholder="First Name" />
        <input type="text" v-model="lastName" id="delete-lname" placeholder="Last name" />
        <a href="" v-on:click.stop.prevent="deleteEmail()" class="email-body">Delete</a>


      </p>
      <a class="close-msg" v-on:click="show=false" href="#">OK</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: ['cloudname'],
  data: function() {
    return {
      show: true,
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    deleteEmail: function() {
      let fname = this.firstName || 'first name not provided'
      let lname = this.lastName || 'last name not provided'
      let mailto = `mailto:support@cloudinary.com?subject=Remove me from Student ID Website&body=Delete ${fname} ${lname} from Student ID application for cloud ${this.cloudname}`
      window.open(mailto)
      // window.open(`mailto: /support@cloudinary.com?subject=Remove me from Student ID Website&body=${emailBody}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  font-family: 'Times New Roman', Times, serif;
  color: white;
  background-color: black;
  padding: 0 1rem;
  margin: 0 1rem;
  font-size: 0.9rem;
}
.banner div {
  background-color: black;
  padding: 1rem;
}
.banner .top {
  display: block;
  border-bottom: 2px solid #231f20;
  top: -350px;
  transition: top 0.5s;
}
.banner .top.show {
  display: block;
  top: 0;
  margin-top: 0px;
  transition: top 1s;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}
.banner.top.hide {
  display: none;
  top: 0;
  margin-top: 0px;
  transition: top 1s;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}
.banner.full {
  left: 0;
  margin: 0px;
  width: 100%;
}
.banner .close-msg {
  /* float: left; */
  margin: 15px;
  width: 100px;
  height: 40px;
  z-index: 100;
  background: #db8226;
  text-transform: uppercase;
  line-height: 28px;
  padding-top: 8px;
  display: inline-block;
  color: #fff;
  text-align: center;
  text-decoration: none;
}
a.email-body {
  display: inline-block;
  background: gray;
  color: #000;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  margin-left: 1rem;
}
a.email-body:hover {
  background: lightgray;
  cursor: pointer;
  transition: 0.3s ease-in;
}
</style>
