<template>
  <div class="lied-liste">
    <ul>
        <li v-for="song in songs.items">
            Lied
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'LiedEditor',
  props: {
    songs: Object, 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
