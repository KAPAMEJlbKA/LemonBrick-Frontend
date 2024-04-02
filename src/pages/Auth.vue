<template>
  <q-page class="flex flex-center" style="display: flex; flex-direction: column">
    <img src="../assets/icon.png" alt="" width="200px" height="200px" style="margin-top: -100px">
    <auth-pane />
  </q-page>
</template>

<script>
import AuthPane from 'src/components/AuthPane.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { AuthPane },
  name: 'PageIndex'
})
</script>
