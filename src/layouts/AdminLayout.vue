<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="header">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-btn flat icon="logout" @click="redirectMain"></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer class="leftMenu" v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item clickable active-class="active" :to="'/admin'">
          <q-item-section>
            <q-item-label>Главная</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable active-class="active" to="/users">
          <q-item-section>
            <q-item-label>Пользователи</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable active-class="active" to="/banlist">
          <q-item-section>
            <q-item-label>Бан Лист</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar';

import { defineComponent, ref, computed } from 'vue'
import { useRouter } from "vue-router"
import { mapState, useStore } from 'vuex';
import router from "src/router";

export default defineComponent({
  name: 'MainLayout',
  methods: {router},

  setup() {
    const $router = useRouter()
    const $store = useStore()
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      isAuth: computed(() => $store.state.api.isAuth),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      redirectMain() {
        $router.push("/")
      },
    }
  }
})
</script>
<style>
.header {
  background-color: orange;
}
.active {
  color: orange;
}
</style>
