<script>
import { computed, defineComponent, ref} from "vue";
import { useStore, mapState } from "vuex";
import {CheckAdmin, Remap} from "src/router/function";
import {useRouter} from "vue-router";
import Profile from "components/Profile.vue";
import {isAdmin} from "src/store/module-api/getters";

export default defineComponent({
  components: {Profile},
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const isAdmin = computed(() => $store.getters["api/isAdmin"])
    Remap($store, $router)
    CheckAdmin(isAdmin.value, $router)
    return {
      isAdmin,
      user: computed(() => $store.state.api.user)
    }
  },
})
</script>

<template>
  <q-page class="flex flex-center">

    <profile :user="user" :owner="true">

    </profile>
  </q-page>
</template>

