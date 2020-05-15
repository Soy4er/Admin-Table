<template>
  <div class="sorting-table">
    <p class="sorting-table__label">Sorting by:</p>
    <div
      class="sorting-table__item"
      v-for="({id, name, label, order}) in columns.filter(({visible}) => visible)"
      :key="name"
      v-bind:class="{'sorting-table__item--active': order}"
      @click="changingActiveColumn(id)"
    >{{label}}</div>
  </div>
</template>

<script>
export default {
  methods: {
    changingActiveColumn(id) {
      this.$store.commit("updateColums", id);
    }
  },
  computed: {
    columns() {
      return this.$store.getters["allColumns"];
    }
  }
};
</script>

<style lang="scss" scoped>
.sorting-table {
  display: flex;
  align-items: center;
  &__label {
    font-weight: 600;
    color: $gray-600;
    margin-right: 10px;
  }
  &__item {
    color: $black;
    padding: 5px 10px;
    cursor: pointer;
    &--active {
      color: $white;
      background-color: $primary;
      border-radius: 2px;
      border: none;
    }
  }
}
</style>