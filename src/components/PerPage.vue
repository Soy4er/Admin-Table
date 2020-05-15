<template>
  <div class="per-page" v-if="!serverError">
    <div class="btn per-page__button" @click="show = !show">
      <p>{{activePerPage.name}} Per Page</p>
      <font-awesome-icon icon="chevron-down" />
    </div>
    <transition name="fade">
      <div class="per-page__dropdown" v-if="show" v-click-outside="onClickOutside">
        <div
          class="per-page__dropdown-item"
          v-for="(item, index) in perPage"
          :key="index"
          @click="perPageSelected(index)"
        >
          <div class="item-checkbox" :class="{'item-checkbox--active': item.active}"></div>
          <p>{{item.name}} Per Page</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    onClickOutside() {
      this.show = false;
    },
    perPageSelected(id) {
      this.$store.commit("updatePerPage", id);
    }
  },
  computed: {
    perPage() {
      return this.$store.getters["perPage"];
    },
    activePerPage() {
      return this.perPage.find(({ active }) => active);
    },
    serverError() {
      return this.$store.getters["serverError"];
    }
  }
};
</script>

<style lang="scss">
.per-page {
  user-select: none;
  margin-right: 15px;
  &__button p {
    margin-right: 10px;
  }
  &__dropdown {
    margin-top: 15px;
    background: $white;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    padding: 15px;
    position: absolute;
    z-index: 1;
    &-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      & .item-checkbox {
        margin-right: 10px;
      }
    }
  }
}
</style>