<template>
  <vue-slider
    :modelValue="value"
    @update:modelValue="(newValue) => onChangeSlider(fieldName, newValue)"
    :min="min"
    :max="max"
    :enable-cross="false"
  ></vue-slider>
  <span class="value-text">
    from
    <input
      class="value-filter-input"
      type="number"
      :value="value[0]"
      @input="
        (event) =>
          onChangeSlider(fieldName, [Number(event.target.value), value[1]])
      "
    />
    to
    <input
      class="value-filter-input"
      type="number"
      :value="value[1]"
      @input="
        (event) =>
          onChangeSlider(fieldName, [value[0], Number(event.target.value)])
      "
    />
  </span>
</template>
<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

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

<style scoped>
.value-text {
  font-weight: 300;
  font-size: 14px;
  color: rgb(67, 67, 71);
}

.value-filter-input {
  width: 60px;
  padding: 5px;
  border: 1px solid #5a5959;
  border-radius: 5px;
}
</style>
