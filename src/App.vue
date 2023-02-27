<template>
  <h1>Singly Season Hits</h1>
  <DataTable :fields="fields" :initialData="singleHitsData" />
</template>

<script>
import axios from 'axios';
import DataTable from './components/DataTable.vue';

import { fields as defaultFields } from './fields';

export default {
  name: 'App',
  components: {
    DataTable,
  },
  data() {
    return {
      tableName: 'Nome da tabela',
      singleHitsData: [],
      fields: { ...defaultFields },
    };
  },
  mounted() {
    axios
      .get('https://api.sampleapis.com/baseball/hitsSingleSeason')
      .then((response) => {
        this.singleHitsData = response.data;
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100vw;
  height: 100vh;
}
</style>
