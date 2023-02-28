<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th
            v-for="(field, fieldName) in visibleFilters"
            :key="fieldName"
            @click="sortByField(fieldName)"
          >
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
            {{ fields[fieldName].label }}

            <button
              v-if="fields[fieldName].filter"
              class="button icon"
              v-on:click="(event) => openFilterDialog(fieldName, event)"
            >
              <vue-feather
                type="filter"
                :fill="fields[fieldName].filter?.active ? 'black' : 'none'"
              ></vue-feather>
            </button>
            <RangeFilterDialog
              v-if="fields[fieldName].filter?.active"
              :value="fields[fieldName].filter.value"
              :fieldName="fieldName"
              @filter-change="updateFilter"
              :min="fields[fieldName].filter.default[0]"
              :max="fields[fieldName].filter.default[1]"
            ></RangeFilterDialog>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in computedData"
          :key="item"
          @click="onItemClick(item.id)"
        >
          <td v-for="(field, fieldName) in visibleFilters" :key="fieldName">
            {{ item[fieldName] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import RangeFilterDialog from '../FilterDialogs/RangeFilterDialog.vue';

export default {
  name: 'DataTable',
  components: { RangeFilterDialog },
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
    },
    fields: {
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
      // open filter box
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

      const filtedArray = filters.reduce(
        (d, filter) => d.filter(filter.fn(filter.value)),
        this.data
      );
      return filtedArray;
    },
  },
};
</script>

<style>
.button {
  height: 30px;
  width: 30px;
}

.table-container {
  height: 100%;
  overflow-y: auto;
  padding-right: 10px;
}

table {
  border-collapse: collapse; /* make the table borders collapse to each other */
  width: 100%;
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

thead th {
  font-family: Lato;
  font-weight: bold;
  font-size: 18px;
  color: #fa4251;
  line-height: 1.4;
  background-color: transparent;
}

tbody td {
  font-family: Lato;
  font-size: 15px;
  color: gray;
  line-height: 1.4;
}
tbody tr {
  border-bottom: 1px solid #f2f2f2;
}

tbody tr td {
  padding: 10px 5px;
}
</style>
