<template>
  <h1>{{ data.Player }}</h1>
</template>

<script>
export default {
  name: 'DetailsComponent',
  props: {
    data: {
      type: Object,
    },
  },
};
</script>
<style></style>
