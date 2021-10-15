<template lang="pug">
  .chartPanel.bg-white
    .flex.justify-between.items-start.mb1
      .chartPanel__title.fw6 {{title}}
      .chartPanel__audit(v-if="isSrcAudited") 來自政府、官方報告
      .chartPanel__audit(v-else) 來自企業 CSR 報告
    .mb3.pb2
      span(v-if="unit") 單位：{{unitStr}}
    chart-content(:config="c3Config")
    .chartPanel__tips.mt2(v-if="tips") {{tips}}
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    unit: {
      type: [String, Array],
      default: ''
    },
    isSrcAudited: {
      type: Boolean,
      default: true
    },
    tips: {
      type: String,
      default: ''
    },
    c3Config: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    unitStr () {
      if (Array.isArray(this.unit)) {
        return this.unit.join(' · ')
      }
      return this.unit
    }
  }
}
</script>
<style lang="scss" scoped>
.chartPanel {
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);

  &__title {
    font-size: 1.5rem;
    color: #49591C;
  }

  &__audit {
    color: #49591C;
  }

  & + .chartPanel {
    margin-top: 1.5rem;
  }
}
</style>
