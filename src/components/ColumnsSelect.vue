<template>
  <div class="columns-select">
    <div class="btn columns-select__button" v-on:click="show = !show">
      <p>{{columns.length}} columns selected</p>
      <font-awesome-icon icon="chevron-down" />
    </div>
    <transition name="fade">
      <div class="columns-select__dropdown" v-if="show" v-click-outside="onClickOutside">
        <div class="columns-select__dropdown-item" @click="selectAllColumns()">
          <div
            class="item-checkbox"
            :class="{'item-checkbox--active': columns.length === allColumns.length}"
          ></div>
          <b>Select All</b>
        </div>
        <div
          class="columns-select__dropdown-item"
          v-for="(item, index) in allColumns"
          :key="index"
          @click="selectColumns(index)"
        >
          <div class="item-checkbox" :class="{'item-checkbox--active': item.visible}"></div>
          <p>{{item.label}}</p>
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
    selectAllColumns() {
      if (this.columns.length !== this.allColumns.length)
        this.$store.commit("columnsActive", this.products);
      else this.$store.commit("columnsUnactive");
    },
    selectColumns(id) {
      if (!this.allColumns[id].visible) this.$store.commit("columnActive", id);
      else this.$store.commit("columnUnactive", id);
    }
  },
  computed: {
    allColumns() {
      return this.$store.getters["allColumns"];
    },
    columns() {
      return this.$store.getters["allColumns"].filter(({ visible }) => visible);
    }
  }
};
</script>

<style lang="scss">
.columns-select {
  user-select: none;
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
    max-height: 170px;
    overflow: scroll;
    padding-right: 25px;
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