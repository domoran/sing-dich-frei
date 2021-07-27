<template>
  <div class="termin card" v-if="value">
    <div class="card-body">
      <dl class="row">
        <dt class="col-sm-3">Zeit</dt>
        <dd class="col-sm-9">{{meetingDate}}</dd>

        <dt class="col-sm-3">Ort</dt>
        <dd class="col-sm-9">{{value.Ort}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
// var options = {
//     weekday: "short",
//     year: "numeric",
//     month: "2-digit",
//     day: "numeric"
// };

export default {
  name: "Termin",
  props: {
    value: Object
  },
  computed: {
    meetingDate() {
      if (this.value) {
        const d = new Date(Date.parse(this.value.Zeit));
        console.log(d);
        return d.toLocaleDateString() + " " + d.toLocaleTimeString();
      } else {
        return "";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
