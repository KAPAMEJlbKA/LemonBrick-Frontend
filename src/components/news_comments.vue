<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore, mapState } from "vuex";
import EditShopGroupsDialog from "components/dialogs/EditShopGroupsDialog.vue";
import EditShopItemDialog from "components/dialogs/EditShopItemDialog.vue";
import EditNewsDialog from "components/dialogs/EditNewsDialog.vue";
export default defineComponent({
  components: {},
  props: {
    comments: {
      required: true,
    }
  },
  setup(props) {
    const $store = useStore();
    const $q = useQuasar();
    const modalEdit = ref(false)
    const user = ref(null)

    async function fetchUser(id) {
      return await $store.dispatch("api/request", {
        url: "users/id/" + id,
        method: "GET",
      });
    }
    fetchUser(props.comments.id).then((r) => {
      if (r.ok) {
        user.value = r.data;
        console.log(user)
      }
    })
    return {
      isAdmin: computed(() => $store.getters["api/isAdmin"]),
      modalEdit,
      user
    }
  }
})
</script>

<template>
  <p>{{user}}</p>
  <div>
    <q-chat-message
      name="Username"
      avatar=""
      :text="[comments.text]"
      bg-color="orange"
    />

  </div>

</template>

<style scoped>

</style>
