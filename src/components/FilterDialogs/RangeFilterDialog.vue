<template>
  <vue-slider
    :modelValue="value"
    @update:modelValue="(newValue) => onChangeSlider(fieldName, newValue)"
    :min="min"
    :max="max"
  ></vue-slider>
  <span class="value-text">
    Filter from <strong>{{ value[0] }}</strong> to
    <strong>{{ value[1] }}</strong>
  </span>
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

<style>
.value-text {
  font-weight: 300;
  font-size: 14px;
  color: rgb(67, 67, 71);
}

.value-text strong {
  font-weight: 600;
}
</style>
