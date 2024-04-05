<template>
  <div style="display: flex; flex-direction: column; justify-content: center; margin-top: 20px; margin-bottom: 20px">
    <div style="margin-right: auto; margin-left: auto;">
      <Full_News :news-item="Newses"  />
    </div>
  </div>
</template>

<script>

import { computed, ref, defineComponent } from "vue";
import { useStore, mapState } from "vuex";
import { useRoute } from "vue-router"
import {CheckAdmin, Remap} from "src/router/function";
import {isAdmin} from "src/store/module-api/getters";
import Full_News from "components/Full_News.vue";
import News_card from "components/News_card.vue";

export default defineComponent({
  components: {News_card, Full_News},
  name: "PageCabinet",
  setup() {
    const Newses = ref(null)
    var err404 = ref(false);
    const $store = useStore();
    const $router = useRoute();
    const isAdmin = computed(() => $store.getters["api/isAdmin"])
    Remap($store, $router)
    async function fetchNews(id) {
      console.log(id)
      return await $store.dispatch("api/request", {
        url: "news/id/" + id ,
        method: "GET",
      });
    }
    fetchNews($router.params.id).then((r) => {
      console.log(r)
      if (r.code === 404) {
        err404.value = true;
      }
      if (r.ok) {
        Newses.value = r.data;
        console.log(Newses)
      }
    })
    return {
      Newses,
      err404,
      fetchNews
    };
  },
});
</script>
