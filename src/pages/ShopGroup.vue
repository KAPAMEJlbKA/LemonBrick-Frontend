<template>
  <q-page>
    <div style="margin: 10px;" >
      <q-btn v-if="isAdmin" :color="'orange'" style="height: 40px; width: 40px;" @click="modalCreate.show = true"><img src="../assets/svg/create.svg"></q-btn>

      <q-btn color="orange" label="Фильтр" style="margin: 1em">
        <q-menu
          transition-show="scale"
          transition-hide="scale"
        >
          <q-list style="min-width: 100px">
            <q-item clickable @click="filter = ''">
              <q-item-section>Все</q-item-section>
            </q-item>
            <q-item clickable @click="filter = 'global'">
              <q-item-section >Глобальные</q-item-section>
            </q-item>
            <q-item clickable @click="filter = 'Lemonilla'">
              <q-item-section>Lemonilla</q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn :color="'orange'" style="width: 300px; margin-left: 32vw" :to="'/shop/items'">Магазин предметов</q-btn>

    </div>
  <div class="q-pa-md row items-start q-gutter-md">

    <shop-group-card :item="item" :key="item.id" :server_sort="filter" v-for="item in items">

    </shop-group-card>
  </div>
  <q-pagination v-model="currentPage" color="orange" :max="maxPages"></q-pagination>
  <create-shop-group-dialog ref="modalCreate">

  </create-shop-group-dialog>
  </q-page>
</template>
<script>
import ShopGroupCard from "src/components/ShopGroupCard.vue";
import CreateShopGroupDialog from "src/components/dialogs/CreateShopGroupDialog.vue";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore, mapState } from "vuex";
import {Remap} from "src/router/function";
import {useRouter} from "vue-router";

export default defineComponent({
  components: { ShopGroupCard, CreateShopGroupDialog },
  setup() {
    const $store = useStore();
    const $router = useRouter()
    Remap($store, $router)
    var modalCreate = ref(false);
    var items = ref([]);
    var maxPages = ref(1);
    var currentPage = ref(1);
    let filter = ref('')
    async function fetchItems(page) {
      return await $store.dispatch("api/request", {
        url: "shop/group/page/" + page,
        method: "GET",
      });
    };
    fetchItems(0).then((v) => {
      if (v.ok) {
        items.value = v.data.data;
        console.log(v.data);
        maxPages.value = v.data.totalPages;
        currentPage.value = 1;
      }
    });
    var watcher = watch(
      () => currentPage.value,
      (value, oldValue) => {
        if (value != oldValue) {
          fetchItems(value - 1).then((v) => {
            if (v.ok) {
              users.value = v.data.data;
              console.log(v.data);
              maxPages.value = v.data.totalPages;
              currentPage.value = value;
            }
          });
        }
      }
    );
    return {
      fetchItems,
      items,
      currentPage,
      maxPages,
      modalCreate,
      isAdmin: computed(() => $store.getters["api/isAdmin"]),
      filter
    }
  },
})
</script>
