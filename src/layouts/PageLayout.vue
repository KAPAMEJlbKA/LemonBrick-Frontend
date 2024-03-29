<script>
import { useQuasar } from 'quasar';
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from "vue-router"
import { mapState, useStore } from 'vuex';
import HeadAvatar from "components/utils/HeadAvatar.vue";

export default defineComponent({
  name: 'PageLayout',
  components: {HeadAvatar},

  setup() {
    const $router = useRouter()
    const $store = useStore()
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)

    return {
      tab: ref('mails'),
      leftDrawerOpen,
      isAuth: computed(() => $store.state.api.isAuth),
      user: computed(() => $store.state.api.user),
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
      },
      isAdmin: computed(() => $store.getters["api/isAdmin"]),
    }
  }
})
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="header" >
      <q-toolbar>
        <q-item class="logo-btn" clickable :to="'/'"><img src="../assets/icon.png" alt="logo" class="logo" ></q-item>
        <q-list class="nav">
          <q-item clickable :to="'/'" class="nav-element" active-class="nav-element-active">
            <q-item-section>
              <q-item-label>Главная</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable :to="'/news'" class="nav-element" active-class="nav-element-active">
            <q-item-section>
              <q-item-label>Новости</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable class="nav-element" active-class="nav-element-active">
            <q-item-section>
              <q-item-label>
                Карта
                <q-menu auto-close class="dropmenu">
                  <q-list dense class="dropmenu-list">
                    <q-item clickable :to="'/map'" class="dropmenu-item">
                      <q-item-section>Lemonila</q-item-section>
                    </q-item>

                  </q-list>
                </q-menu>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable :to="'/rules'" class="nav-element" active-class="nav-element-active">
            <q-item-section>
              <q-item-label>Правила</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable :to="'/about'" class="nav-element" active-class="nav-element-active">
            <q-item-section>
              <q-item-label>О нас</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-item v-if="isAuth === false" clickable :to="'/auth'" class="profile">
          <q-item-section>
            <q-item-label>Кабинет</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="isAuth === true" clickable class="profile" no-pointer-events>
          <q-item-section class="user">
            <span class="user-name">{{ user.username }}</span>
            <q-avatar size="40px" class="user-logo">
              <head-avatar :skin="user.assets ? user.assets.skin : null"></head-avatar>
            </q-avatar>
            <q-menu anchor="bottom end">
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <q-item clickable :to="'/cabinet'" class="dropmenu-item">
                    <q-item-section>Профиль</q-item-section>
                  </q-item>
                  <q-item clickable :to="'/shop/items'" class="dropmenu-item">
                    <q-item-section>Магазин</q-item-section>
                  </q-item>
                  <q-item v-if="isAdmin === true" clickable :to="'/admin'" class="dropmenu-item">
                    <q-item-section>Панель</q-item-section>
                  </q-item>
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-avatar size="72px">
                    <head-avatar :skin="user.assets ? user.assets.skin : null"></head-avatar>
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">{{ user.username }}</div>

                  <q-btn
                    color="orange"
                    label="Выйти"
                    push
                    size="sm"
                    v-close-popup
                    @click="logout"
                  />
                </div>
              </div>
            </q-menu>


              <!--q-menu auto-close class="dropmenu">
                <q-list dense class="dropmenu-list">
                  <q-item clickable :to="'/cabinet'" class="dropmenu-item">
                    <q-item-section>Профиль</q-item-section>
                  </q-item>
                  <q-item clickable class="dropmenu-item">
                    <q-item-section @click="logout">Выйти</q-item-section>
                  </q-item>
                </q-list>
              </q-menu-->
          </q-item-section>
        </q-item>
        <!--q-btn v-if="isAuth === true" flat icon="logout" @click="logout"></q-btn-->
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.logo-btn {
  margin-left: 5vw;
}
.logo {
  width: 2.8vw;
  height: auto;
}
.header {
  background-color: rgba(187, 187, 187, 0.13);
  border: none;
}
.nav {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
.nav-element {

}
.nav-element-active {
  border-bottom: 1px solid #ffffff;
}

.dropmenu {
  margin-left: -2vw;
  min-width: 100px;
  border-radius: 0px;
  background: none;
  color: #ffffff;
}
.dropmenu-item {
  margin-left: -12px;
}

.profile {
  margin-right: 5vw;
}
.user {
  height: 3vh;
}
.user-logo {
  margin-left: 1vw;
}
</style>
