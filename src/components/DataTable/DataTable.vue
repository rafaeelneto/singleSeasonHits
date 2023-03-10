<template>
  <section v-if="!selectedItem.id" class="no-selected-msg">
    Select a player on the list below to see more datails
  </section>
  <div class="table-container">
    <table id="data-table">
      <thead>
        <tr>
          <th
            v-for="(field, fieldName) in visibleFilters"
            :id="fieldName"
            :key="fieldName"
          >
            <div class="head-cell-container">
              <div class="head-title-container" @click="sortByField(fieldName)">
                <div class="sort-icon-container">
                  <vue-feather
                    v-if="fields[fieldName].sort === 'normal'"
                    type="bar-chart-2"
                  />
                  <vue-feather
                    v-else-if="fields[fieldName].sort === 'asc'"
                    type="arrow-up"
                  />
                  <vue-feather
                    v-else-if="fields[fieldName].sort === 'desc'"
                    type="arrow-down"
                  />
                </div>
                <div class="text-property">{{ fields[fieldName].label }}</div>

                <button
                  v-if="fields[fieldName].filter"
                  class="icon-button"
                  v-on:click="(event) => openFilterDialog(fieldName, event)"
                  aria-label="Filter field"
                >
                  <vue-feather
                    type="filter"
                    :fill="fields[fieldName].filter?.active ? 'black' : 'none'"
                  ></vue-feather>
                </button>
              </div>
              <div
                class="head-filter-container"
                v-if="fields[fieldName].filter?.active"
              >
                <RangeFilterDialog
                  :value="fields[fieldName].filter.value"
                  :fieldName="fieldName"
                  @filter-change="updateFilter"
                  :min="fields[fieldName].filter.default[0]"
                  :max="fields[fieldName].filter.default[1]"
                ></RangeFilterDialog>
              </div>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in computedData"
          :key="item.id"
          @click="onItemClick(item.id)"
          :class="item.id === selectedItem?.id ? 'selected-row' : ''"
        >
          <td
            v-for="(field, fieldName) in visibleFilters"
            :key="item.id + fieldName"
          >
            {{ item[fieldName] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <section class="data-count">Items count: {{ computedData.length }}</section>
</template>

<script>
import RangeFilterDialog from '../FilterDialogs/RangeFilter.vue';

export default {
  name: 'DataTable',
  components: { RangeFilterDialog },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Object,
      default: () => ({}),
    },
    selectedItem: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['activate-filter', 'sort-by-field', 'change-filter', 'item-selected'],
  methods: {
    openFilterDialog(fieldName, e) {
      if (e) {
        e.stopPropagation();
      }
      // Emits event to activate filter and open filter box
      this.$emit('activate-filter', {
        fieldName,
        active: !this.fields[fieldName].filter.active,
      });
    },
    sortByField(fieldName) {
      this.$emit('sort-by-field', fieldName);
    },
    updateFilter({ fieldName, newValue }) {
      this.$emit('change-filter', { fieldName, newValue });
    },
    onItemClick(itemId) {
      this.$emit('item-selected', itemId);
    },
  },
  computed: {
    visibleFilters() {
      const vFilter = {};
      for (const fieldName in this.fields) {
        const isFieldVisible = this.fields[fieldName].visible;
        if (isFieldVisible) {
          vFilter[fieldName] = isFieldVisible;
        }
      }
      return vFilter;
    },
    computedData() {
      const filters = [];
      for (const fieldName in this.fields) {
        const fieldFilter = this.fields[fieldName].filter;

        if (fieldFilter?.active) {
          filters.push({ fn: fieldFilter.filterFn, value: fieldFilter.value });
        }
      }

      // Iterate over the filter and apply them on the data
      const filteredData = filters.reduce(
        (d, filter) => d.filter(filter.fn(filter.value)),
        this.data
      );
      return filteredData;
    },
  },
};
</script>

<style scoped>
.no-selected-msg,
.data-count {
  display: flex;
  width: 100%;
  margin: 10px;
  text-align: center;
  align-items: center;
  color: #535657;
}

.no-selected-msg {
  justify-content: center;
}

.data-count {
  text-align: left;
  height: 10px;
}

.table-container {
  overflow-y: auto;
  margin-top: 10px;
  height: calc(100% - 70px);
}

table {
  width: 100%;
  text-align: center;
}

thead {
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  position: sticky; /* make the table heads sticky */
  top: 0px;
  background-color: white;
}

table th,
table td {
  padding: 5px;
}

th .head-title-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  align-content: center;
  align-items: center;
}

.head-title-container span {
  display: block;
  margin: auto 0;
}

thead th {
  font-family: Lato;
  font-weight: bold;
  font-size: 18px;
  color: #d91438;
  background-color: transparent;
  min-width: 150px;
}

.head-cell-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
}

thead th:hover {
  color: #590212;
}
.sort-icon-container {
  margin-right: 3px;
  height: 24px;
  width: 24px;
}

.head-filter-container {
  padding: 10px;
  background-color: #e8e8e8;
  border-radius: 10px;
  max-width: 200px;
  width: 100%;
  margin: 0 auto;
}

tbody tr {
  border-bottom: 1px solid #f2f2f2;
  font-family: Lato;
  font-size: 15px;
  color: #183540;
  line-height: 1.4;
}

tbody tr:hover {
  background-color: #c8c8c8;
}

tbody tr.selected-row {
  color: #011640;
  font-weight: bold;
  font-size: 18px;
}

tbody tr td {
  padding-top: 10px;
  padding-bottom: 10px;
}

@media (min-width: 1025px) {
  .no-selected-msg {
    display: none;
  }

  .table-container {
    height: calc(100% - 50px);
  }
}
</style>
