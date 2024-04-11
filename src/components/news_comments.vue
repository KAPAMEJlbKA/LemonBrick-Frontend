<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore, mapState } from "vuex";
import EditShopGroupsDialog from "components/dialogs/EditShopGroupsDialog.vue";
import EditShopItemDialog from "components/dialogs/EditShopItemDialog.vue";
import EditNewsDialog from "components/dialogs/EditNewsDialog.vue";
import HeadAvatar from "components/utils/HeadAvatar.vue";

export default defineComponent({
  components: {HeadAvatar},
  props: {
    comments: {
      required: true,
    },
    news: {
      required: true,
    }
  },
  setup(props) {
    const $store = useStore();
    const $q = useQuasar();
    const modalEdit = ref(false)
    const Current_User = ref(null)

    async function fetchUser(id) {
      return await $store.dispatch("api/request", {
        url: "users/id/" + id + "?assets=true",
        method: "GET",
      });
    }

    async function deleteComments() {
      return await $store.dispatch("api/request", {
        url: "news/id/" + props.news.id + "/comment/" + props.comments.id,
        method: "DELETE"
      });
    }

    fetchUser(props.comments.userId).then((r) => {
      if (r.ok) {
        Current_User.value = r.data;
      } else {
        console.error("Failed to fetch user:", r.error);
      }
    }).catch((error) => {
      console.error("Error fetching user:", error);
    });

    return {
      isAdmin: computed(() => $store.getters["api/isAdmin"]),
      modalEdit,
      Current_User,
      deleteComments
    }
  }
})
</script>

<template>
  <div style="display: flex">
    <q-avatar size="35px" style="margin-top: 30px; margin-right: 12px">
      <head-avatar v-if="Current_User" :skin="Current_User.assets ? Current_User.assets.skin : null"></head-avatar>
    </q-avatar>
    <q-chat-message v-if="Current_User" :name="[Current_User.username]" :text="[comments.text]" bg-color="orange" />
    <q-item v-if="isAdmin">
      <img src="../assets/ellipsis-vertical.png" alt="" width="23" height="20" style="margin-top: 40px">
      <q-menu anchor="bottom end">
        <q-item clickable @click="deleteComments">
          <q-item-section>Удалить</q-item-section>
        </q-item>
      </q-menu>
    </q-item>
  </div>
</template>

<style scoped>
</style>
