<template>
  <q-page>
    <q-card class="q-ma-md">
      <q-card-section>
        <div v-if="loading">Загрузка...</div>
        <div v-else>
          <p>Текущий онлайн на сервере Minecraft: {{ playersOnline }}</p>
          <q-linear-progress :value="playersOnline" :max="maxPlayers" color="primary" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      playersOnline: 0,
      maxPlayers: 100,
      timer: null
    };
  },
  methods: {
    async fetchPlayersOnline() {
      try {
        const response = await fetch('http://86.57.173.115:3000');
        const data = await response.json();
        this.playersOnline = data.onlinePlayers;
      } catch (error) {
        console.error('Ошибка при получении данных о сервере:', error);
      } finally {
        this.loading = false;
      }
    },
    startFetching() {
      this.timer = setInterval(this.fetchPlayersOnline, 5000); // Обновлять каждые 5 секунд
      this.fetchPlayersOnline(); // Выполнить первый раз
    },
    stopFetching() {
      clearInterval(this.timer);
    }
  },
  created() {
    this.startFetching();
  },
  beforeDestroy() {
    this.stopFetching();
  }
};
</script>

<style scoped>
/* CSS стили могут быть добавлены здесь, если необходимо */
</style>