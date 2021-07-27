<template>
  <Termin :value="nextMeeting" />
</template>

<script>


import Termin from "@/components/Termin.vue";
import api from '@/lib/api.js';

export default {
  components: { Termin },
  name: "HomePage",
  props: {},
  data() {
    return {
      nextMeeting: null, 
    }
  },
  async mounted() {
    this.nextMeeting = await api.getNextMeeting(); 
  } 
};
</script>

<style scoped>
</style>