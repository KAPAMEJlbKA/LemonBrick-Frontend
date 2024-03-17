<template>
  <q-page class="q-pa-md">
    <div class="container">
      <img src="../assets/logo.png" alt="LemonBrick" class="logo floating-element" @mouseover="animateLogo" @mouseout="resetLogo" /> 
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
  width: 70%; /* Ширина логотипа */
  height: auto;
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

.floating-element {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease;
  animation: floating 3s ease-in-out infinite;
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
