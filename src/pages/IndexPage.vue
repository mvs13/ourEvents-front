<template>
  <q-page padding>
    <h2>{{ pageTitle }} {{ actualEventList.length }} events</h2>
    <!-- <p>{{ actualEventList.length }}</p> -->
    <div v-if="loadingGetAllActualEvents" class="row">
      <div class="col-6">Loading...</div>
      <div class="col-6">
        <q-circular-progress
          indeterminate
          size="60px"
          :thickness="0.2"
          color="secondary"
          center-color="primary"
          track-color="transparent"
          class="q-ma-md"
        />
      </div>
    </div>
    <div v-else-if="errorGetAllActualEvents" class="row">
      <div class="col-6">Error: {{ errorGetAllActualEvents }}</div>
    </div>
    <div v-else-if="actualEventList">
      <!-- <div class="events__serach__container">
        <q-expansion-item
          icon="fa-solid fa-arrow-up-wide-short"
          expand-icon="fa-solid fa-angles-down"
          expanded-icon="fa-solid fa-angles-up"
          label="Tools"
          caption="filtering, searching and sorting"
        >
          <q-card>
            <q-card-section>
              <q-select
                v-if="eventType"
                clearable
                filled
                v-model="selectedEventType"
                :options="eventType"
                label="Event Type"
                @clear="occuredClear()"
                @update:model-value="occuredUpdate()"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div> -->
      <div
        v-if="actualEventList.length"
        class="events__list__container q-gutter-sm row wrap justify-center items-start content-stretch"
      >
        <!-- <h3
          v-if="this.getSelectedType() && !eventsListByType.length"
          class="no__events__msg"
        >
          There are no such events in the calendar yet. Come back later.
        </h3> -->
        <EventCard
          v-for="event in actualEventList"
          :key="event.id"
          :eventData="event"
          class="col-xs-12 col-sm-6 col-md-4 col-2"
        />
      </div>
      <!-- <h3 v-else class="no__events__msg">
        We don't have any planned events yet
      </h3> -->
    </div>
  </q-page>
</template>

<script>
import { ref, watch, computed, defineComponent } from "vue";
import requestor from "src/conf/axiosCfg";
import EventCard from "components/EventCard.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    EventCard,
  },
  setup() {
    let actualEventList = ref([]);
    return {
      pageTitle: "We are glad to offer you",
      actualEventList,
      errorGetAllActualEvents: undefined,
      loadingGetAllActualEvents: true,
    };
  },
  mounted() {
    console.log(`has Mounted`);
    this.getAllActualEvents();
  },
  methods: {
    async getAllActualEvents() {
      const result = await requestor.get("events/allActual", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result.status);
      if (result.status >= 200 && result.status < 300) {
        this.actualEventList = result.data;
        console.log(this.actualEventList);
      } else {
        this.errorGetAllActualEvents = result.error;
      }
      this.loadingGetAllActualEvents = false;
    },
  },
});
</script>
