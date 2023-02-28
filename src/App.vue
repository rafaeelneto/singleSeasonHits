<template>
  <header class="header">
    <video
      id="background-video"
      autoplay
      loop
      muted
      poster="./assets/baseball_hit_footage_poster.jpg"
    >
      <source src="./assets/baseball_hit_footage.webm" type="video/mp4" />
    </video>
    <div class="text-container">
      <h1>Singly Season Hits</h1>
      <h2>List of Single-Season Leaders & Records for Hits</h2>
    </div>
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
  <footer>
    <h1>fadsfaf</h1>
    <h1>fadsfaf</h1>
    <h1>fadsfaf</h1>
    <h1>fadsfaf</h1>
    <h1>fadsfaf</h1>
    <h1>fadsfaf</h1>
    <h1>fadsfaf</h1>
    <h1>fadsfaf</h1>
    <h1>fadsfaf</h1>
  </footer>
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
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.header {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

#background-video {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.text-container {
  padding: 15px;
}

.header h1 {
  color: white;
  font-size: 42px;
  text-transform: uppercase;
  letter-spacing: 12px;
  font-family: Chivo;
  font-weight: bold;
  text-align: left;
}

.header h2 {
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.801);
  text-transform: uppercase;
  font-size: 22px;
  font-family: Lato;
  font-weight: 500;
  text-align: left;
}

.content-wrapper {
  width: 100%;
  height: 80%;
  padding: 15px;
  display: flex;
  flex-direction: row;
}

.data-table-container {
  width: 55%;
  height: 100%;
  max-height: 100%;
  overflow-y: hidden;
}

.details-container {
  width: 45%;
  margin-left: 10px;
}
</style>
