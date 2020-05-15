<template>
  <div id="app">
    <div class="container">
      <h1>Table UI</h1>
      <hr />
      <div class="app-table">
        <div class="app-table__header">
          <div class="app-table__header-left">
            <sort-table />
          </div>
          <div class="app-table__header-right">
            <all-delete />
            <per-page />
            <pagination />
            <columns-select />
          </div>
        </div>
        <div class="app-table__body">
          <Table />
        </div>
      </div>
    </div>
    <notifications group="notification" />
  </div>
</template>

<script>
import SortTable from "./components/SortTable.vue";
import Table from "./components/Table.vue";
import ColumnsSelect from "./components/ColumnsSelect.vue";
import PerPage from "./components/PerPage.vue";
import Pagination from "./components/Pagination.vue";
import AllDelete from "./components/AllDelete.vue";

export default {
  name: "App",
  components: {
    SortTable,
    Table,
    ColumnsSelect,
    PerPage,
    Pagination,
    AllDelete
  },
  async mounted() {
    this.$store.dispatch("fetchProducts");
  }
};
</script>

<style lang="scss">
#app {
  margin: 35px 0;
}
.app-table {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
