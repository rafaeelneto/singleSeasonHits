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

    <aside class="details-container" :class="selectedItem.id ? 'active' : ''">
      <transition name="slide">
        <div class="details-panel">
          <button
            v-if="selectedItem.id"
            class="icon-button close-btn"
            v-on:click="deselectItem"
          >
            <vue-feather type="chevron-left"></vue-feather>
            Back
          </button>
          <DetailsComponent :data="selectedItem" />
        </div>
      </transition>
    </aside>
  </div>
  <footer>
    <p class="footerText">Designed and Developed by Rafael Gomes</p>
    <section class="socialLinksContainer">
      <a
        class="socialLinks"
        href="https://www.behance.net/rafaeelneto"
        target="_blank"
        >Behance</a
      >
      <a
        class="socialLinks"
        href="https://www.linkedin.com/in/rafaeelneto/"
        target="_blank"
        >Linkedin</a
      >
      <a
        class="socialLinks"
        href="mailto: rafaelneto.g@gmail.com"
        target="_blank"
        >Email</a
      >
    </section>
  </footer>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

import DataTable from './components/DataTable/DataTable.vue';
import DetailsComponent from './components/Details/Details.vue';

import { fields as defaultFields } from './fields';

import { sortingMethods } from './utils/sortingMethods';

export default {
  name: 'App',
  components: {
    DataTable,
    DetailsComponent,
  },
  setup() {
    const toast = useToast();
    return { toast };
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
      })
      .catch((error) => {
        this.toast.error(
          `Error while fetching data. Please check your connection and try again later.
          Error details: ${error.message}`,
          {
            position: 'top-center',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.4,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          }
        );
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
      if (newValue[0] > newValue[1]) {
        const temp = newValue[0];
        newValue[0] = newValue[1];
        newValue[1] = temp;
      }

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
      console.log(itemId);
      this.selectedItem = this.singleHitsData.filter(
        (row) => row.id === itemId
      )[0];
    },
    deselectItem() {
      this.selectedItem = {};
    },
  },
};
</script>

<style>
#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #183540;
  width: 100vw;
  height: 100vh;
}

.header {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.header::after {
  display: block;
  position: absolute;
  background-image: linear-gradient(to bottom, #00000000 0, #19191b 100%);
  top: 80px;
  margin-top: -30px;
  height: 150px;
  width: 100%;
  content: '';
  z-index: -1;
}

#background-video {
  width: 100%;
  height: 300px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.header .text-container {
  padding: 15px;
}

.header h1 {
  color: #fff;
  font-size: 38px;
  text-transform: uppercase;
  letter-spacing: 12px;
  font-family: Chivo;
  font-weight: bold;
  text-align: left;
}

.header h2 {
  margin-top: 5px;
  color: white;
  text-transform: uppercase;
  font-size: 18px;
  font-family: Lato;
  font-weight: 500;
  text-align: left;
}

.content-wrapper {
  width: 100%;
  height: 80%;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #19191b;
  position: relative;
}

.data-table-container,
.details-container {
  background-color: white;
  border-radius: 5px;
}

.data-table-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.details-container {
  display: none;
}

.details-container.active {
  width: 95%;
  height: 95%;
  display: block;
  position: absolute;
  right: 0px;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  transition: all 150ms ease-in 0s;
}

.details-panel {
  position: absolute;
  background-color: white;
  right: 0px;
  top: 0px;
  height: 100%;
  z-index: 999;
  padding: 15px;
  width: 100%;
}

.icon-button {
  height: 30px;
  background: white;
  border: none;
}

.icon-button:hover {
  height: 30px;
  background: rgb(218, 218, 218);
  border: none;
  font-size: 20px;
}

.close-btn {
  display: block;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  padding: 0px;
  margin-bottom: 5px;
}

footer {
  width: 100%;
  height: 80px;
  background-color: #19191b;
  padding: 15px;
  color: white;
}

.socialLinksContainer {
  display: flex;
  max-width: 200px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}

.socialLinks,
.socialLinks:visited,
.socialLinks:hover {
  text-decoration: none;
  color: #0174bb;
}

@media (min-width: 600px) {
  #background-video {
    height: 250px;
  }

  .content-wrapper {
    padding: 15px;
  }
}

@media (min-width: 1025px) {
  .data-table-container {
    width: 55%;
  }

  #background-video {
    height: 200px;
  }
  .details-panel {
    height: 100%;
    padding: 15px;
    width: 100%;
    border-radius: 5px;
  }

  .details-container,
  .details-container.active {
    height: 100%;
    width: 45%;
    display: block;
    margin-left: 10px;
    position: relative;
  }

  .close-btn {
    display: none;
  }
}
</style>
