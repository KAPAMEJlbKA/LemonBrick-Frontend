<template>
    <q-page>
        <div class="q-pa-md row items-start q-gutter-md">
          <ban-card :value="item" :key="item.id" v-for="item in items" />
        </div>
        <q-pagination v-model="currentPage" color="orange" :max="maxPages"></q-pagination>
    </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore, mapState } from "vuex";
import BanCard from 'src/components/BanCard.vue';
import {CheckAdmin, Remap} from "src/router/function";
import {useRouter} from "vue-router";

export default defineComponent({
    components: { BanCard },
    name: 'PageBanlist',
    setup(props) {
        const $store = useStore();
        const $router = useRouter();
        const isAdmin = computed(() => $store.getters["api/isAdmin"])
        Remap($store, $router)
        CheckAdmin(isAdmin, $router)
        const $q = useQuasar();
        var items = ref([]);
        var maxPages = ref(1);
        var currentPage = ref(1);
        async function fetchItems(page) {
            return await $store.dispatch("api/request", {
                url: "banlist/page/" + page,
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
        return {
            fetchItems,
            items,
            currentPage,
            maxPages
        }
    }
})
</script>
