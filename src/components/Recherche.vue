<template>
  <b-container class="bv-example-row" style="padding: 20px">
    <div class="form-row">
      <div class="col-md-12">
        <div class="form-group input-group col-md-12">
          <b-form-input
            placeholder="Rechercher une gare"
            v-model="mot"
            @change="search(mot)"
            list="input-list"
            id="input-with-list"
            required
          ></b-form-input>
          <span class="input-group-append">
            <button
              class="btn btn-outline-secondary border-left-0 border"
              type="button"
            >
              <i class="fa fa-search"></i>
            </button>
          </span>
          <b-form-datalist id="input-list" :options="options"></b-form-datalist>
        </div>
      </div>
    </div>
    <b-row>
      <b-col cols="12" md="5">
        <b-card-body
          id="nav-scroller"
          ref="content"
          style="position: relative; height: 700px; overflow-y: scroll"
        >
          <a
            v-bind:href="'/gare/' + gare.fields.uic_code"
            v-for="(gare, index) in res"
            :key="index"
            @mouseover="
              center = [
                gare.fields.latitude_entreeprincipale_wgs84,
                gare.fields.longitude_entreeprincipale_wgs84,
              ];
              zoom = 13;
            "
          >
            <b-card
              v-bind:title="gare.fields.gare_alias_libelle_noncontraint"
              v-bind:sub-title="gare.fields.alias_libelle_noncontraint"
              class="carde"
            >
              <b-card-text>
                {{ gare.fields.commune_libellemin }}
              </b-card-text>

              <b-card-text>
                Département :
                {{ gare.fields.departement_libellemin }}
              </b-card-text>
            </b-card>
          </a>
        </b-card-body>
      </b-col>

      <b-col cols="12" md="7">
        <p v-if="loading">loading...</p>
        <l-map :zoom="zoom" :center="center" style="width: 100%" v-if="show">
          <l-tile-layer :url="url" :attribution="attribution" />
          <l-geo-json
            :geojson="geojson"
            :options="options2"
            :options-style="styleFunction"
          />
        </l-map>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";
export default {
  name: "Recherche",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  data: function () {
    return {
      show: false,
      loading: false,
      hover: false,
      mot: null,
      geojson: null,
      enableTooltip: true,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 6,
      center: [46, 2],
      options: [
        "Paris",
        "Marseille",
        "Lyon",
        "Toulouse",
        "Nice",
        "Nantes",
        "Montpellier",
        "Strasbourg",
        "Bordeaux",
        "Lille",
        "Rennes",
        "Reims",
        "Toulon",
        "Saint-Étienne",
        "Le Havre",
        "Grenoble",
        "Dijon",
        "Angers",
        "Villeurbanne",
        "Saint-Denis",
        "Nîmes",
        "Clermont-Ferrand",
        "Le Mans",
        "Aix-en-Provence",
        "Brest",
        "Tours",
        "Amiens",
        "Limoges",
        "Annecy",
        "Boulogne-Billancourt",
        "Perpignan",
        "Besançon",
        "Metz",
        "Orléans",
        "Saint-Denis",
        "Rouen",
        "Argenteuil",
        "Montreuil",
        "Mulhouse",
        "Caen",
        "Nancy",
        "Saint-Paul",
        "Roubaix",
        "Tourcoing",
        "Nanterre",
        "Vitry-sur-Seine",
        "Créteil",
        "Avignon",
        "Poitiers",
        "Aubervilliers",
      ],
    };
  },
  methods: {
    ...mapActions(["recherche"]),
    async search(mot) {
      this.loading = true;
      this.show = false;
      await this.recherche(mot);
      let json = [];
      this.center = [46, 2];
      this.zoom = 6;
      this.res.forEach((gare) => {
        let r = {
          type: "Feature",
          geometry: gare.geometry,
          properties: {
            name: gare.fields.gare_alias_libelle_noncontraint,
          },
        };
        json.push(r);
      });
      this.geojson = json;
      this.show = true;
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters(["res"]),
    options2() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        layer.bindTooltip(
          "<div> Gare : " + feature.properties.name + "</div>",
          { permanent: false, sticky: true }
        );
      };
    },
    styleFunction() {
      const fillColor = this.fillColor;
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1,
        };
      };
    },
  },
  async created() {},
};
</script>

<style scoped>
.carde {
  margin-bottom: 20px;
}
a {
  text-decoration: none;
  color: #424242;
}
.carde:hover {
  border-color: #424242;
  border-width: 3px;
}
</style>