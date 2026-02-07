<template>
  <div id="app" :class="{ 'theme-dark': darkTheme }">
    <header class="app-header">
      <h1 class="ui header"> GeoNames Vue</h1>
      <p>
        Example display of data from the <a href="https://github.com/mariojrrc/geonames-api-node" target="_blank">GeoNames API Node</a>
      </p>
      <button
        type="button"
        class="theme-toggle"
        :aria-label="darkTheme ? 'Use light theme' : 'Use dark theme'"
        @click="toggleTheme"
      >
        <i :class="darkTheme ? 'sun icon' : 'moon icon'"></i>
        <span>{{ darkTheme ? 'Light theme' : 'Dark theme' }}</span>
      </button>
    </header>
    <div class="search-section">
      <label for="geonames-search" class="search-label">Search city and state</label>
      <input
        id="geonames-search"
        v-model="searchQuery"
        type="search"
        class="search-input"
        placeholder="Type city or state name..."
        autocomplete="off"
        aria-label="Search city and state"
      />
    </div>
    <h3 class="ui header">&lt;GeoNames-State&gt;</h3>
    <state-table :key="'state-' + searchQuery" :search-query="searchQuery"></state-table>
    <h3 class="ui header">&lt;GeoNames-City&gt;</h3>
    <city-table :key="'city-' + searchQuery" :search-query="searchQuery"></city-table>
  </div>
</template>

<script>
import StateTable from './components/StateTable.vue';
import CityTable from './components/CityTable.vue';

const STORAGE_KEY = 'geonames-vue-theme';

export default {
  name: 'App',
  components: {
    StateTable,
    CityTable
  },
  data() {
    return {
      darkTheme: false,
      searchQuery: ''
    };
  },
  mounted() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      this.darkTheme = saved === 'dark';
    }
    this.applyThemeToBody();
  },
  updated() {
    this.applyThemeToBody();
  },
  methods: {
    toggleTheme() {
      this.darkTheme = !this.darkTheme;
      localStorage.setItem(STORAGE_KEY, this.darkTheme ? 'dark' : 'light');
      this.applyThemeToBody();
    },
    applyThemeToBody() {
      document.body.classList.toggle('theme-dark', this.darkTheme);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  min-height: 100vh;
  transition: background-color 0.2s ease, color 0.2s ease;
}

body {
  background-color: aliceblue;
  transition: background-color 0.2s ease;
}

.app-header {
  position: relative;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background: #fff;
  color: #2c3e50;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.theme-toggle:hover {
  background: #f0f0f0;
}

/* Dark theme */
#app.theme-dark {
  --app-bg: #1a1d21;
  --app-text: #e4e6e8;
  --app-text-muted: #9ca3af;
  --app-link: #60a5fa;
  --app-link-hover: #93c5fd;
  --app-surface: #25282d;
  --app-border: #374151;
}

#app.theme-dark {
  color: var(--app-text);
}

body.theme-dark {
  background-color: #1a1d21;
}

#app.theme-dark .app-header a {
  color: var(--app-link);
}

#app.theme-dark .app-header a:hover {
  color: var(--app-link-hover);
}

#app.theme-dark .theme-toggle {
  background: var(--app-surface);
  color: var(--app-text);
  border-color: var(--app-border);
}

#app.theme-dark .theme-toggle:hover {
  background: #2d3139;
}

#app.theme-dark .ui.header {
  color: var(--app-text) !important;
}

#app.theme-dark .ui.basic.segment {
  background: var(--app-surface) !important;
  border-color: var(--app-border) !important;
  color: var(--app-text) !important;
}

#app.theme-dark .vuetable table {
  background: var(--app-surface) !important;
  color: var(--app-text) !important;
}

#app.theme-dark .vuetable th,
#app.theme-dark .vuetable td {
  border-color: var(--app-border) !important;
}

#app.theme-dark .vuetable th {
  background: #2d3139 !important;
  color: var(--app-text-muted) !important;
}

#app.theme-dark .vuetable tbody tr td {
  background: #25282d !important;
  color: #fff !important;
}

#app.theme-dark .vuetable tr:hover td {
  background: #2d3139 !important;
  color: #fff !important;
}

#app.theme-dark .vuetable-pagination-info,
#app.theme-dark .vuetable-pagination {
  color: var(--app-text-muted) !important;
}

#app.theme-dark .vuetable-pagination a,
#app.theme-dark .vuetable-pagination button {
  color: var(--app-link) !important;
}

#app.theme-dark .vuetable-pagination a:hover,
#app.theme-dark .vuetable-pagination button:hover {
  color: var(--app-link-hover) !important;
}

#app.theme-dark .vuetable-pagination .active a {
  color: var(--app-text) !important;
}

.search-section {
  margin: 1.5rem 0;
  text-align: center;
}

.search-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: inherit;
}

.search-input {
  max-width: 320px;
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus {
  border-color: #2185d0;
  box-shadow: 0 0 0 2px rgba(33, 133, 208, 0.2);
}

#app.theme-dark .search-input {
  background: var(--app-surface);
  color: var(--app-text);
  border-color: var(--app-border);
}

#app.theme-dark .search-input::placeholder {
  color: var(--app-text-muted);
}

#app.theme-dark .search-input:focus {
  border-color: var(--app-link);
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
}
</style>
