import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'



Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    liste: null,
    res: null,
    gare: null,
    services: null,
    objTrouves: null,
    objDeclare: null,
    garesTotal: null,
    frGare: null,
    propreteGare: null,
    topFrequentGares: null,
    topConformesGares: null,
  },
  mutations: {
    setListe(state, liste) {
      state.liste = liste;
    },
    setRes(state, res) {
      state.res = res;
    },
    setGare(state, gare) {
      state.gare = gare;
    },
    setServices(state, services) {
      state.services = services;
    },
    setObjTrouves(state, objTrouves) {
      state.objTrouves = objTrouves
    },
    setObjDeclare(state, objDeclare) {
      state.objDeclare = objDeclare
    },
    setGaresTotal(state, garesTotal) {
      state.garesTotal = garesTotal
    },
    setFrGare(state, frGare) {
      state.frGare = frGare
    },
    setPropreteGare(state, propreteGare) {
      state.propreteGare = propreteGare
    },
    setTopFrequentGares(state, topFrequentGares) {
      state.topFrequentGares = topFrequentGares
    },
    setTopConformesGares(state, topConformesGares) {
      state.topConformesGares = topConformesGares
    }
  },
  actions: {
    async Liste({ commit }, params) {
      await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=gares-pianos&q=&start=1&sort=total&facet=gare&rows=' + params)
        .then(response => {
          commit('setListe', response.data.records)
        })
    },
    async recherche({ commit }, params) {
      await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=' + params + '&rows=100')
        .then(response => {
          commit('setRes', response.data.records)
        })
    },
    async rechercheAllGares({ commit }) {
      await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=&rows=2874&sort=gare_alias_libelle_noncontraint')
        .then(response => {
          commit('setGaresTotal', response.data.records)
        })
    },
    async rechercheGare({ commit }, params) {
      await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&refine.uic_code=' + params)
        .then(response => {
          commit('setGare', response.data.records)
        })
    },
    async rechercheServicesAttente({ commit }, params) {
      await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=gares-pianos&sort=gare&refine.uic=' + params)
        .then(response => {
          commit('setServices', response.data.records)
        })
    },
    async rechercheObjetsTrouves({ commit }, params) {
      await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=objets-trouves-restitution&q=&sort=date&facet=gc_obo_nature_c&facet=gc_obo_date_heure_restitution_c&refine.gc_obo_gare_origine_r_code_uic_c=' + params)
        .then(response => {
          commit('setObjTrouves', response.data)
        })
    },
    async rechercheObjetsDeclare({ commit }, params) {
      await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=objets-trouves-gares&q=&sort=date&refine.gc_obo_gare_origine_r_code_uic_c=' + params)
        .then(response => {
          commit('setObjDeclare', response.data.facet_groups)
        })
    },
    async rechercheFrequentationGare({ commit }, params) {
      await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=frequentation-gares&q=&sort=total_voyageurs_2020&refine.code_uic_complet=' + params)
        .then(response => {
          commit('setFrGare', response.data.records)
        })
    },
    async recherchepropreteGare({ commit }, params) {
      await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=proprete-en-gare&q=&sort=mois&facet=mois&facet=nom_gare&refine.uic=' + params)
        .then(response => {
          commit('setPropreteGare', response.data)
        })
    },
    async rechercheTopFrequentGares({ commit }, params) {
      await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=frequentation-gares&q=&rows=50&sort=' + params)
        .then(response => {
          commit('setTopFrequentGares', response.data.records)
        })
    },
    async rechercheTopConformesGares({ commit }, params) {
      await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=proprete-en-gare&q=&rows=50&sort=taux_de_conformite&facet=mois&facet=nom_gare&refine.mois=' + params)
        .then(response => {
          commit('setTopConformesGares', response.data.records)
        })
    },

  },
  modules: {
  },
  getters: {
    liste: state => state.liste,
    res: state => state.res,
    getGare: state => state.gare,
    getServices: state => state.services,
    getObjTrouves: state => state.objTrouves,
    getObjDeclare: state => state.objDeclare,
    getGaresTotal: state => state.garesTotal,
    getFrGare: state => state.frGare,
    getPropreteGare: state => state.propreteGare,
    getTopFrequentGares: state => state.topFrequentGares,
    getTopConformesGares: state => state.topConformesGares,
  }
})
