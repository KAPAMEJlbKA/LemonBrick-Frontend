<template>

  <q-card style="width: 300px; height: 300px; background-color: #f6f6f6; border-radius: 30px; display: flex; flex-direction: column;">
    <q-card-section style="margin-left: auto; margin-right: auto; padding: 0">
      <div class="text-h6" style="margin-bottom: 20px; margin-top: 20px">Вход в личный кабинет</div>
      <q-input rounded standout v-model="username" style="margin-bottom: 10px" bg-color="white" label="Ваш логин или email" lazy-rules :rules="[
       (val) => (val && val.length > 0) || 'Это поле не может быть пустым',
      ]"></q-input>
      <q-input rounded standout v-model="password" style="margin-bottom: 10px" bg-color="white" label="Ваш пароль" type="password" lazy-rules :rules="[
        (val) => (val && val.length > 0) || 'Это поле не может быть пустым',
      ]"></q-input>
      <q-input v-if="require2FA" rounded standout v-model="totp" style="margin-bottom: 10px" bg-color="white" label="Введите код 2FA" type="password" lazy-rules :rules="[
        (val) => (val && val.length > 0) || 'Это поле не может быть пустым',
      ]"></q-input>
    </q-card-section>
    <q-card-actions style="margin-left: auto; margin-right: auto; padding: 0">
      <q-btn rounded color="orange" style="width: 200px" @click="authorize">Войти</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const $q = useQuasar();
    const username = ref("");
    const password = ref("");
    const totp = ref(null);
    var require2FA = ref(false);
    return {
      async authorize() {
        var result = await $store.dispatch("api/request", {
          url: "auth/authorize",
          method: "POST",
          body: {
            username: username.value,
            password: password.value,
            totpPassword: totp.value
          },
        });
        console.log(result);
        if (result.ok) {
          localStorage.setItem("session", JSON.stringify(result.data))
          $store.dispatch("api/setup", {})
          console.log("Authorization successful")
          setTimeout(() => $router.push("/cabinet"), 500)
        } else if(result.data.error == "auth.require2fa") {
          require2FA.value = true;
        } else {
          var error = result.data;
          $q.notify({
            "type": "negative",
            "message": "Ошибка при авторизации: SC" + error.code + ": " + error.error
          })
        }
      },
      redirectRegister() {
        $router.push("/register")
      },
      username,
      password,
      require2FA,
      totp
    };
  }
});
</script>
