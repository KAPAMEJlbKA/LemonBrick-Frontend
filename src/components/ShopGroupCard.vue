<template>
  <q-card v-if="item.server === server_sort || server_sort === ''" style="width: 360px; height: 370px">
    <q-card-section>
      {{ item.displayName }}
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <div class="flex flex-center">
        <img :src="item.pictureUrl" height="128" width="128">
      </div>
    </q-card-section>
    <q-card-section style="height: 80px">{{ item.description }}</q-card-section>
    <q-separator></q-separator>
    <q-card-actions>
      <q-input v-model.number="num" type="number" style="width: 50px;"></q-input>
      <span style="margin-left: 1em">{{ item.server }}</span>
      <span style="margin: 1em"> {{ sum }} {{ item.currency }} </span>
      <q-btn flat color="orange" @click="buy"  :enable="num >= 1">Купить</q-btn>
      <q-btn v-if="isAdmin" flat color="orange" @click="modalEdit.show = true" ><img src="../assets/svg/edit.svg" alt="Edit"></q-btn>
    </q-card-actions>
  </q-card>
  <edit-shop-groups-dialog ref="modalEdit" :item-id="item.id"></edit-shop-groups-dialog>
</template>
<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore, mapState } from "vuex";
import EditShopGroupsDialog from "components/dialogs/EditShopGroupsDialog.vue";
export default defineComponent({
  components: {EditShopGroupsDialog},
  props: {
    item: {
      required: true,
    },
    server_sort: {
      required: true,
    }
  },
  setup(props) {
    const $store = useStore();
    const $q = useQuasar();
    var num = ref(1);
    var modalEdit = ref(false);
    var sum = computed(() => {
      return props.item.price * num.value;
    })
    const isAdmin = computed(() => {
      return $store.getters["api/isAdmin"];
    });
    return {
      async buy() {
        var result = await $store.dispatch("api/request", {
          url: "shop/group/buy",
          method: "POST",
          body: {
            "id": props.item.id,
            "quantity": num.value
          },
        });
        if (result.ok) {
          $q.notify({
            "type": "positive",
            "message": "Покупка успешно совершена"
          })
        } else {
          var error = result.data
          $q.notify({
            "type": "negative",
            "message": "Ошибка при покупке: SC" + error.code + ": " + error.error
          })
        }
      },
      num, sum, modalEdit, isAdmin
    }
  }
})
</script>
