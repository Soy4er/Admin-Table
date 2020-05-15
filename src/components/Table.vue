<template>
  <table class="table">
    <header-table />
    <body-table />
  </table>
</template>


<script>
import HeaderTable from "./HeaderTable.vue";
import BodyTable from "./BodyTable.vue";

export default {
  components: {
    HeaderTable,
    BodyTable
  }
};
</script>

<style lang="scss">
.table {
  width: 100%;
  border-spacing: 0;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 15px;
}
</style>