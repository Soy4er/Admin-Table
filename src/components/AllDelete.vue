<template>
  <div class="all-delete" v-if="!serverError">
    <div
      class="btn all-delete__button"
      :class="{'btn--disabled': selectedRows.length === 0}"
      @click="show = !show"
      v-click-outside="onClickOutside"
    >
      <p>
        Delete
        <span v-if="selectedRows.length !== 0">({{selectedRows.length}})</span>
      </p>
      <transition name="fade">
        <div class="confirm-deletion" v-if="show">
          <p>Are you sure you want to delete {{selectedRows.length}} items?</p>
          <div class="confirm-deletion__button">
            <div class="confirm-deletion__button-cancel btn">Cancel</div>
            <div
              class="confirm-deletion__button-confirm btn btn--primary"
              @click="trashElements()"
            >Confirm</div>
          </div>
        </div>
      </transition>
    </div>
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
    trashElements() {
      this.$store.dispatch("deleteElement");
    }
  },
  computed: {
    selectedRows() {
      return this.$store.getters["allSelectedRows"];
    },
    serverError() {
      return this.$store.getters["serverError"];
    }
  }
};
</script>

<style lang="scss">
.all-delete {
  position: relative;

  &__button {
    margin-right: 15px;

    &:not(.btn--disabled) {
      background-color: $primary;
      color: $white;
      border-color: $primary;
    }
  }
}
</style>