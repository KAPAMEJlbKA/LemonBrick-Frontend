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
      <q-btn :color="'orange'" style="width: 300px; margin-left: 32vw" :to="'/shop/groups'">Магазин привилегий</q-btn>

    </div>
  <div class="q-pa-md row items-start q-gutter-md" :key="filter">

    <shop-item-card :item="item" :server_sort="filter" :key="item.id" v-for="item in items">
    </shop-item-card>
  </div>
  <q-pagination v-model="currentPage" color="orange" :max="maxPages"></q-pagination>
  <create-shop-item-dialog ref="modalCreate">

</create-shop-item-dialog>
  </q-page>
</template>
<script>
import ShopItemCard from "src/components/ShopItemCard.vue";
import CreateShopItemDialog from "src/components/dialogs/CreateShopItemDialog.vue";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore, mapState } from "vuex";
import {Remap} from "src/router/function";
import {useRouter} from "vue-router";

export default defineComponent({
  components: { ShopItemCard, CreateShopItemDialog },
  setup() {
    const $store = useStore();
    const $router = useRouter();
    Remap($store, $router)
    var modalCreate = ref(false);
    var items = ref([]);
    var maxPages = ref(1);
    var currentPage = ref(1);
    let filter = ref('')

    async function fetchItems(page) {
      return await $store.dispatch("api/request", {
        url: "shop/item/page/" + page,
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
      filter,
      isAdmin: computed(() => $store.getters["api/isAdmin"])
    }
  },
})
</script>
