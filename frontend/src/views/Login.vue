<template>
  <section class="h-100 gradient-form" style="background-color: #eee;">
    <div v-if="!logout" class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">
                  <div class="text-center">
                    <img
                      src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/lotus.png"
                      style="width: 185px;"
                      alt="logo"
                    />
                    <h4 class="mt-1 mb-8 pb-1">Sing Dich Frei</h4>
                  </div>

                  <form>
                    <p>Bitte logge dich ein um Lieder vorzuschlagen oder Vorschläge zu sehen</p>

                    <div class="form-outline mb-4">
                      <input
                        type="email"
                        id="form2Example11"
                        autocomplete="username"
                        class="form-control"
                        placeholder="E-Mail Adresse"
                        v-model="user"
                      />
                      <label class="form-label" for="form2Example11">E-Mail</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        type="password"
                        id="form2Example22"
                        autocomplete="current-password"
                        class="form-control"
                        v-model="password"
                      />
                      <label class="form-label" for="form2Example22">Passwort</label>
                    </div>

                    <div class="text-center pt-1 mb-5 pb-1">
                      <button
                        class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                        type="button"
                        @click="login"
                      >Los gehts!</button>
                      <a class="text-muted" href="#!">Passwort vergessen?</a>
                    </div>

                    <div class="d-flex align-items-center justify-content-center pb-4">
                      <p class="mb-0 me-2">Du bist zum ersten Mal hier?</p>
                      <button type="button" class="btn btn-outline-danger">Neu anmelden</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from "@/lib/api.js";

export default {
  components: {},
  data() {
    return {
      user: "mmamsch@googlemail.com",
      password: "!QAY2wsx"
    };
  },
  mounted() {
      this.doLogout(); 
  },
  activated() {
    this.doLogout(); 
  },
  watch: {
    logout() { this.doLogout(); }
  },
  methods: {
    login() {
      api
        .login(this.user, this.password)
        .then(() => {
          const target = this.$route?.query?.goto || "Home";
          this.$router.push({ name: target });
        })
        .catch(() => {
          alert("Einloggen fehlgeschlagen. Bitte überprüfe Benutzername und Passwort!");
        });
    },

    doLogout() {
      console.log("Doing logout!")
      if (this.logout) {
        api.logout();
        this.$router.push({name: "Home"})
      }
    }
  },
  name: "LoginPage",
  props: { logout: Boolean }
};
</script>

<style scoped>
</style>