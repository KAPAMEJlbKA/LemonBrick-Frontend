<template>
  <div>
    <h1>Новости из канала Discord</h1>
    <div v-if="loading">Загрузка...</div>
    <div v-else>
      <div v-for="message in messages" :key="message.id">
        <h3>{{ message.author }}</h3>
        <p>{{ message.content }}</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      loading: true
    };
  },
  mounted() {
    this.setupWebhook();
  },
  methods: {
    setupWebhook() {
      // Здесь вы можете выполнить запрос к вебхуку Discord
      // Например, через axios или fetch
      // Не забудьте настроить вебхук в Discord и заменить URL на ваш
      fetch('https://discord.com/api/webhooks/1218923770362986547/asJpORS2zmM_ciswo6Hrc9BvWUfeq19Zx2HnIZuMYmUNa-JJIJMLgaleSEIl4izeqRKc')
        .then(response => response.json())
        .then(data => {
          this.messages = data;
          console.log(data);
          this.loading = false;
        })
        .catch(error => {
          console.error('Ошибка при получении данных из вебхука:', error);
          this.loading = false;
        });
    }
  }
};
</script>

<style>
/* Стилизуйте ваш компонент по своему усмотрению */
</style>
