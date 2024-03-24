<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Редактирование</div>
        <q-space></q-space>
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>
      <q-card-section class="row items-center q-pb-none" v-if="page === ''">
        <q-btn color="white" text-color="black" label="Изминение названия" @click="page = 'EditName'"/>
      </q-card-section>
      <q-card-section class="row items-center q-pb-none" v-if="page === 'EditName'">
        <q-input v-model="name" label="Новое название"></q-input>
        <q-input v-model="description" label="Новое описание"></q-input>

        <q-btn flat color="primary" @click="UpdateName()">Загрузить</q-btn>
      </q-card-section>
      <q-card-actions>
        <q-btn flat color="primary" @click="send()">Загрузить</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref } from "vue";
import { useStore, mapState } from "vuex";

export default defineComponent({
  props: {
    itemId: {
      required: true
    }
  },
  emits: [],
  setup(props, context) {
    const $store = useStore();
    const $q = useQuasar();
    let show = ref(false);
    let page = ref('')
    const name = ref('')
    const description = ref('')
    async function UpdateName() {
      var result = await $store.dispatch("api/request", {
        url: "/shop/item/id/" + props.itemId + "/update",
        method: "POST",
        body: {
          displayName: name.value,
          description: description.value,
        },
      });
      if (result.ok) {
        $q.notify({
          "type": "positive",
          "message": "Товар создан"
        })
        show = false
      } else {
        var error = result.data
        $q.notify({
          "type": "negative",
          "message": "Ошибка при изминении товара: SC" + error.code + ": " + error.error
        })
      }
    }
    return {
      show,
      name,
      description,
      page,
      UpdateName
    };
  },
});
</script>
