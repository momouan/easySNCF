<template>
  <div class="about" v-if="show">
    <h3>Services proposés</h3>

    <b-container class="bv-example-row">
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
      <b-row v-if="nbTotal > 0">
        <b-col cols="12" md="6" v-if="nbBabyFoot > 0"
          ><img src="../../assets/babyfoot.png" alt="baby foot" v-b-tooltip.html title="Baby-foot"
        /></b-col>
        <b-col cols="12" md="6" v-if="nbPowerStation > 0"
          ><img src="../../assets/charging.png" alt="power station" v-b-tooltip.html title="Prise électrique"
        /></b-col>
        <b-col cols="12" md="6" v-if="nbPiano > 0"
          ><img src="../../assets/piano.png" alt="piano" v-b-tooltip.html title="Piano"
        /></b-col>
        <b-col cols="12" md="6" v-if="nbDHistoires > 0"
          ><img
            src="../../assets/histoires.png"
            alt="Distribution histoires courtes" v-b-tooltip.html title="Distributeur d'histoires courtes"
        /></b-col>
      </b-row>
      <p v-else>Aucun service disponible</p>
    </b-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
      nbPiano: null,
      nbBabyFoot: null,
      nbPowerStation: null,
      nbDHistoires: null,
      nbTotal: 0,
    };
  },
  props: {},
  computed: {
    ...mapGetters(["getServices"]),
  },
  methods: {
    ...mapActions(["rechercheServicesAttente"]),
  },
  async mounted() {
    //console.log(this.$route.params.id); // should work
    await this.rechercheServicesAttente(this.$route.params.id);
    if(this.getServices[0]!=null){
    this.nbPiano = parseInt(this.getServices[0].fields.piano);
    this.nbBabyFoot = parseInt(this.getServices[0].fields.baby_foot);
    this.nbPowerStation = parseInt(this.getServices[0].fields.power_station);
    this.nbDHistoires = parseInt(this.getServices[0].fields.distr_histoires_courtes);
    this.nbTotal = parseInt(this.getServices[0].fields.total);
    }
    this.show = true;
  },
};
</script>

<style scoped>
img {
  width: 50px;
  margin-top: 10px;
}
</style>
