<template>
    <div class="container">
        <vuetable ref="vuetable"
                  :http-fetch="getData"
                  :fields="fields"
                  :sort-order="sortOrder"
                  :query-params="makeQueryParams"
                  data-path="data"
                  :per-page="perPage"
                  :transform="transformData"
                  pagination-path="pagination"
                  @vuetable:pagination-data="onPaginationData"
                  @vuetable:loading="onLoading"
        ></vuetable>

        <div class="pagination ui basic segment grid">
            <vuetable-pagination-info ref="paginationInfo"
                                      info-template="Exibindo {from} a {to} do total de {total} itens"
                                      no-data-template="Sem dados para exibir"
            ></vuetable-pagination-info>

            <vuetable-pagination ref="pagination"
                                 @vuetable-pagination:change-page="onChangePage"
            ></vuetable-pagination>
        </div>
    </div>
</template>
<script>
  import Vuetable from "vuetable-2/src/components/Vuetable";
  import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
  import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";

  export default {
    name: "StateTable",
    components: {
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo
    },
    data() {
      return {
        fields: [
          {
            name: "name",
            title: '<i class="grey address card outline icon"></i>Nome',
            width: "20%",
            sortField: "name"
          },
          {
            name: "shortName",
            title: '<i class="grey address book outline icon"></i>Abreviação',
            width: "20%",
          },
          {
            name: "createdAt",
            title: '<i class="grey clock outline icon"></i>Data de Criação',
            width: "20%",
          },
          {
            name: "updatedAt",
            title: '<i class="grey clock outline icon"></i>Data de Atualização',
            width: "20%",
          },
        ],
        sortOrder: [
          {
            field: "Name",
            direction: "asc"
          }
        ],
        perPage: 10,
        apiUrl: process.env.VUE_APP_API_URL,
        basicAuth: process.env.VUE_APP_BASIC_AUTH,
      };
    },
    methods: {
      getData (apiUrl, httpOptions) {
        this.$http.defaults.baseURL = this.apiUrl + '/v1/state';
        this.$http.defaults.headers.common['Authorization'] = this.basicAuth;
        return this.$http.get(apiUrl, httpOptions)
      },
      makeQueryParams (sortOrder, currentPage, perPage) {
        return {
          sort: sortOrder[0].field,
          order: sortOrder[0].direction === 'asc' ? 1 : -1,
          page: currentPage,
          pageSize: perPage,
          _count: 1,
        }
      },
      transformData (data) {
        const transformed = {};

        transformed.pagination = {
          total: data._total_items,
          per_page: data._embedded.states.length,
          current_page: data._page,
          last_page: data._page_count,
          next_page_url: ((data._links || {}).next || {}).href || null,
          prev_page_url: ((data._links || {}).last || {}).href || null,
          from: data._page === 1 ? 1 : (data._page - 1) * this.perPage,
          to: data._page === 1 ? data._embedded.states.length : ((data._page - 1) * this.perPage) + data._embedded.states.length
        }

        transformed.data = [];
        for (var i=0; i < data._embedded.states.length; i++) {
          transformed.data.push({
            id: data._embedded.states[i].id,
            name: data._embedded.states[i].name,
            shortName: data._embedded.states[i].shortName,
            createdAt: this.$moment(data._embedded.states[i].createdAt).format('HH:mm:ss DD/MM/YYYY'),
            updatedAt: this.$moment(data._embedded.states[i].updatedAt).format('HH:mm:ss DD/MM/YYYY'),
          });
        }

        return transformed;
      },
    onPaginationData(paginationData) {
        this.$refs.pagination.setPaginationData(paginationData);
        this.$refs.paginationInfo.setPaginationData(paginationData);
      },
      onChangePage(page) {
        this.$refs.vuetable.changePage(page);
      },
      onLoading() {
        console.log('loading... show your spinner here')
      },
    }
  };
</script>

<style>
    .pagination {
        margin-top: 1rem;
    }
    .vuetable-head-wrapper table.vuetable th.sortable {
        cursor: pointer
    }
    .container {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>
