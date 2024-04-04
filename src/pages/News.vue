<template>
  <div style="margin: 10px;" >
    <q-btn v-if="isAdmin" :color="'orange'" style="height: 40px; width: 40px;" @click="modalCreate.show = true"><img src="../assets/svg/create.svg"></q-btn>
  </div>
  <div style="display: flex; flex-direction: column; justify-content: center; gap: 30px; margin-top: 20px; margin-bottom: 20px">
    <News_card :news-item="news" :key="news.id" v-for="news in Newses" style="margin-right: auto; margin-left: auto"/>
    <q-pagination v-model="currentPage" color="orange" :max="maxPages" style="margin-right: auto; margin-left: auto"></q-pagination>
  </div>
  <CreateNewsDialog ref="modalCreate" style="position: sticky; top: 0"></CreateNewsDialog>
</template>

<script>
import {computed, defineComponent, ref, watch} from "vue";
import ShopItemCard from "components/ShopItemCard.vue";
import CreateShopItemDialog from "components/dialogs/CreateShopItemDialog.vue";
import {useStore} from "vuex";
import News_card from "components/News_card.vue";
import CreateNewsDialog from "components/dialogs/CreateNewsDialog.vue";

export default defineComponent({
  components: {CreateNewsDialog, News_card},
  setup() {
    const $store = useStore();
    const Newses = ref(null)
    const maxPages = ref(1)
    const currentPage = ref(1)
    const modalCreate = ref(false)

    async function fetchNewses(page) {
      return await $store.dispatch("api/request", {
        url: "news/page/" + page,
        method: "GET",
      });
    };
    fetchNewses(0).then((v) => {
      if (v.ok) {
        Newses.value = v.data.data;
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
      Newses,
      maxPages,
      currentPage,
      modalCreate,
      isAdmin: computed(() => $store.getters["api/isAdmin"])
    }
  },
})
</script>
