<template>
  <b-card
    v-if="show"
    :title="getGare[0].fields.gare_alias_libelle_noncontraint"
    style="width: 100%; height: 100%"
  >
    <b-card-text>
      {{ getGare[0].fields.commune_libellemin }}
    </b-card-text>
    <b-card-text> Département : {{getGare[0].fields.departement_libellemin}}</b-card-text>
    <!--  <h1>Paris Saint-lazare</h1> -->
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    ...mapActions(["rechercheGare"]),
  },
  computed: {
    ...mapGetters(["getGare"]),
  },
  async created() {
    await this.rechercheGare(this.$route.params.id);
    this.show = true;
  },
};
</script>

