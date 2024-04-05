<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore, mapState } from "vuex";
import EditNewsDialog from "components/dialogs/EditNewsDialog.vue";
export default defineComponent({
  components: {EditNewsDialog},
  props: {
    newsItem: {
      required: true,
    }
  },
  setup(props) {
    const $store = useStore();
    const $q = useQuasar();
    const modalEdit = ref(false)
    return {
      isAdmin: computed(() => $store.getters["api/isAdmin"]),
      modalEdit
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
      <span>{{newsItem.text}}</span>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
