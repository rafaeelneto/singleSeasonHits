<template>
  <vue-slider v-model="value"></vue-slider>
</template>
<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  name: 'RangeFilterDialog',
  components: {
    VueSlider,
  },
  props: {
    value: {
      type: Array,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
