<template>
  <q-page padding>
    <h3>User's personal account</h3>
    <div class="q-pa-md">
      <q-btn-group spread>
        <q-btn
          color="secondary"
          text-color="accent"
          label="Login"
          icon="fa-solid fa-right-to-bracket"
          @click="singinAction()"
        />
        <q-btn
          color="secondary"
          text-color="accent"
          label="Logout"
          icon="fa-solid fa-right-from-bracket"
          @click="singoutAction()"
        />
        <q-btn
          color="secondary"
          text-color="accent"
          label="Register"
          icon="fa-solid fa-user-plus"
          @click="singupAction()"
        />
        <q-btn
          color="secondary"
          text-color="accent"
          label="Check User"
          icon="fa-solid fa-user-check"
          @click="checkAction()"
        />
      </q-btn-group>
    </div>
    <div v-if="userStore.id !== 0">
      <div>firstName: {{ firstName }}</div>
    </div>
    <div id="account__profile"></div>
    <q-dialog v-model="loginDlg">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Login, please</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-form
          id="login-form"
          @submit="onSubmitLogin"
          @reset="onResetLogin"
          class="q-gutter-md"
        >
          <q-card-section>
            <q-input v-model="email" filled type="email" hint="Email" />
            <q-input
              v-model="password"
              filled
              type="password"
              hint="Password"
            />
          </q-card-section>
          <q-card-section>
            <q-btn label="Login" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, computed, defineComponent } from "vue";
import { activeUserStore } from "src/stores/activeUser";
import requestor from "src/conf/axiosCfg";

export default defineComponent({
  name: "AccountPage",
  setup() {
    const userStore = activeUserStore();

    return {
      userStore,
      loginDlg: ref(false),
      email: ref(""),
      password: ref(""),
      firstName: ref(""),
    };
  },
  methods: {
    singoutAction() {},
    singinAction() {
      this.loginDlg = true;
    },
    async onSubmitLogin() {
      const result = await requestor.post(
        "auth/login",
        { email: this.email, password: this.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.loginDlg = false;
      if (result.status === 201) {
        this.userStore.accessToken = result.data.access_token;
        this.userStore.id = result.data.user_id;
      }
    },
    onResetLogin() {
      this.email = "";
      this.password = "";
      this.loginDlg = false;
    },
    singupAction() {},
    async checkAction() {
      if (this.userStore.id !== 0) {
        const answer = await this.getUserInfo(this.userStore.id);
      } else {
        this.$q.notify({
          type: "warning",
          message: "You must be login",
          icon: "fa-regular fa-right-to-bracket",
        });
      }
    },
    async getUserInfo(id) {
      const result = await requestor.get("users", {
        params: { id: id },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.status >= 200 && result.status < 300) {
        this.firstName = result.data[0].firstName;
        return true;
      } else {
        return false;
      }
    },
  },
});
</script>

<style></style>
