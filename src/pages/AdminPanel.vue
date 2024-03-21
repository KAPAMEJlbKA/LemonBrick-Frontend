<template>
  <div style="margin: 10px;" v-if="isAdmin">
    <q-btn @click="modalCreate.show = true">Создать</q-btn>
    </div>
</template>


<script setup>
import {defineComponent, ref} from "vue";
import BanCard from "components/BanCard.vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {Remap} from "src/function";
import {useQuasar} from "quasar";

export default defineComponent({
  name: 'PageAdminPanel',
  setup() {
    const $store = useStore();
    const $router = useRouter();
    Remap($store, $router)
    return {
    }
  }
})
</script>
<style scoped>

</style>
