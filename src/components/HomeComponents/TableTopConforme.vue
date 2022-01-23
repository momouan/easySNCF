<template>
  <b-card title="TOP 50 des gares les plus conformes">
    <b-form-select
      v-model="selected"
      :options="options"
      style="margin-bottom: 30px"
      @change="loadData()"
    ></b-form-select>
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
      ></b-pagination>
    </div>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
      selected: "2021/05",
      options: [
        { value: "2021/05", text: "Mai 2021" },
        { value: "2021/04", text: "Avril 2021" },
        { value: "2021/03", text: "Mars 2021" },
        { value: "2021/02", text: "Février 2021" },
        { value: "2021/01", text: "Janvier 2021" },
        { value: "2020/12", text: "Dec. 2020" },
        { value: "2020/11", text: "Nov. 2020" },
        { value: "2020/10", text: "Oct. 2020" },
        { value: "2020/09", text: "Sep. 2020" },
        { value: "2020/08", text: "Aout 2020" },
        { value: "2020/07", text: "Juillet 2020" },
        { value: "2020/06", text: "Juin 2020" },
        { value: "2020/05", text: "Mai 2020" },
        { value: "2020/04", text: "Avril 2020" },
        { value: "2020/03", text: "Mars 2020" },
        { value: "2020/02", text: "Février 2020" },
        { value: "2020/01", text: "Janvier 2020" },
      ],
      perPage: 5,
      currentPage: 1,
      items: [],
      fields: [
        { key: "Code UIC" },
        { key: "Nom gare" },
        { key: "Taux de conformité", sortable: true },
      ],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
    ...mapGetters(["getTopConformesGares"]),
  },
  methods: {
    ...mapActions(["rechercheTopConformesGares"]),
    async loadData() {
      this.show = false;
      await this.rechercheTopConformesGares(this.selected);
      let tab = [];
      this.getTopConformesGares.forEach((gare) => {
        let r = {
          "Code UIC": gare.fields.uic,
          "Nom gare": gare.fields.nom_gare,
          "Taux de conformité": gare.fields.taux_de_conformite,
        };
        tab.push(r);
      });
      this.items = tab;
      this.show = true;
    },
  },
  async created() {
    await this.loadData();
  },
};
</script>

<style scoped>
.pagination {
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
}
</style>