<template>
  <table id="tableComponent" class="table table-bordered table-striped">
    <thead>
      <tr>
        <!-- loop through each value of the fields to get the table header -->
        <th
          v-for="(field, fieldName) in fields"
          :key="fieldName"
          @click="sortTable(field)"
        >
          {{ field.label }}
          <i class="bi bi-sort-alpha-down" aria-label="Sort Icon"></i>
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
export default {
  name: 'DataTable',
  props: {
    initialData: {
      type: Array,
    },
    fields: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      data: this.initialData,
    };
  },
};
</script>
