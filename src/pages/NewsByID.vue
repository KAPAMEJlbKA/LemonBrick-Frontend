<template>
  <div v-if="Newses" style="display: flex; flex-direction: column; justify-content: center; margin-top: 20px; margin-bottom: 20px">
    <div style="margin-right: auto; margin-left: auto;">
      <q-card style="width: 700px; border-radius: 15px; margin-bottom: 30px" >
        <q-card-section style="display: flex">
          <img :src="Newses.poster" height="400" width="665" style="margin-left: auto; margin-right: auto; border-radius: 15px">
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section style="display: flex; flex-direction: column; height: 160px;">
          <h6 style="font-weight: 600; margin-top: 0; margin-bottom: 10px">{{ Newses.header }}</h6>
          <span>{{ Newses.text }}</span>
        </q-card-section>
      </q-card>
      <q-card style="width: 700px; border-radius: 15px; margin-bottom: 30px">
        <q-card-section>
          <News_comments :comments="comment" :news="Newses" :key="comment.id" v-for="comment in Newses.comments"/>
        </q-card-section>
        <q-card-actions>
          <div style="display: flex;">
            <q-input filled v-model="text" label="Новый коментарий.." style="width: 400px; padding: 5px"/>
            <q-btn flat @click="SendComment" ><img src="../assets/svg/next.svg" alt="Edit"></q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>

import { ref, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router"
import { Remap } from "src/router/function";
import News_comments from "components/news_comments.vue";

export default defineComponent({
  name: "PageCabinet",
  components: {News_comments},
  setup() {
    const Newses = ref(null);
    const err404 = ref(false);
    const $store = useStore();
    const $router = useRoute();
    const text = ref("")
    Remap($store, $router);

    async function fetchNews(id) {
      try {
        const response = await $store.dispatch("api/request", {
          url: "news/id/" + id,
          method: "GET",
        });
        if (response.code === 404) {
          err404.value = true;
        }
        if (response.ok) {
          console.log(response)
          Newses.value = response.data;
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    fetchNews($router.params.id);

    async function SendComment() {
      const id = $router.params.id
      const response = await $store.dispatch("api/request", {
        url: "news/id/" + id + "/newcomment",
        method: "PUT",
        body: {
          text: text.value
        }
      });
    }


    return {
      Newses,
      err404,
      text,
      SendComment
    };
  },
});
</script>
