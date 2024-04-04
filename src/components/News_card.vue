<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore, mapState } from "vuex";
import EditShopGroupsDialog from "components/dialogs/EditShopGroupsDialog.vue";
import EditShopItemDialog from "components/dialogs/EditShopItemDialog.vue";
export default defineComponent({
  components: {},
  props: {
    newsItem: {
      required: true,
    }
  },
  setup(props) {
    const $store = useStore();
    const $q = useQuasar();
    return {
      isAdmin: computed(() => $store.getters["api/isAdmin"])
    }
  }
})
</script>

<template>
  <q-card style="width: 700px; height: 650px; border-radius: 15px" >
    <q-card-section style="display: flex">
      <img src="../assets/poster.jpeg" height="400" width="665" style="margin-left: auto; margin-right: auto; border-radius: 15px">
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section style="display: flex; flex-direction: column">
      <h6 style="font-weight: 600; margin-top: 0; margin-bottom: 10px">{{newsItem.header}}</h6>
      <span>{{newsItem.text}}</span>
    </q-card-section>
    <q-card-actions>
      <!--div><q-btn v-if="isAdmin" flat color="orange" @click="modalEdit.show = true" ><img src="../assets/svg/edit.svg" alt="Edit"></q-btn></div-->
    </q-card-actions>
  </q-card>
</template>

<style scoped>

</style>
