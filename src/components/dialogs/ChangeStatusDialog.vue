<template>
  <q-dialog v-model="show">
    <q-card style="border-radius: 20px; display: flex; flex-direction: column;">
      <q-card-section class="row items-center q-pb-none" style="margin-left: auto; margin-right: auto">
        <div class="text-h6">Изменение статуса</div>
        <q-space></q-space>
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>
      <q-card-section style="margin-left: auto; margin-right: auto">
        <q-input filled v-model="status" label="Статус *" lazy-rules
          :rules="[val => val && val.length > 0 || 'Введите новый статус']">
        </q-input>
      </q-card-section>
      <q-card-actions style="margin-left: auto; margin-right: auto">
        <q-btn flat color="orange" @click="changeStatus">Изменить</q-btn>
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
    oldStatus: {
      required: true,
    },
  },
  setup(props) {
    const $store = useStore();
    const $q = useQuasar();
    const status = ref(props.oldStatus);
    let show = ref(false);
    return {
      async changeStatus() {
        var result = await $store.dispatch("api/request", {
          url: "cabinet/setstatus",
          method: "POST",
          body: {
            "status": status.value
          },
        });
        if (result.ok) {
          $q.notify({
            "type": "positive",
            "message": "Статус успешно изменен"
          })
          $store.commit("api/updateCurrentUserStatus", status.value)
          show = false
        } else {
          var error = result.data
          $q.notify({
            "type": "negative",
            "message": "Ошибка при смене статуса: SC" + error.code + ": " + error.error
          })
        }
      },
      status,
      show
    };
  },
});
</script>
