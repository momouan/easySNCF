<template>
  <div class="home">
    <b-row>
      <b-col cols="12" md="9"> <GareName/> </b-col>
      <b-col cols="12" md="3">
        <b-card class="carde">
          <GareComponent />
        </b-card>
      </b-col>
    </b-row>
    <StatObjets />
    <b-row>
      <b-col cols="12" md="6"> <PropreteGare/>  </b-col>
    <b-col cols="12" md="6"><FrequentationGares /></b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import GareComponent from "@/components/GareComponents/GareComponent.vue";

import StatObjets from "@/components/GareComponents/StatObjets.vue";
import GareName from "@/components/GareComponents/GareName.vue";
import FrequentationGares from "@/components/GareComponents/FrequentationGares.vue"
import PropreteGare from "@/components/GareComponents/PropreteGare.vue"

export default {
  name: "Gare",
  components: {
    GareComponent,
    StatObjets,
    GareName,
    FrequentationGares,
    PropreteGare,
  },
};
</script>

