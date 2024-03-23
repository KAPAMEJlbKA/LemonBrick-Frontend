<template>
  <q-card v-if="item.server === server_sort || server_sort === ''">
    <q-card-section>
      {{ item.displayName }}
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <div class="flex flex-center" v-if="item.pictureUrl">
        <img :src="item.pictureUrl" height="128" width="128">
      </div>
    </q-card-section>
    <q-card-section>{{ item.description }}</q-card-section>
    <q-separator></q-separator>
    <q-card-actions>
      <q-input v-model.number="num" type="number"></q-input>
      <span style="margin: 1em">{{ item.server }}</span>
      <span style="margin: 1em"> {{ sum }} {{ item.currency }} </span>
      <q-btn flat color="blue" @click="buy" :enable="num >= 1">Купить</q-btn>
      <q-btn v-if="isAdmin" flat color="primary" @click="editName">Изменить имя</q-btn>
    </q-card-actions>
  </q-card>

</template>

<script>
import {useQuasar} from "quasar";
import {computed, defineComponent, ref, watch} from "vue";
import {useStore, mapState} from "vuex";
import ChangeNameShopItemDialog from "components/dialogs/ChangeNameShopItemDialog.vue";

export default defineComponent({
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
    var sum = computed(() => {
      return props.item.price * num.value;
    });

    const isAdmin = computed(() => {
      return $store.getters["api/isAdmin"];
    });

    const editName = () => {
      // Открытие диалогового окна редактирования имени продукта
      // Например, можно использовать Vuex для хранения текущего выбранного продукта,
      // чтобы передать его в диалоговое окно редактирования имени
      $store.commit('setCurrentProduct', props.item); // Предполагается, что есть мутация для установки текущего продукта в хранилище
      $store.commit('setEditNameDialogVisible', true); // Предполагается, что есть мутация для установки видимости диалогового окна редактирования имени
    }

    const buy = async () => {
      var result = await $store.dispatch("api/request", {
        url: "shop/item/buy",
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
        });
      } else {
        var error = result.data;
        $q.notify({
          "type": "negative",
          "message": "Ошибка при покупке: SC" + error.code + ": " + error.error
        });
      }
    };

    return {
      num,
      sum,
      isAdmin,
      editName,
      buy
    };
  }
});
</script>
