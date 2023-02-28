<template>
  <table id="tableComponent" class="table table-bordered table-striped">
    <thead>
      <tr>
        <!-- loop through each value of the fields to get the table header -->
        <th
          v-for="(field, fieldName) in fields"
          :key="fieldName"
          @click="sortByField(fieldName)"
        >
          {{ field.label }}
          <font-awesome-icon
            v-if="field.sort === 'normal'"
            icon="fa-solid fa-sort"
          />
          <font-awesome-icon
            v-else-if="field.sort === 'asc'"
            icon="fa-solid fa-sort-up"
          />
          <font-awesome-icon
            v-else-if="field.sort === 'desc'"
            icon="fa-solid fa-sort-down"
          />
          <button
            v-if="field.filter"
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
        <td v-for="(field, fieldName) in fields" :key="fieldName">
          {{ item[fieldName] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import RangeFilterDialog from './FilterDialog/RangeFilterDialog.vue';

export default {
  name: 'DataTable',
  components: RangeFilterDialog,
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
  },
};
</script>

<style>
.button {
  height: 20px;
  width: 20px;
}
</style>
