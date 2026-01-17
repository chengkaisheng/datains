<template>
  <div class="de-select-container" style="display: flex; align-items: center">
    <el-date-picker
      v-if="element.options !== null && element.options.attrs !== null"
      ref="dateRef"
      v-model="values"
      class="deDate"
      :type="element.options.attrs.type"
      :range-separator="$t(element.options.attrs.rangeSeparator)"
      :start-placeholder="$t(element.options.attrs.startPlaceholder)"
      :end-placeholder="$t(element.options.attrs.endPlaceholder)"
      :placeholder="$t(element.options.attrs.placeholder)"
      :append-to-body="inScreen"
      value-format="timestamp"
      :size="size"
      :editable="true"
      :style="dateStyle"
      :picker-options="pickerOptions"
      @focus="toFocus"
      @blur="onBlur"
    />
    <!-- @change="dateChange" -->
    <el-button
      class="search-button"
      :size="size"
      :style="dateStyle"
      style="margin-left: 5px"
      @click="dateChange"
    >
      <i class="el-icon-search" :style="{ color: dateStyle.color }" />
    </el-button>
  </div>
</template>

<script>
import { ApplicationContext } from "@/utils/ApplicationContext";
import { timeSection } from "@/utils";
import bus from "@/utils/bus";
import moment from 'moment'
import { getDateInTable } from '@/api/panel/panel'
export default {
  props: {
    element: {
      type: Object,
      default: null,
    },
    inDraw: {
      type: Boolean,
      default: true,
    },
    inScreen: {
      type: Boolean,
      required: false,
      default: true,
    },
    size: String,
  },
  data() {
    return {
      operator: "between",
      values: null,
      onFocus: false,
      validDateSet: new Set([]),
      formate: {
        'daterange': 'yyyy-MM-dd',
        'year': 'yyyy',
        'month': 'yyyy-MM',
        'date': 'yyyy-MM-dd',
      }
    };
  },
  computed: {
    defaultoptions() {
      if (
        !this.element ||
        !this.element.options ||
        !this.element.options.attrs.default
      )
        return "";
      return JSON.stringify(this.element.options.attrs.default);
    },
    defaultValueStr() {
      if (!this.element || !this.element.options || !this.element.options.value)
        return "";
      return this.element.options.value.toString();
    },
    viewIds() {
      if (
        !this.element ||
        !this.element.options ||
        !this.element.options.attrs.viewIds
      )
        return "";
      return this.element.options.attrs.viewIds.toString();
    },
    manualModify() {
      return !!this.element.options.manualModify;
    },
    dateStyle() {
      if (this.inDraw === false) return {};
      const style = {};
      // console.log('日期颜色。',this.element)
      if (
        this.element.commonSelectFrame &&
        this.element.commonSelectFrame.enable
      ) {
        style.color = this.element.commonSelectFrame.fontColor;
        style.backgroundColor = this.element.commonSelectFrame.color;
      }
      return style;
    },
    pickerOptions() {
      return {
        disabledDate: (time) => {
          const dateStr = moment(time).format(this.formate[this.element.options.attrs.type])
          // 不在有效日期集合中 → 禁用
          return !this.validDateSet.has(dateStr)
        }
      }
    }
  },
  watch: {
    viewIds: function (value, old) {
      if (typeof value === "undefined" || value === old) return;
      this.setCondition();
    },
    defaultValueStr: function (value, old) {
      if (this.element.options.attrs.default.isDynamic) {
        return;
      }
      if (value === old) return;
      this.values = this.fillValueDerfault();
      this.dateChange(value);
    },
    defaultoptions: function (val, old) {
      if (!this.element.options.attrs.default.isDynamic) {
        this.values = this.fillValueDerfault();
        this.dateChange(this.values);
        return;
      }
      if (val === old) return;
      const widget = ApplicationContext.getService(this.element.serviceName);
      this.values = widget.dynamicDateFormNow(this.element);
      this.dateChange(this.values);
    },
    values: function (val, old) {
      this.dateChange(val, "save_only");
    },
  },
  created() {
    if (
      this.element.options.attrs.default &&
      this.element.options.attrs.default.isDynamic
    ) {
      if (this.element.options.attrs.default) {
        const widget = ApplicationContext.getService(this.element.serviceName);
        this.values = widget.dynamicDateFormNow(this.element);
        this.dateChange(this.values);
      }
      return;
    }
    if (this.element.options.value) {
      this.values = this.fillValueDerfault();
      this.dateChange(this.values);
    }
  },
  mounted() {
    bus.$on("onScroll", () => {
      if (this.onFocus) {
        this.$refs.dateRef.hidePicker();
      }
    });
    bus.$on("reset-default-value", (id) => {
      if (this.inDraw && this.manualModify && this.element.id === id) {
        if (!this.element.options.attrs.default.isDynamic) {
          this.values = this.fillValueDerfault();
          this.dateChange(this.values);
          return;
        }
        const widget = ApplicationContext.getService(this.element.serviceName);
        this.values = widget.dynamicDateFormNow(this.element);
        this.dateChange(this.values);
      }
    });

    getDateInTable(this.element.options.attrs.fieldsParent.id, this.element.options.attrs.fieldId, {
        format: this.formate[this.element.options.attrs.type] || 'yyyy'
      }).then(res => {
        if(res.success && res.data.length > 0) {
          this.validDateSet = new Set(res.data)
        }

      }).catch(error => {
      })
  },
  // methods: {
  //   fillValueDerfault() {
  //     if (!this.element.options.attrs.default) return ''
  //     const defaultVal = this.element.options.attrs.default
  //     if (defaultVal.isDynamic) {
  //       return
  //     }
  //   }
  // },
  methods: {
    onBlur() {
      this.onFocus = false;
    },
    toFocus() {
      this.onFocus = true;
    },
    search() {
      this.setCondition();
    },
    setCondition(saveType) {
      const param = {
        component: this.element,
        value: this.formatFilterValue(),
        operator: this.operator,
      };
      param.value = this.formatValues(param.value);
      if (saveType === "save_only") {
        this.inDraw && this.$store.commit("saveViewFilter", param);
      } else {
        this.inDraw && this.$store.commit("addViewFilter", param);
      }
    },
    dateChange(value, val) {
      if (!this.inDraw) {
        if (value === null) {
          this.element.options.value = "";
        } else {
          this.element.options.value = Array.isArray(value)
            ? value.join()
            : value.toString();
        }
        this.element.options.manualModify = false;
      } else {
        this.element.options.manualModify = true;
      }
      this.setCondition(val);
    },
    formatFilterValue() {
      if (this.values === null) return [];
      if (Array.isArray(this.values)) return this.values;
      return [this.values];
    },
    formatValues(values) {
      if (!values || values.length === 0) {
        return [];
      }
      if (this.element.options.attrs.type === "daterange") {
        if (values.length !== 2) {
          return null;
        }
        let start = values[0];
        let end = values[1];
        start = timeSection(start, "date")[0];
        end = timeSection(end, "date")[1];
        const results = [start, end];
        return results;
      } else {
        const value = values[0];
        return timeSection(parseFloat(value), this.element.options.attrs.type);
      }
    },
    fillValueDerfault() {
      const defaultV =
        this.element.options.value === null
          ? ""
          : this.element.options.value.toString();
      if (this.element.options.attrs.type === "daterange") {
        if (
          defaultV === null ||
          typeof defaultV === "undefined" ||
          defaultV === "" ||
          defaultV === "[object Object]"
        ) {
          return [];
        }
        return defaultV.split(",").map((item) => parseFloat(item));
      } else {
        if (
          defaultV === null ||
          typeof defaultV === "undefined" ||
          defaultV === "" ||
          defaultV === "[object Object]"
        ) {
          return null;
        }
        return parseFloat(defaultV.split(",")[0]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.deDate {
  background-color: transparent;
}
.deDate ::v-deep .el-input__inner {
  background-color: transparent;
}

.deDate ::v-deep .el-range-editor.el-input__inner {
  background-color: transparent;
}

.deDate ::v-deep .el-range-editor .el-range-input {
  background-color: transparent;
}

.deDate ::v-deep .el-range-input {
  background-color: transparent;
  color: inherit;
}
.deDate ::v-deep .el-range-separator {
  color: inherit;
}
.deDate ::v-deep .el-range__icon {
  color: inherit;
}
.search-button {
  background: transparent;
}
.search-button:hover {
  background: transparent;
}
</style>
