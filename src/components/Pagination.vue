<template>
  <div class="pagination" v-if="!serverError">
    <div class="btn btn--arrow-left" @click="prevPage()" :class="{'btn--disabled': firstPage}">
      <font-awesome-icon icon="chevron-down" />
    </div>
    <p>{{pagination}}</p>
    <div class="btn btn--arrow-right" @click="nextPage()" :class="{'btn--disabled': !lastPage}">
      <font-awesome-icon icon="chevron-down" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    prevPage() {
      this.$store.commit("prevPage");
    },
    nextPage() {
      this.$store.commit("nextPage");
    }
  },
  computed: {
    pagination() {
      const perPage = this.$store.getters["perPage"].find(
          ({ active }) => active
        ),
        countProduct = this.$store.getters["allProducts"].length,
        page = this.$store.getters["page"],
        initialElement = perPage.name * (page - 1) + 1,
        finiteElement =
          perPage.name * page > countProduct
            ? countProduct
            : perPage.name * page;
      return initialElement + "-" + finiteElement + " of " + countProduct;
    },
    firstPage() {
      return this.$store.getters["page"] === 1;
    },
    lastPage() {
      const perPage = this.$store.getters["perPage"].find(
          ({ active }) => active
        ).name,
        countProduct = this.$store.getters["allProducts"].length,
        page = this.$store.getters["page"];
      return countProduct - perPage * page > 0;
    },
    serverError() {
      return this.$store.getters["serverError"];
    }
  }
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  align-items: center;
  margin-right: 15px;
  font-weight: 600;
  & p {
    margin: 0 8px;
  }
}
</style>