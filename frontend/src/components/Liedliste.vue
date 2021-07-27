<template>
  <div class="lied-list">
    <ul>
      <li v-for="song in songs" :key="song.id">{{song.Titel}}</li>
    </ul>
  </div>
</template>

<script>
import api from "@/lib/api.js";

export default {
  name: "LiedListe",
  data() {
    return { 
      songs: [],
    }
  },
   mounted() {
    const self = this;

    api
      .getSongs()
      .then(songs => {
        self.songs = songs;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
