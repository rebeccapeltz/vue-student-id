 
 <template>
  <article class="student-listing">
<div class="student-image">
  <a href="#"><img :width="width" :height="height" :src="student.url" :alt="student.fullname" /></a>
</div>
  </article>
</template>

<script>

export default {
  name: 'Article',
  props: ['student'],
  data: function(){
    return{
      width: 300,
      height: 400
    }
  }
}
</script>

<style scoped>
</style>