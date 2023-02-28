<template>
  <h1>Singly Season Hits</h1>
  <DataTable
    :fields="fields"
    :data="singleHitsData"
    @sort-by-field="sortByField"
  />
</template>

<script>
import axios from 'axios';
import DataTable from './components/DataTable.vue';

import { fields as defaultFields } from './fields';

const sortingMethods = {
  asc: (fieldName) => (a, b) => {
    if (a[fieldName] === '' || a[fieldName] === null) return -1;
    if (b[fieldName] === '' || b[fieldName] === null) return 1;
    if (a[fieldName] === b[fieldName]) return 0;
    return Number(a[fieldName]) > Number(b[fieldName]) ? -1 : 1;
  },
  desc: (fieldName) => (a, b) => {
    if (a[fieldName] === '' || a[fieldName] === null) return 1;
    if (b[fieldName] === '' || b[fieldName] === null) return -1;
    if (a[fieldName] === b[fieldName]) return 0;
    return Number(a[fieldName]) < Number(b[fieldName]) ? -1 : 1;
  },
};

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
  methods: {
    sortByField(fieldName) {
      const field = this.fields[fieldName];
      if (field.sort) {
        let sortingFn = (a, b) => a.id - b.id;
        switch (field.sort) {
          case 'normal':
            sortingFn = sortingMethods.asc(fieldName);
            field.sort = 'asc';
            break;
          case 'asc':
            sortingFn = sortingMethods.desc(fieldName);
            field.sort = 'desc';
            break;
          default:
            field.sort = 'normal';
        }

        this.singleHitsData.sort(sortingFn);

        for (const fieldKey in this.fields) {
          if (fieldKey !== fieldName && this.fields[fieldKey].sort) {
            this.fields[fieldKey].sort = 'normal';
          }
        }
      }
    },
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
