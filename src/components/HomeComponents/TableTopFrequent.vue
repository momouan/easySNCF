<template>
  <b-card title="TOP 50 des gares les plus fréquentes">
    <div class="overflow-auto" v-if="show">
      <b-table
        id="my-table"
        :items="items"
        :per-page="perPage"
        :fields="fields"
        :current-page="currentPage"
        small
      ></b-table>
      <b-pagination
        class="pagination"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      >
      </b-pagination>
    </div>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
      perPage: 5,
      currentPage: 1,
      items: [],
      fields: [
        { key: "Code UIC" },
        { key: "Nom gare" },
        { key: "Total voyageurs 2020", sortable: true },
        { key: "Total voyageurs 2019", sortable: true },
        { key: "Total voyageurs 2018", sortable: true },
        { key: "Total voyageurs 2017", sortable: true },
        { key: "Total voyageurs 2016", sortable: true },
        { key: "Total voyageurs 2015", sortable: true },
      ],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
    ...mapGetters(["getTopFrequentGares"]),
  },
  methods: {
    ...mapActions(["rechercheTopFrequentGares"]),
    getYear(params) {
      let year = "";
      switch (params) {
        case "2020":
          year = "total_voyageurs_non_voyageurs_2020";
          break;
        case "2019":
          year = "total_voyageurs_non_voyageurs_2019";
          break;
        case "2018":
          year = "total_voyageurs_non_voyageurs_2018";
          break;
        case "2017":
          year = "total_voyageurs_non_voyageurs_2017";
          break;
        case "2016":
          year = "total_voyageurs_non_voyageurs_2016";
          break;
        case "2015":
          year = "total_voyageurs_non_voyageurs_2015";
          break;
        default:
          year = "total_voyageurs_non_voyageurs_2015";
      }
      return year;
    },
  },
  async created() {
    this.show = false;
    let year = this.getYear("2020");
    let tab = [];
    await this.rechercheTopFrequentGares(year);
    this.getTopFrequentGares.forEach((gare) => {
      let r = {
        "Code UIC": gare.fields.code_uic_complet,
        "Nom gare": gare.fields.nom_gare,
        "Total voyageurs 2020": gare.fields.total_voyageurs_non_voyageurs_2020,
        "Total voyageurs 2019": gare.fields.total_voyageurs_non_voyageurs_2019,
        "Total voyageurs 2018": gare.fields.total_voyageurs_non_voyageurs_2018,
        "Total voyageurs 2017": gare.fields.total_voyageurs_non_voyageurs_2017,
        "Total voyageurs 2016": gare.fields.total_voyageurs_non_voyageurs_2016,
        "Total voyageurs 2015": gare.fields.total_voyageurs_non_voyageurs_2015,
      };
      tab.push(r);
    });
    this.items = tab;
    this.show = true;
  },
};
</script>

<style scoped>
.pagination {
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
}

.page-item.active .page-link {
  background-color: red !important;
  border-color: red !important;
}
</style>