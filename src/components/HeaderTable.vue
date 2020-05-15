<template>
  <thead class="table-header">
    <tr class="table-header__block">
      <th class="table-header__item" v-if="activeSelectedColumns > 0">
        <div
          class="item-checkbox"
          :class="{'item-checkbox--active': selectedRows.length === perPage.name}"
          @click="allSelected()"
        ></div>
      </th>
      <th
        class="table-header__item"
        v-for="item in columns.filter(({visible}) => visible)"
        :key="item.name"
        v-bind:class="{'table-header__item--active': item.order === true}"
        :style="{width: item.width+'px'}"
      >
        {{item.label}}
        <font-awesome-icon icon="long-arrow-alt-up" v-if="item.order === true" />
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  methods: {
    allSelected() {
      if (this.selectedRows.length !== this.perPage.name)
        this.$store.commit("createSelectedAllRows", this.products);
      else this.$store.commit("deleteSelectedAllRows");
    }
  },
  computed: {
    columns() {
      const columns = Object.assign([], this.$store.getters["allColumns"]);
      return columns.sort(function(x, y) {
        return x.order === y.order ? 0 : x.order ? -1 : 1;
      });
    },
    selectedRows() {
      return this.$store.getters["allSelectedRows"];
    },
    perPage() {
      return this.$store.getters["perPage"].find(({ active }) => active);
    },
    products() {
      const products = Object.assign([], this.$store.getters["allProducts"]),
        perPage = this.$store.getters["perPage"],
        activePerPage = perPage.find(({ active }) => active),
        page = this.$store.getters["page"];

      return products.slice(
        activePerPage.name * (page - 1),
        activePerPage.name * page
      );
    },
    activeSelectedColumns() {
      return this.$store.getters["allColumns"].filter(({ visible }) => visible)
        .length;
    }
  }
};
</script>

<style lang="scss">
.table-header {
  display: block;
  border-bottom: 1px solid $gray-300;
  &__block {
    padding: 0 35px;
    display: flex;
    align-items: center;
    min-height: 55px;
  }
  &__item {
    margin-right: 30px;
    text-align: left;
    font-weight: 600;
    &:first-child {
      width: auto;
    }
    &:last-child:not(.table-header__item--active) {
      margin-right: 0;
    }
    &--active {
      color: $primary;
      display: flex;
      align-items: center;
      & svg {
        margin-left: 5px;
      }
    }
  }
}
</style>