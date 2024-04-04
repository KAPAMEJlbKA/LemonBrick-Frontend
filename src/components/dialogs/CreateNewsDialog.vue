<template>
  <q-dialog v-model="show" >
    <q-card class="q-dialog-plugin" style="border-radius: 20px; display: flex; flex-direction: column;">
      <q-card-section class="row items-center q-pb-none" style="margin-left: auto; margin-right: auto">
        <div class="text-h6">Создание новой новости</div>
        <q-space></q-space>
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>
      <q-card-section style="margin-left: auto; margin-right: auto; width: 95%">
        <UploadFile ref="file"></UploadFile>
        <q-input v-model="Header" color="orange" label="Название"></q-input>
        <q-input v-model="miniText" color="orange" label="Краткий вариант новости"></q-input>
        <q-input outlined v-model="Text" color="orange" type="textarea" label="Новость"></q-input>
        <q-separator></q-separator>
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
    const Header = ref("")
    const miniText = ref("")
    const Text = ref("")
    var file = ref(null);
    async function send() {
      var result = await $store.dispatch("api/request", {
        url: "/news/new",
        method: "PUT",
        body: {
          header: Header.value,
          miniText: miniText.value,
          text: Text.value,
          PictureName: file.value.name
        },
      });
      if (result.ok) {
        $q.notify({
          "type": "positive",
          "message": "Новость создана"
        })
        show = false
      } else {
        var error = result.data
        $q.notify({
          "type": "negative",
          "message": "Ошибка при создании новости: SC" + error.code + ": " + error.error
        })
      }
    }
    return {
      show,
      Header,
      miniText,
      Text,
      file,
      send
    };
  },
});
</script>
