import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import api from './module-api'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      api
    },
    state() {
      return {
        currentProduct: null, // текущий выбранный продукт
        editNameDialogVisible: false // флаг видимости диалогового окна редактирования имени
      }
    },
    mutations: {
      setCurrentProduct(state, product) {
        state.currentProduct = product
      },
      setEditNameDialogVisible(state, isVisible) {
        state.editNameDialogVisible = isVisible
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
