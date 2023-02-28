<template>
  <header class="header">
    <h1>Singly Season Hits</h1>
  </header>

  <div class="content-wrapper">
    <section class="data-table-container">
      <DataTable
        :fields="fields"
        :data="singleHitsData"
        @sort-by-field="sortByField"
        @change-filter="updateFilter"
        @activate-filter="activateFilter"
        @item-selected="selectItem"
      />
    </section>
    <aside class="details-container">
      <DetailsComponent :data="selectedItem" />
    </aside>
  </div>
</template>

<script>
import axios from 'axios';
import DataTable from './components/DataTable/DataTable.vue';
import DetailsComponent from './components/Details/Details.vue';

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
    DetailsComponent,
  },
  data() {
    return {
      singleHitsData: [],
      fields: { ...defaultFields },
      selectedItem: {},
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
    updateFilter({ fieldName, newValue }) {
      const field = this.fields[fieldName];
      if (field?.filter) {
        field.filter.value = newValue;
      }
    },
    activateFilter({ fieldName, active }) {
      const field = this.fields[fieldName];
      if (field?.filter) {
        field.filter.active = active;
      }
    },
    selectItem(itemId) {
      this.selectedItem = this.singleHitsData.filter(
        (row) => row.id === itemId
      )[0];
    },
  },
};
</script>

<style>
#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}

.header {
  height: 10%;
  background-color: #a64327;
}

.content-wrapper {
  width: 100%;
  height: 80%;
  padding: 10px;
  display: flex;
  flex-direction: row;
}

.data-table-container {
  width: 45%;
  height: 100%;
  max-height: 100%;
  overflow-y: hidden;
}

.details-container {
  width: 55%;
  margin-left: 10px;
}
</style>
