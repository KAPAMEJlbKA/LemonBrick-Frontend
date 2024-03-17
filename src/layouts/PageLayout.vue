<script>
import { useQuasar } from 'quasar';

import { defineComponent, ref, computed } from 'vue'
import { useRouter } from "vue-router"
import { mapState, useStore } from 'vuex';

export default defineComponent({
  name: 'Pagelayout',

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
      async logout() {
        var result = await $store.dispatch("api/request", {
          url: "auth/logout",
          method: "POST",
          body: {
          },
        });
        if (result.ok) {
          $store.commit("api/setAuth", false)
          localStorage.removeItem("session")
          $router.push("/auth")
        } else {
          var error = result.data;
          $q.notify({
            "type": "negative",
            "message": "Ошибка при выходе: SC" + error.code + ": " + error.error
          })
        }
      }
    }
  }
})
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-item clickable :to="'/'" class="logo-btn"><img src="../assets/icon.png" alt="logo" class="logo"></q-item>

        <q-toolbar-title v-if="isAuth === true">
          LemonBrick Вход выполнен.
        </q-toolbar-title>
        <q-toolbar-title v-if="isAuth === false">
          LemonBrick Начни играть с нами!
        </q-toolbar-title>
        <q-btn v-if="isAuth === true" flat icon="logout" @click="logout"></q-btn>
      </q-toolbar>
    </q-header>

    <!--q-drawer class="leftMenu" v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label style="color:white" header>
          Меню
        </q-item-label>
        <q-item clickable :to="'/main'">
          <q-item-section>
            <q-item-label>Главная</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="isAuth === true ? '/cabinet' : '/auth'">
          <q-item-section>
            <q-item-label>Кабинет</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="isAuth === true" clickable to="/users">
          <q-item-section>
            <q-item-label>Пользователи</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="isAuth === true" clickable to="/shop/items">
          <q-item-section>
            <q-item-label>Магазин предметов</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="isAuth === true" clickable to="/shop/groups">
          <q-item-section>
            <q-item-label>Магазин привилегий</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="isAuth === true" clickable to="/banlist">
          <q-item-section>
            <q-item-label>Бан Лист</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer-->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.logo-btn {
  width: 3vw;
}
.logo {
  width: 2.5vw;
  height: auto;
}
.header {
  background-color: rgba(255, 144, 0, 0);
  border: none;
}
</style>
