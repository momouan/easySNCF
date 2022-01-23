<template>
  <b-card style="width: 100%; height: 100%" class="border-0">
    <div
      class="about"
      v-if="show"
      style="background-color: #f9f9f9; border-radius: 5em"
    >
      <b-row>
        <b-col cols="12" md="9">
          <b-row>
            <b-col cols="12" md="4"
              ><p class="stat1" v-b-tooltip.html title="Total Objets trouvés">
                {{ totalTrouve }}
              </p>
              <p class="txt">Total Objets trouvés</p></b-col
            >
            <b-col cols="12" md="4"
              ><p class="stat2" v-b-tooltip.html title="Total Objets restitués">
                {{ totalRestitues }}
              </p>
              <p class="txt">Total Objets restitués</p></b-col
            >
            <b-col cols="12" md="4"
              ><p class="stat3" v-b-tooltip.html title="Pourcentage des objets restitués">
                {{ ((totalRestitues/totalTrouve)*100).toFixed(2) }} %
              </p>
              <p class="txt">Pourcentage des objets restitués</p></b-col
            >
          </b-row>
        </b-col>
        <b-col cols="12" md="3">
          <div id="chart">
            <apexchart
              type="donut"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
          <p>Objets trouvés</p>
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
      nbObjTrouve: null,
      totalTrouve: null,
      totalRestitues: null,

      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: "donut",
        },
        labels: [],
        colors:["#861f73","#c9194e","#ff000a"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                show: false,
              },
            },
          },
        ],
        legend: {
          show: false,
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: false,
            },
          },
        },
      },
    };
  },
  components: {
    apexchart: VueApexCharts,
  },
  props: {},
  computed: {
    ...mapGetters(["getObjTrouves"]),
  },
  methods: {
    ...mapActions(["rechercheObjetsTrouves"]),
  },
  async mounted() {
    this.show=false;
    await this.rechercheObjetsTrouves(this.$route.params.id);
    //await this.rechercheObjetsDeclare(this.$route.params.id);
    this.totalTrouve = this.getObjTrouves.nhits;
    if (this.getObjTrouves.facet_groups != null) {
      this.getObjTrouves.facet_groups[0].facets.forEach((obj) => {
        this.chartOptions.labels.push(obj.name);
        this.series.push(obj.count);
      });
      let count = 0;
      this.getObjTrouves.facet_groups[1].facets.forEach((elt) => {
        count += elt.count;
      });

      this.totalRestitues = count;
      this.show = true;
    }
  },
};
</script>
<style scoped>
.stat1 {
  margin-top: 50px;
  color: red;
  font-size: 50px;
}
.stat2 {
  margin-top: 50px;
  color: #00c45f;
  font-size: 50px;
}
.stat3 {
  margin-top: 50px;
  color: darkmagenta;
  font-size: 50px;
}
.txt {
  margin-top: -30px;
}
</style>


