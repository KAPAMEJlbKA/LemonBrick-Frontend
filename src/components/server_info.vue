<template>
  <section class="main">
    <h3 class="head-text">Наши сервера</h3>
    <div class="section">
        <div v-if="loading">Загрузка...</div>
        <div v-else class="wrapper" >
          <div class="server-list">
            <div @click="serverVariable = 'lemonila'" class="button"><span class="button-span">Lemonilla</span> <br>
              <img src="../assets/svg/users.svg" alt="" class="icon"> {{ Lemonilla.playersOnline }}
            </div>
            <div @click="serverVariable = 'vanila'" class="button"><span class="button-span">Vanilla</span> <br>
              <img src="../assets/svg/users.svg" alt="" class="icon"> {{ Lemonilla.playersOnline }}
            </div>
          </div>
          <img v-if="serverVariable === 'lemonila'" src="../assets/poster.jpeg" alt="poster" class="photo"  />
          <img v-if="serverVariable === 'vanila'" src="../assets/poster2.jpeg" alt="poster" class="photo"  />
        </div>

      </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      Lemonilla: {
        serverAddress: 'unnamedproject.by',
        serverPort: 3000,
        loading: true,
        serverStatus: '',
        playersOnline: '0',
        maxPlayers: '',
      },

      serverVariable: 'lemonila'
    };
  },
  mounted() {
    this.checkServerStatus();
  },
  methods: {
    checkServerStatus() {
      axios.get(`https://api.mcsrvstat.us/2/${this.Lemonilla.serverAddress}:${this.Lemonilla.serverPort}`)
        .then(response => {
          if (response.data.online) {
            this.Lemonilla.serverStatus = `Server is online with ${response.data.players.online} players online of ${response.data.players.max}`;
            this.Lemonilla.playersOnline = response.data.players.online;
            this.Lemonilla.maxPlayers = response.data.players.max;
          }
          else {
            this.Lemonilla.serverStatus = 'Server is offline.';
          }
        })
        .catch(error => {
          console.error('Error fetching server status:', error);
          this.Lemonilla.serverStatus = 'Error fetching server status.';
        })
        .finally(() => {
          this.Lemonilla.loading = false;
        });
    }
  }
};
</script>

<style>
.main {
  margin-top: 25vh;
  display: flex;
  flex-direction: column;

}
.wrapper {
  display: flex;
  margin-left: -15vw;
  margin-bottom: 5vh;
}
.section {
  width: 3vw;
  height: 10vh;
  gap: 2vw;
}
.server-list{
  display: flex;
  flex-direction: column;
}
.photo {
  width: 40vw;
  height: 50vh;
  border-radius: 10px;
}

.button {
  width: 12vw;
  height: 8vh;
  background-color: rgba(255, 255, 255, 0.74);
  border-radius: 5px;
  padding-top: 0.3vh;
  padding-left: 0.4vw;
  font-weight: 500;
  margin-right: 1vw;
  margin-bottom: 2vh;
}
.button:hover {
  background-color: rgb(255, 255, 255);
  transition-duration: 400ms;
}
.button-span {
  font-weight: 600;
  font-size: 1.3em;
}
.icon {
  margin-top: 8px;
}
.head-text {
  color: rgba(250, 247, 181, 0.87);
  font-weight: 600;
}
</style>
