<template>
  <q-card class="event__card" flat bordered>
    <q-card-section horizontal class="q-pa-sm">
      <div class="event__date q-mr-sm">
        <q-icon color="accent" name="fa-solid fa-calendar-day" />
        <span>{{ eventData.dateStart }}</span>
      </div>
      <div class="event_time" v-if="eventData.timeStart">
        <q-icon color="accent" name="fa-solid fa-clock" />
        <span>{{ eventData.timeStart }}</span>
      </div>
    </q-card-section>
    <!-- <q-img :src="getImgPath(eventData)" :alt="eventData.title" /> -->
    <q-card-section class="q-pt-xs">
      <div class="event__category__name">
        {{ eventData.category.name }}
      </div>
    </q-card-section>
    <q-card-section
      horizontal
      class="flex items-center justify-between q-pa-sm"
    >
      <div class="text-h5 q-mt-sm q-mb-xs">
        {{ eventData.title }}
      </div>
      <div
        :id="`event__card__${eventData.id}`"
        class="event__descr"
        v-if="eventData.descr"
      >
        <q-btn
          color="accent"
          round
          flat
          style="bg-secondary"
          icon="fa-solid fa-angle-down"
          @click="expandEvent(eventData.id)"
        />
      </div>
    </q-card-section>
    <q-slide-transition>
      <div :id="eventData.id" style="display: none">
        <q-separator />
        <q-card-section class="text-subitle2">
          {{ eventData.descr }}
        </q-card-section>
        <q-separator />
      </div>
    </q-slide-transition>
    <q-card-actions>
      <q-btn
        v-if="eventData.url"
        :href="eventData.url"
        target="_blank"
        flat
        color="secondary"
        class="bg-accent"
        icon="fa-solid fa-arrow-up-right-from-square"
        label="External link"
      />
      <q-btn
        :loading="isProcessUserEvent(eventData.id)"
        flat
        color="secondary"
        class="bg-accent"
        icon="fa-regular fa-calendar-plus"
        label="Attend"
        @click="eventAttend(eventData.id)"
      >
        <template v-slot:loading> Processing... </template>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { activeUserStore } from "src/stores/activeUser";

export default {
  name: "EventCard",
  props: {
    eventData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup() {
    const userStore = activeUserStore();

    return { userStore };
  },
  methods: {
    getImgPath(event) {
      return "img/" + (event.kdpv ? event.kdpv : event.category.def_image);
    },

    async eventAttend(event_id) {
      if (this.userStore.accessToken !== 0) {
        this.$q.notify({
          type: "info",
          message: "You alredy login",
          icon: "fa-regular fa-user-check",
        });
      } else {
        this.$q.notify({
          type: "warning",
          message: "You must be login",
          icon: "fa-regular fa-right-to-bracket",
        });
      }

      // console.log("eventAttend: " + event_id);
    },

    async isUserEventExist() {},

    isProcessUserEvent(event) {
      return false;
    },

    async addUserEvent() {},

    expandEvent(event_id) {
      const operateBlock = document.getElementById(event_id);
      if (operateBlock.style.display == "none") {
        operateBlock.style.display = "block";
      } else {
        operateBlock.style.display = "none";
      }
      const btnBlock = document.getElementById(`event__card__${event_id}`);
      btnBlock.childNodes[0].childNodes[1].childNodes[0].classList.toggle(
        "fa-angle-up"
      );
      btnBlock.childNodes[0].childNodes[1].childNodes[0].classList.toggle(
        "fa-angle-down"
      );
      // console.log(
      //   "expandEvent: " + event_id + ", state: " + operateBlock.visible
      // );
      // console.log(`btnBlock: ${btnBlock.childNodes[0].childNodes[1].classList}`);
      // console.log();
    },
    isExpanded(event_id) {
      return true;
    },
  },
};
</script>

<style lang="scss">
.event__date,
event__time {
  display: flex;
}
</style>
