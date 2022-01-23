<template>
  <div class="home">
    <b-container class="bv-example-row" style="padding: 20px">
      <h2>État général de la SNCF</h2>
      <TableTopFrequent />
      <br>
      <TableTopConforme />
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
//import Recherche from '@/components/Recherche.vue'
import TableTopFrequent from "@/components/HomeComponents/TableTopFrequent";
import TableTopConforme from "@/components/HomeComponents/TableTopConforme.vue";
export default {
  name: "Home",
  components: {
    TableTopFrequent,
    TableTopConforme,
  },
};
</script>

<style scoped>
</style>
