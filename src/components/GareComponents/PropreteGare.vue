<template>
  <b-container class="bv-example-row" style="padding: 20px">
    <b-overlay
      :show="!ok"
      spinner-variant="success"
      spinner-type="grow"
      spinner-small
      rounded="lg"
      opacity="1"
    >
      <div id="chart" v-if="show">
        <apexchart
          type="line"
          height="600"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </b-overlay>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PropreteGares",
  data: function () {
    return {
      show: false,
      ok:false,
      series: [
        {
          name: "Taux de conformite",
          type: "column",
          data: null,
        },
        {
          name: "Taux de conformite moyen",
          type: "line",
          data: null,
        },
      ],
      chartOptions: {
        colors: ["#a6a4a6", "#1ec263"],
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: [0, 4],
        },
        title: {
          text: "Contrôles de propreté en gare",
        },

        labels: null,
        yaxis: [
          {
            title: {
              text: "Pourentage",
            },
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["recherchepropreteGare"]),
  },
  computed: {
    ...mapGetters(["getPropreteGare"]),
  },
  async created() {
    this.show = false;
    this.ok= false;
    let id = this.$route.params.id;
    let dates = [];
    let taux = [];
    let total = 0;
    let count = 0;
    await this.recherchepropreteGare(id);
    if (this.getPropreteGare.nhits !=0) {
      this.getPropreteGare.records.forEach((elt) => {
        console.log(elt);
        dates.push(elt.fields.mois);
        taux.push(elt.fields.taux_de_conformite);
        total += elt.fields.taux_de_conformite;
        count++;
      });

      this.chartOptions.labels = dates;
      this.series[0].data = taux;

      let meanTable = [];

      for (let index = 0; index < count; index++) {
        meanTable.push(total / count);
      }

      this.series[1].data = meanTable;

      this.show = true;
    }
    this.ok=true;
  },
};
</script>