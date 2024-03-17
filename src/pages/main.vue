<template>
  <q-page class="q-pa-md">
    <div class="container">
      <img src="../assets/icon.png" alt="LemonBrick" class="logo floating-element" @mouseover="animateLogo" @mouseout="resetLogo" />
      <h1 class="logo-text floating-element">LemonBrick</h1>
      <q-btn unelevated rounded class="main-btn" label="Начать играть" />
    </div>
	<div class="q-pa-md btn_conteiner">
		<q-btn label="Войти" @click="redirectToRegistration" class="reg-btn"></q-btn>
		<q-btn label="Регистрация" @click="redirectToRegistration" class="reg-btn"></q-btn>
		<q-btn label="Скачать лаунчер" @click="redirectToRegistration" class="reg-btn"></q-btn>
		<q-btn label="Правила" @click="redirectToRegistration" class="reg-btn"></q-btn>
	</div>
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  margin-top: 8vh;
  width: 20%; /* Ширина логотипа */
  height: auto;
}

.logo-text {
  margin: 0;
  color: #ffffff;
  font-weight: 600  ;
}

.main-btn {
  background-color: #fcb900;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2em;
  width: 13vw;
  height: 6.5vh;
  border: 2px;
  margin-top: 10vh;
  border-radius: 15px;
}

.main-btn:hover {
  background-color: #e79a0a;
  transition: all 4s ease;
  border-radius: 80px;
  animation: btn 2s ease-in-out;
}
.reg-btn {
  margin-top: 30px;
  margin-right: 20px;
  background-color: #fcb900; /* Цвет фона кнопки */
  color: white; /* Цвет текста кнопки */
}

@keyframes floating {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes btn {
  0% {
    transform: translatex(0);
  }
  35% {
    transform: translatex(-5px);
  }
  75% {
    transform: translatex(5px);
  }
  100% {
    transform: translateY(0);
  }
}

.floating-element {
  top: 50%;
  left: 50%;
  transform: translate(-40%, -40%);
  transition: transform 0.4s ease;
  animation: floating 4s ease-in-out infinite;
}
.server-btn {
  width: auto;
  height: auto;

}
.server-card-title {
	width: auto;
    height: auto;
}
.server-feld {
	display: inline-block;
	vertical-align: top;
	width: auto;
    height: auto;
}

</style>
