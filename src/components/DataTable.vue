<template>
  <div>
    <RangeFilterDialog
      :value="filterRange"
      :filter="'id'"
      @filter-change="updateFilter"
    ></RangeFilterDialog>
  </div>
  <table id="tableComponent" class="">
    <thead>
      <tr>
        <!-- loop through each value of the fields to get the table header -->
        <th
          v-for="(field, fieldName) in visibleFilters"
          :key="fieldName"
          @click="sortByField(fieldName)"
        >
          {{ fields[fieldName].label }}
          <font-awesome-icon
            v-if="fields[fieldName].sort === 'normal'"
            icon="fa-solid fa-sort"
          />
          <font-awesome-icon
            v-else-if="fields[fieldName].sort === 'asc'"
            icon="fa-solid fa-sort-up"
          />
          <font-awesome-icon
            v-else-if="fields[fieldName].sort === 'desc'"
            icon="fa-solid fa-sort-down"
          />
          <button
            v-if="fields[fieldName].filter"
            class="button icon"
            v-on:click="(event) => filter(fieldName, event)"
          >
            <font-awesome-icon icon="fa-solid fa-filter" />
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- Loop through the list get the each student data -->
      <tr v-for="item in data" :key="item">
        <td v-for="(field, fieldName) in visibleFilters" :key="fieldName">
          {{ item[fieldName] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import RangeFilterDialog from './FilterDialogs/RangeFilterDialog.vue';

export default {
  name: 'DataTable',
  components: { RangeFilterDialog },
  data() {
    return {
      filterRange: [0, 100],
    };
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
  methods: {
    filter(fieldName, e) {
      if (e) {
        e.stopPropagation();
      }
      // open filter box
    },
    sortByField(fieldName) {
      this.$emit('sort-by-field', fieldName);
    },
    updateFilter({ fieldName, value }) {
      console.log({ fieldName, value });
      this.filterRange = value;
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
  },
};
</script>

<style>
.button {
  height: 20px;
  width: 20px;
}
</style>
