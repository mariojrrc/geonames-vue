<template>
  <div id="app">
    <h1 class="ui header"> GeoNames Vue</h1>
    <p>
      Exemplo de exibição dos dados da <a href="https://github.com/mariojrrc/geonames-api-node" target="_blank">GeoNames API Node</a>
    </p>
    <h3 class="ui header">&lt;GeoNames-State&gt;</h3>
    <state-table></state-table>
    <h3 class="ui header">&lt;GeoNames-City&gt;</h3>
    <city-table></city-table>
  </div>
</template>

<script>
import StateTable from './components/StateTable.vue';
import CityTable from './components/CityTable.vue';

export default {
  name: 'App',
  components: {
    StateTable,
    CityTable
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: aliceblue;
}
</style>
