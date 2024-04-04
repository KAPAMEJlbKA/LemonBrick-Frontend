<template>
  <q-dialog v-model="show">
    <q-card style="border-radius: 20px; display: flex; flex-direction: column;">
      <q-card-section class="row items-center q-pb-none" style="margin-left: auto; margin-right: auto">
        <div class="text-h6">Создание нового товара (предмет)</div>
        <q-space></q-space>
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>
      <q-card-section style="margin-left: auto; margin-right: auto; width: 95%">
        <q-input v-model="displayName" color="orange" label="Отображаемое имя"></q-input>
        <q-input outlined v-model="description" color="orange" type="textarea" label="Описание"></q-input>
        <q-input v-model="price" color="orange" label="Цена"></q-input>
        <q-input v-model="currency" color="orange" label="Валюта"></q-input>
        <UploadFile ref="file"></UploadFile>
        <q-separator></q-separator>
        <q-input v-model="itemName" color="orange" label="Имя или id предмета в minecraft"></q-input>
        <q-input v-model="itemExtra" color="orange" label="Extra предмета в minecraft"></q-input>
        <q-input v-model="itemNbt" color="orange" type="textarea" label="NBT предмета в minecraft"></q-input>
        <q-input v-model="itemCustom" color="orange" label="Custom предмета в minecraft (зарезервировано)"></q-input>
        <q-input v-model="itemQuantity" color="orange" label="Число предметов при покупке 1шт" type="number"></q-input>
        <q-item-label style="font-size: 1.1em; padding-top: 1rem; padding-bottom: 1rem">{{server}}</q-item-label>
        <q-btn color="orange" v-model="server" label="Выбрать сервер">
          <q-menu
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="server = 'global'">
                <q-item-section >Глобальные</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="server = 'Lemonilla'">
                <q-item-section>Lemonilla</q-item-section>
              </q-item>
              <q-separator />
            </q-list>
          </q-menu>
        </q-btn>
      </q-card-section>
      <q-card-actions style="margin-left: auto; margin-right: auto">
        <q-btn flat color="orange" @click="send()">Загрузить</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref } from "vue";
import { useStore, mapState } from "vuex";
import UploadFile from "./UploadFile.vue";

export default defineComponent({
  props: {
  },
  emits: [],
  components: { UploadFile },
  setup(props, context) {
    const $store = useStore();
    const $q = useQuasar();
    let show = ref(false);
    var displayName = ref("");
    var description = ref("");
    var itemName = ref("minecraft:stone");
    var itemExtra = ref("");
    var itemNbt = ref("{}");
    var itemCustom = ref("");
    var itemQuantity = ref(1);
    var server = ref("global");
    var price = ref(100.0);
    var currency = ref("LEM");
    var file = ref(null);
    async function send() {
      var result = await $store.dispatch("api/request", {
          url: "shop/item/new",
          method: "PUT",
          body: {
            displayName: displayName.value,
            description: description.value,
            itemName: itemName.value,
            itemExtra: itemExtra.value,
            itemNbt: itemNbt.value,
            itemCustom: itemCustom.value,
            itemQuantity: itemQuantity.value,
            server: server.value,
            price: price.value,
            currency: currency.value,
            pictureName: file.value.name
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
            "message": "Ошибка при создании товара: SC" + error.code + ": " + error.error
          })
        }
    }
    return {
      show,
      displayName,
      description,
      itemName, itemExtra,
      itemNbt,
      itemCustom,
      itemQuantity,
      server,
      price,
      currency,
      file,
      send
    };
  },
});
</script>
