<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore, mapState } from "vuex";
import EditShopGroupsDialog from "components/dialogs/EditShopGroupsDialog.vue";
import EditShopItemDialog from "components/dialogs/EditShopItemDialog.vue";
import EditNewsDialog from "components/dialogs/EditNewsDialog.vue";
import {useRouter} from "vue-router";
export default defineComponent({
  components: {EditNewsDialog},
  props: {
    newsItem: {
      required: true,
    }
  },
  setup(props) {
    const $store = useStore();
    const $router = useRouter();
    const $q = useQuasar();
    const modalEdit = ref(false)
    async function go() {
      await $router.push("news/" + props.newsItem.id);
    }
    return {
      isAdmin: computed(() => $store.getters["api/isAdmin"]),
      modalEdit,
      go
    }
  }
})
</script>

<template>
  <q-card style="width: 700px; height: 650px; border-radius: 15px; margin-bottom: 30px" >
    <q-card-section style="display: flex">
      <img src="../assets/poster.jpeg" height="400" width="665" style="margin-left: auto; margin-right: auto; border-radius: 15px">
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section style="display: flex; flex-direction: column; height: 160px;">
      <h6 style="font-weight: 600; margin-top: 0; margin-bottom: 10px">{{newsItem.header}}</h6>
      <span>{{newsItem.miniText}}</span>
      <span>{{newsItem.text}}</span>
    </q-card-section>
    <q-card-actions>
      <div style="margin-left: auto">
        <q-btn v-if="isAdmin" flat @click="modalEdit.show = true" ><img src="../assets/svg/edit.svg" alt="Edit"></q-btn>
        <q-btn flat @click="go" ><img src="../assets/svg/next.svg" alt="Edit"></q-btn>
      </div>
    </q-card-actions>
  </q-card>
  <edit-news-dialog ref="modalEdit" :news-id="newsItem.id"></edit-news-dialog>
</template>

<style scoped>

</style>
