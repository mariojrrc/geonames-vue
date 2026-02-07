// Global test setup: mock globals used by components (e.g. $http, $moment)
import Vue from 'vue';

Vue.config.productionTip = false;
Vue.config.devtools = false;

// Optional: mock axios so components that use this.$http don't need a real backend
if (!global.fetch) {
  global.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
}
