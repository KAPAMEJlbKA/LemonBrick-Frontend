<template>
  <q-dialog v-model="show">
    <q-card style="border-radius: 20px; display: flex; flex-direction: column;">
      <q-card-section class="row items-center q-pb-none" style="margin-left: auto; margin-right: auto">
        <div class="text-h6">Редактирование</div>
        <q-space></q-space>
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>
      <q-card-section class="row items-center q-pb-none" style="flex-direction: column;">
        <q-input v-model="header" color="orange" label="Название" style="margin-bottom: 10px; width: 300px"></q-input>
        <q-input v-model="miniText" color="orange" label="Мини текст" style="margin-bottom: 10px; width: 300px"></q-input>
        <q-input outlined v-model="text" type="textarea" label="Текст" style="margin-bottom: 10px; width: 300px"></q-input>
        <UploadFile ref="Icon" style="margin-bottom: 10px; width: 300px"></UploadFile>
        <q-btn flat color="orange" style="margin-bottom: 10px; width: 220px" @click="UpdateAll()">Загрузить</q-btn>
      </q-card-section>
    </q-card>

  </q-dialog>
</template>
<script>
import { useQuasar } from "quasar";
import {computed, defineComponent, ref, watch} from "vue";
import { useStore, mapState } from "vuex";
import UploadFile from "components/dialogs/UploadFile.vue";
import UploadFileStore from "components/dialogs/UploadFileStore.vue";

export default defineComponent({
  components: {UploadFile, UploadFileStore},
  props: {
    newsId: {
      required: true
    }
  },
  emits: ["update"],
  setup(props, context) {
    const $store = useStore();
    const $q = useQuasar();
    let show = ref(false);
    let page = ref('')
    const header = ref('')
    const miniText = ref('')
    const Icon = ref(null)
    const text = ref(100.0)

    async function fd() {
      const fd = new FormData();
      fd.append("file", Icon.value);
      var response1 = await fetch($store.state.api.url + "admin/upload/simpleupload", {
        "method": "POST",
        "body": fd
      })
    }
    watch(() => Icon.value, (value, oldValue) => {
      if(value) {
        fd();
      }
    })
    async function UpdateAll() {
      var result = await $store.dispatch("api/request", {
        url: "news/id/" + props.newsId + "/update",
        method: "PUT",
        body: {
          header: header.value,
          miniText: miniText.value,
          text: text.value
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
      name,
      Icon,
      header,
      miniText,
      text,
      UpdateAll
    };
  },
});
</script>
