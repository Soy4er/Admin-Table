import * as product from '@/api/request.js';
import Vue from 'vue'

export default {
  actions: {
    async fetchProducts(ctx) {
      const products = await product.getProducts()
        .catch(function (error) {
          Vue.notify({
            group: 'notification',
            type: 'error',
            title: error.error,
            text: 'An error occurred when loading elements into the table! Try refreshing the page.',
            duration: 10000
          })
          ctx.commit('updateServerError', true);
          return [];
        });

      ctx.commit('updateProducts', products);
    },
    async deleteElement(ctx, id = null) {
      await product.deleteProducts()
        .then(function () {
          id !== null ? ctx.commit('trashElement', id) : ctx.commit('trashElements');
        })
        .catch(function (error) {
          Vue.notify({
            group: 'notification',
            type: 'error',
            title: error.error,
            text: 'An error occurred when deleting an item! Try deleting it again.',
            duration: 10000
          })
        });
    }
  },
  mutations: {
    updateProducts(state, products) {
      state.products = products
    },

    updateColums({ columns }, id) {
      columns.find(({ order }) => order).order = false;
      columns[id].order = true;
    },

    columnsActive({ columns }) {
      for (const item in columns) {
        columns[item].visible = true
      }
    },

    columnsUnactive({ columns }) {
      for (const item in columns) {
        columns[item].visible = false
      }
    },

    columnActive({ columns }, id) {
      columns[id].visible = true;
    },

    columnUnactive({ columns }, idColumn) {
      columns[idColumn].visible = false;

      // Checking when deactivating one column and activating the other relative to the id, order, and visible parameters.
      if (columns[idColumn].order) {
        if (columns.find(({ id, order, visible }) => id !== idColumn && !order && visible))
          columns.find(({ id, order, visible }) => id !== idColumn && !order && visible).order = true
        else
          columns[0].order = true
        columns[idColumn].order = false;
      }
    },

    createSelectedRows(state, selectedRows) {
      state.selectedRows.push(selectedRows)
    },

    deleteSelectedRows(state, selectedRows) {
      const id = state.selectedRows.indexOf(selectedRows);
      if (id >= 0) state.selectedRows.splice(id, 1);
    },

    updatePerPage({ perPage }, id) {
      perPage.find(({ active }) => active).active = false;
      perPage[id].active = true;
    },

    createSelectedAllRows(state, selectedRows) {
      for (const item in selectedRows) {
        if (state.selectedRows.indexOf(selectedRows[item].id) < 0)
          state.selectedRows.push(selectedRows[item].id)
      }
    },

    deleteSelectedAllRows(state) {
      state.selectedRows = []
    },

    prevPage(state) {
      if (state.page !== 1) state.page--
    },

    nextPage(state) {
      const perPage = state.perPage.find(({ active }) => active).name,
        countProduct = state.products.length,
        page = state.page;

      if ((countProduct - perPage * page) > 0) state.page++
    },

    trashElement(state, element) {
      const id = state.products.indexOf(element);
      if (id >= 0) {
        const { product } = state.products.find(el => el.id === element.id)

        // Checks whether the element exists in the array of selected rows. When the check is completed, delete this element.
        if (state.selectedRows.find(id => id === element.id))
          state.selectedRows.splice(id, 1);
        state.products.splice(id, 1);

        Vue.notify({
          group: 'notification',
          type: 'success',
          title: 'Successful deletion',
          text: `The "${product}" element was successfully removed!`,
          duration: 10000
        })
      }
    },

    trashElements(state) {
      const countSelectedRows = state.selectedRows.length;

      // Iterating through an array of all the selected rows, searching for products with IDs from the array, and deleting them.
      state.selectedRows.forEach(function (item) {
        const product = state.products.find(({ id }) => id === item),
          position = state.products.indexOf(product);
        if (position >= 0) state.products.splice(position, 1);
      });
      state.selectedRows = [];

      Vue.notify({
        group: 'notification',
        type: 'success',
        title: 'Successful deletion',
        text: `Successfully deleting ${countSelectedRows} items!`,
        duration: 10000
      })
    },

    updateServerError(state, error) {
      state.serverError = error
    }
  },
  state: {
    columns: [
      { id: 0, label: 'Product (100g serving)', name: 'product', width: 200, order: true, visible: true },
      { id: 1, label: 'Calories', name: 'calories', width: 110, order: false, visible: true },
      { id: 2, label: 'Fast (g)', name: 'fat', width: 110, order: false, visible: true },
      { id: 3, label: 'Crabs (g)', name: 'carbs', width: 110, order: false, visible: true },
      { id: 4, label: 'Protein (g)', name: 'protein', width: 110, order: false, visible: true },
      { id: 5, label: 'Iron (%)', name: 'iron', width: 110, order: false, visible: true },
    ],
    products: [],
    selectedRows: [],
    perPage: [
      { name: 10, active: true },
      { name: 15, active: false },
      { name: 20, active: false },
    ],
    page: 1,
    serverError: false,
  },
  getters: {
    allColumns(state) {
      return state.columns
    },
    allProducts(state) {
      return state.products
    },
    allSelectedRows(state) {
      return state.selectedRows
    },
    perPage(state) {
      return state.perPage
    },
    page(state) {
      return state.page
    },
    serverError(state) {
      return state.serverError
    }
  }
}