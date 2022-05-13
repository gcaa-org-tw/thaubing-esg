import Vue from 'vue'
import VueIntersect from 'vue-intersect'

Vue.component('VueIntersect', VueIntersect)

export default ({ app }) => {
  app.$plausible.enableAutoPageviews()
}
