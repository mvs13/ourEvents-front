<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="
            leftDrawerOpen
              ? 'fa-solid fa-angles-left'
              : 'fa-solid fa-angles-right'
          "
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ appTitle }}
        </q-toolbar-title>

        <div>Today is {{ todaysDate }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-secondary footer">
      <q-toolbar>
        <q-avatar>
          <!-- <img src="~assets/mvs013.svg" /> -->
        </q-avatar>
        <q-toolbar-title>
          {{ mainSlogan }}
        </q-toolbar-title>
      </q-toolbar>
      <div class="quasar__ver">Dev on Quasar {{ $q.version }}</div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { date } from "quasar";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",
    caption: "Go to site root",
    icon: "fa-solid fa-house",
    link: "/",
  },

  {
    title: "Account",
    caption: "User's personal account",
    icon: "fa-solid fa-user",
    link: "/account",
  },
  {
    title: "User`s Events",
    caption: "Are you planning to take part in such events",
    icon: "fa-solid fa-calendar",
    link: "/users-events",
  },
  {
    title: "Sign In",
    caption: "For registered users",
    icon: "fa-solid fa-right-to-bracket",
    link: "/sign-in",
  },
  {
    title: "Sign Up",
    caption: "For new users",
    icon: "fa-solid fa-user-plus",
    link: "/sign-up",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      appTitle: "Our Events",
      mainSlogan: "",
    };
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd - DD.MMMM.YYYY - HH:mm");
    },
  },
});
</script>

<style>
.footer {
  display: flex;
}
</style>
