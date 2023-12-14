<template>
  <section class="radio_group">
    <label
      v-for="(option, index) of radioGroupOptions"
      :key="index"
      class="radio"
      :for="option.label"
      @change.stop="(e) => onChange(e, option)"
    >
      <span
        v-if="!$scopedSlots.default"
        class="radio_label"
        :style="{
          '--radio-background': option.checked ? '#2681ff' : '#fff',
          '--radio-border-color': option.checked ? '#2681ff' : '#999',
          '--radio-text-color': option.checked ? '#2681ff' : '#121212',
        }"
      >{{ option.label }}</span>
      <input :id="option.label" name="radio" type="radio" class="radio_input">
      <slot :option="option" />
    </label>
  </section>
</template>

<script>
export default {
  name: 'RadioGroup',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    defaultValue: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      radioGroupOptions: []
    }
  },
  watch: {
    options: {
      handler(newVal) {
        this.radioGroupOptions = newVal.map((item) => {
          if (item.value === this.defaultValue) {
            return {
              ...item,
              checked: true
            }
          }

          return {
            ...item,
            checked: false
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    onChange(e, option) {
      this.radioGroupOptions.forEach((item) => {
        item.checked = false
      })

      option.checked = e.target.checked

      this.$emit('change', option)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio_group {
  width: 100%;
  .radio {
    margin-right: 10px;
    cursor: pointer;
    .radio_label {
      line-height: 1.6;
      font-size: 14px;
      color: var(--radio-text-color);
      position: relative;
      display: inline-flex;
      align-items: center;
      &::before {
        display: inline-block;
        content: '';
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 1px solid var(--radio-border-color);
        background-color: var(--radio-background);
        margin-right: 4px;
      }
      &::after {
        display: inline-block;
        content: "";
        width: 4px;
        height: 8px;
        background-color: transparent;
        border: 1px solid transparent;
        border-left-color: #fff;
        border-top-color: #fff;
        box-sizing: border-box;
        transform: rotateZ(-135deg);
        position: absolute;
        left: 6px;
        top: 6px;
      }
    }
    .radio_input {
      display: none;
    }
  }
}
</style>
