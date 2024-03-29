<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Редактирование</div>
        <q-space></q-space>
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>
      <q-card-section class="row items-center q-pb-none" style="flex-direction: column;" v-if="page === ''">
        <q-btn color="white" style="margin-bottom: 10px; width: 220px" text-color="black" label="Изминение названия" @click="page = 'EditName'"/>
        <q-btn color="red" style="margin-bottom: 10px; width: 220px" text-color="black" label="Изминение иконку" @click="page = 'EditIcon'"/>
        <q-btn color="white" style="margin-bottom: 10px; width: 220px" text-color="black" label="Изминение цены" @click="page = 'EditPrice'"/>
        <q-btn color="red" style="margin-bottom: 10px; width: 220px" text-color="black" label="Изминение лимитов" @click="page = 'EditLimit'"/>
      </q-card-section>
      <q-card-section class="row items-center q-pb-none" style="flex-direction: column;" v-if="page === 'EditName'">
        <q-input v-model="name" style="margin-bottom: 10px; width: 220px" label="Новое название"></q-input>
        <q-input v-model="description" style="margin-bottom: 10px; width: 220px" label="Новое описание"></q-input>
        <q-btn flat color="primary" style="margin-bottom: 10px; width: 220px" @click="UpdateName()">Загрузить</q-btn>
      </q-card-section>
      <q-card-section class="row items-center q-pb-none" style="flex-direction: column;" v-if="page === 'EditIcon'">
        <UploadFileStore ref="Icon" :item-id="itemId" style="margin-bottom: 10px; width: 220px"></UploadFileStore>
        <q-btn flat color="primary" style="margin-bottom: 10px; width: 220px" @click="UpdateIcon()">Загрузить</q-btn>
      </q-card-section>
      <q-card-section class="row items-center q-pb-none" style="flex-direction: column;" v-if="page === 'EditPrice'">
        <q-input v-model="price" style="margin-bottom: 10px; width: 220px" label="Новая цена"></q-input>
        <q-btn flat color="primary" style="margin-bottom: 10px; width: 220px" @click="UpdatePrice()">Загрузить</q-btn>
      </q-card-section>
      <q-card-section class="row items-center q-pb-none" style="flex-direction: column;" v-if="page === 'EditLimit'">
        <q-input v-model="time" style="margin-bottom: 10px; width: 220px" filled type="time"/>
        <q-input v-model="data" style="margin-bottom: 10px; width: 220px" filled type="date"/>
        <q-input v-model="count" style="margin-bottom: 10px; width: 220px" label="Новае количество"></q-input>
        <q-btn flat color="primary" style="margin-bottom: 10px; width: 220px" @click="UpdateLimits()">Загрузить</q-btn>
      </q-card-section>
    </q-card>

  </q-dialog>
</template>
<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref } from "vue";
import { useStore, mapState } from "vuex";
import UploadFile from "components/dialogs/UploadFile.vue";
import UploadFileStore from "components/dialogs/UploadFileStore.vue";

export default defineComponent({
  components: {UploadFileStore},
  props: {
    itemId: {
      required: true
    }
  },
  emits: ["update"],
  setup(props, context) {
    const $store = useStore();
    const $q = useQuasar();
    let show = ref(false);
    let page = ref('')
    const name = ref('')
    const description = ref('')
    const Icon = ref(null)
    const price = ref(100.0)
    const time = ref(null)
    const data = ref(null)
    const count = ref(0)
    async function UpdateName() {
      var result = await $store.dispatch("api/request", {
        url: "/shop/item/id/" + props.itemId + "/update",
        method: "POST",
        body: {
          displayName: name.value,
          description: description.value,
        },
      });
      console.log(result)
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
    async function UpdateIcon() {
      var response = await $store.dispatch("api/request", {
        url: "/shop/item/id/" + props.itemId + "/picup",
        method: "POST",
        body: {
          pictureUrl: Icon.value.name
        },
      });
      console.log(response)
      console.log(Icon.value.name)
      if (response.ok) {
        $q.notify({
          "type": "positive",
          "message": "Скин успешно загружен"
        })
        show = false
      } else {
        var error = await response.json()
        $q.notify({
          "type": "negative",
          "message": "Ошибка при загрузке скина: SC" + error.code + ": " + error.error
        })
      }
    }
    async function UpdatePrice() {
      var result = await $store.dispatch("api/request", {
        url: "/shop/item/id/" + props.itemId + "/setprice",
        method: "POST",
        body: {
          price: price.value
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
    async function UpdateLimits() {
      console.log('debug')
      var result = await $store.dispatch("api/request", {
        url: "shop/item/id/" + props.itemId + "/setlimitations",
        method: "POST",
        body: {
            endDate: `${data.value}T${time.value}.000Z}`,
            count: count.value,
            groupName: null
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
      Icon,
      price,
      time,
      data,
      count,
      description,
      page,
      UpdateName,
      UpdateIcon,
      UpdatePrice,
      UpdateLimits
    };
  },
});
</script>
