<template>
  <q-page>
      <q-card class="q-mx-auto server-feld">
        <q-card-section class="server-btn">
          <div v-if="loading">Загрузка...</div>
          <div v-else>
            <p class="server-card-title">Сервер Lemonilla</p>
            <p class="server-card-title">Заполненность сервера</p>
            <q-circular-progress size=100px :show-value=true :value="playersOnline" :max="maxPlayers" color="primary" />
          </div>
        </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      serverAddress: 'unnamedproject.by',
      serverPort: 3000,
      loading: true,
      serverStatus: '',
      playersOnline: '',
      maxPlayers: ''
    };
  },
  mounted() {
    this.checkServerStatus();
  },
  methods: {
    checkServerStatus() {
      axios.get(`https://api.mcsrvstat.us/2/${this.serverAddress}:${this.serverPort}`)
        .then(response => {
          if (response.data.online) {
            this.serverStatus = `Server is online with ${response.data.players.online} players online of ${response.data.players.max}`;
            this.playersOnline = response.data.players.online;
            this.maxPlayers = response.data.players.max;
          }
          else {
            this.serverStatus = 'Server is offline.';
          }
        })
        .catch(error => {
          console.error('Error fetching server status:', error);
          this.serverStatus = 'Error fetching server status.';
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
