<template>
  <b-container class="bv-example-row" style="padding: 20px">
    <div id="chart" v-if="show">
      <apexchart
        type="line"
        height="600"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "FrequentationGares",
  data: function () {
    return {
      show: false,
      series: [
        {
          name: "Total voyageurs et non voyageurs",
          type: "column",
          data: null,
        },
        {
          name: "Total voyageurs",
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
          text: "Fréquentation en gare",
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },
        labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
        yaxis: [
          {
            title: {
              text: "Nombre de personnes",
            },
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["rechercheFrequentationGare"]),
  },
  computed: {
    ...mapGetters(["getFrGare"]),
  },
  async created() {
    this.show = false;
    let id = this.$route.params.id.substring(2);
    await this.rechercheFrequentationGare(id);
    let ttvoyageurs = [];
    let ttvoyageurEtNonvVoyageurs = [];
    ttvoyageurs.push(this.getFrGare[0].fields.total_voyageurs_2015);
    ttvoyageurs.push(this.getFrGare[0].fields.total_voyageurs_2016);
    ttvoyageurs.push(this.getFrGare[0].fields.totalvoyageurs2017);
    ttvoyageurs.push(this.getFrGare[0].fields.total_voyageurs_2018);
    ttvoyageurs.push(this.getFrGare[0].fields.total_voyageurs_2019);
    ttvoyageurs.push(this.getFrGare[0].fields.total_voyageurs_2020);

    ttvoyageurEtNonvVoyageurs.push(
      this.getFrGare[0].fields.total_voyageurs_non_voyageurs_2015
    );
    ttvoyageurEtNonvVoyageurs.push(
      this.getFrGare[0].fields.total_voyageurs_non_voyageurs_2016
    );
    ttvoyageurEtNonvVoyageurs.push(
      this.getFrGare[0].fields.total_voyageurs_non_voyageurs_2017
    );
    ttvoyageurEtNonvVoyageurs.push(
      this.getFrGare[0].fields.total_voyageurs_non_voyageurs_2018
    );
    ttvoyageurEtNonvVoyageurs.push(
      this.getFrGare[0].fields.total_voyageurs_non_voyageurs_2019
    );
    ttvoyageurEtNonvVoyageurs.push(
      this.getFrGare[0].fields.total_voyageurs_non_voyageurs_2020
    );

    this.series[1].data = ttvoyageurs;
    this.series[0].data = ttvoyageurEtNonvVoyageurs;
    this.show = true;
  },
};
</script>