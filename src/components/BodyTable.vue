<template>
  <tbody class="table-body">
    <tr
      class="table-body__block"
      v-for="item in products"
      :key="item.id"
      @mouseover="showDelete = item.id"
      @mouseleave="showDelete = '', showConfirm = false"
    >
      <th class="table-body__item" v-if="activeSelectedColumns > 0">
        <div
          class="item-checkbox"
          :class="{'item-checkbox--active': selectedRows.indexOf(item.id) >= 0}"
          @click="rowSelection(item.id)"
        ></div>
      </th>
      <th
        class="table-body__item"
        v-for="({name, width}, columnId) in columns.filter(({visible}) => visible)"
        :key="columnId"
        :style="{width: `${width}px`}"
      >{{item[name]}}</th>
      <th
        class="table-body__item table-body__item--trash"
        v-if="showDelete === item.id"
        @click="showConfirm = !showConfirm"
        v-click-outside="onClickOutside"
      >
        <font-awesome-icon :icon="['far', 'trash-alt']" />
        <span>delete</span>
        <transition name="fade">
          <div class="confirm-deletion" v-if="showConfirm">
            <p>Are you sure you want to delete item?</p>
            <div class="confirm-deletion__button">
              <div class="confirm-deletion__button-cancel btn">Cancel</div>
              <div
                class="confirm-deletion__button-confirm btn btn--primary"
                @click="trashElement(item)"
              >Confirm</div>
            </div>
          </div>
        </transition>
      </th>
    </tr>
  </tbody>
</template>


<script>
export default {
  data() {
    return {
      showDelete: "",
      showConfirm: false
    };
  },
  methods: {
    onClickOutside() {
      this.showConfirm = false;
    },
    rowSelection(id) {
      if (this.selectedRows.indexOf(id) < 0)
        this.$store.commit("createSelectedRows", id);
      else this.$store.commit("deleteSelectedRows", id);
    },
    trashElement(element) {
      this.$store.dispatch("deleteElement", element);
    }
  },
  computed: {
    columns() {
      const column = Object.assign([], this.$store.getters["allColumns"]);
      return column.sort(function(x, y) {
        return x.order === y.order ? 0 : x.order ? -1 : 1;
      });
    },
    selectedRows() {
      return this.$store.getters["allSelectedRows"];
    },
    products() {
      let products = this.$store.getters["allProducts"];
      const perPage = this.$store.getters["perPage"],
            activePerPage = perPage.find(({ active }) => active),
            page = this.$store.getters["page"],
            activeColumn =  this.$store.getters["allColumns"].find(({order}) => order === true);

      products = products.slice(
        activePerPage.name * (page - 1),
        activePerPage.name * page
      );
      return products.sort(function (a, b) {
        if (typeof a[activeColumn.name] === 'string') {
          const nameA = a[activeColumn.name].toUpperCase(),
            nameB = b[activeColumn.name].toUpperCase();
          if (nameA < nameB)
            return -1;
          if (nameA > nameB)
            return 1;
          return 0;
        } else {
          return a[activeColumn.name] - b[activeColumn.name];
        }
      });
    },
    activeSelectedColumns() {
      return this.$store.getters["allColumns"].filter(({ visible }) => visible).length;
    }
  }
};
</script>

<style lang="scss">
.table-body {
  &__block {
    display: flex;
    align-items: center;
    padding: 0 35px;
    min-height: 50px;

    &:nth-child(even) {
      background-color: $gray-200;
    }
    &:hover {
      background-color: $lightGreen;
    }
  }
  &__item {
    margin-right: 30px;
    text-align: left;
    position: relative;
    display: block;
    align-items: center;

    &--trash {
      cursor: pointer;
    }
    &:first-child {
      width: auto;
    }
    &:last-child:not(.table-header__item--active) {
      margin-right: 0;
    }
    &--active {
      color: $primary;
    }
  }
}
</style>