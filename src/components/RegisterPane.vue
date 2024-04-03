<template>
  <q-card style="width: 350px; height: 480px; background-color: #f6f6f6; border-radius: 30px; display: flex; flex-direction: column;">
    <q-card-section style="margin-left: auto; margin-right: auto; padding: 0; display: flex; flex-direction: column">
      <div class="text-h6" style="margin-bottom: 20px; margin-top: 20px">Регистрация</div>
      <q-input rounded standout v-model="username"  style="margin-bottom: 10px" bg-color="white" label="Ваш логин" lazy-rules :rules="[
        (val) => (val && val.length > 0) || 'Это поле не может быть пустым',
      ]"></q-input>
      <q-input rounded standout v-model="email"  style="margin-bottom: 10px" bg-color="white" label="Ваш Email" lazy-rules :rules="[
        (val) => (val && val.length > 0) || 'Это поле не может быть пустым',
      ]"></q-input>
      <q-input rounded standout v-model="password"  style="margin-bottom: 10px" bg-color="white" label="Ваш пароль" type="password" lazy-rules :rules="[
        (val) => (val && val.length > 0) || 'Это поле не может быть пустым',
      ]"></q-input>
      <vue-hcaptcha :sitekey="sitekey" @verify="updateToken"></vue-hcaptcha>
    </q-card-section>
    <q-card-actions style="margin-left: auto; margin-right: auto; padding: 0; display: flex; flex-direction: column">
      <q-btn rounded color="orange" style="width: 200px; margin-top: 10px" @click="register">Зарегистрироватся</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router"
import { useQuasar } from "quasar";
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

export default defineComponent({
  components: {VueHcaptcha},
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const $q = useQuasar();
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const captchaToken = ref(null);

    function updateToken(token, eKey) {
      console.log(token);
      console.log(eKey);
      captchaToken.value = token;
    }
    return {
      async register() {
        var result = await $store.dispatch("api/request", {
          url: "auth/register",
          method: "POST",
          body: {
            username: username.value,
            email: email.value,
            password: password.value,
            captcha: captchaToken.value
          },
        });
        console.log(result);
        if (result.ok) {
          $q.notify({
            "type": "positive",
            "message": "Регистрация прошла успешно"
          })
          $router.push("/auth")
        } else {
          var error = result.data;
          $q.notify({
            "type": "negative",
            "message": "Ошибка при регистрации: SC" + error.code + ": " + error.error
          })
        }
      },
      sitekey: computed(() => $store.state.api.hcaptcha.sitekey),
      username,
      password,
      email,
      captchaToken,
      updateToken
    };
  }
});
</script>
