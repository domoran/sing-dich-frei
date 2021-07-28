<template>
  <form class="termineditor" @submit.prevent="onSubmit" v-if="value">
    <div class="row">
      <div class="col-sm-8">
        <div class="form-group">
          <label for="title">Titel</label>
          <input
            type="string"
            class="form-control"
            id="title"
            aria-describedby="titleHelp"
            placeholder="Titel für das Treffen"
            v-model="title"
          />
        </div>
        <div class="form-group">
          <label for="beschreibung">Beschreibung</label>
          <textarea
            v-model="description"
            rows="7"
            class="form-control"
            id="beschreibung"
            placeholder="Beschreibung des Treffens"
          />
        </div>
        <div class="form-group">
          <label for="ort">Ort</label>
          <input
            type="text"
            v-model="location"
            rows="10"
            class="form-control"
            id="ort"
            placeholder="Ort"
          />
        </div>
      </div>
      <div class="col-sm-3">
        <div class="form-group">
          <v-date-picker v-model="date" mode="dateTime" :is24hr="true" ref="calendar" />
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary">Speichern</button>
  </form>
</template>

<script>
// import Datepicker from "vue3-datepicker";
import api from "@/lib/api.js";

export default {
  name: "TerminEditor",
  components: {},
  data() {
    return {
      title: null,
      description: null,
      location: null,
      date: null,
      modelConfig: {
        type: "string"
      }
    };
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateEditor() {
      this.title = this.value.Titel;
      this.description = this.value.Beschreibung;
      this.location = this.value.Ort;
      this.date = this.value.Zeit;
    },
    updateCalendar() {
      console.log("Hall", this.$refs.calendar);
      this.$refs.calendar?.move(new Date(Date.parse(this.date)));
    },
    onSubmit() {
      api
        .updateMeeting({
          id: this.value.id,
          Titel: this.title,
          Ort: this.location,
          Zeit: this.date,
          Beschreibung: this.description
        })
        .then(meeting => {
          console.log(meeting);
          this.$emit("update");
        });
    }
  },
  mounted() {
    this.updateEditor();
    this.updateCalendar();
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.updateEditor();
        this.updateCalendar();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .termineditor {
    margin-top: 2em; 
    margin-bottom: 2em;
  }
</style>
