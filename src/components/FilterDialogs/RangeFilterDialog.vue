<template>
  <vue-slider
    :modelValue="value"
    @update:modelValue="(newValue) => onChangeSlider(fieldName, newValue)"
  ></vue-slider>
  <h1>{{ value }}</h1>
  <h1>{{ fieldName }}</h1>
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
    fieldName: {
      type: String,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChangeSlider(fieldName, value) {
      console.log('aqui');
      this.$emit('filter-change', { fieldName, value });
    },
  },
};
</script>
