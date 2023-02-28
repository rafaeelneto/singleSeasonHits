<template>
  <vue-slider
    :modelValue="value"
    @update:modelValue="(newValue) => onChangeSlider(fieldName, newValue)"
    :min="min"
    :max="max"
  ></vue-slider>
  <h1>{{ value }}</h1>
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
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  emits: ['filter-change'],
  methods: {
    onChangeSlider(fieldName, newValue) {
      this.$emit('filter-change', { fieldName, newValue });
    },
  },
};
</script>
