<template>
    <q-card style="width: 300px; height: 165px">
      <q-card-section style="display: flex; gap: 30px; ">
        <div style="display: flex; flex-direction: column">
          <span style="font-weight: 600">Кого забанили:</span>
          {{ value.targetUsername }}
        </div>
        <div style="display: flex; flex-direction: column">
          <span style="font-weight: 600">Кто забанил:</span>
          {{ value.moderatorUsername }}
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div style="display: flex; flex-direction: column">
          <span style="font-weight: 600">Причина:</span>
          {{ value.reason ? value.reason : null }}
        </div>
      </q-card-section>
    </q-card>
</template>
<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore, mapState } from "vuex";
export default defineComponent({
  props: {
    value: {
      required: true,
    }
  },
  setup(props) {
    const $store = useStore();
    const $q = useQuasar();
    return {
    }
  }
})
</script>
<style>
.main {

}
</style>
