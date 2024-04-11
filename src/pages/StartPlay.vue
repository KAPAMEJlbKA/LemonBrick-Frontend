<script setup>

</script>

<template>
  <div style="display: flex; flex-direction: column; background-color: rgba(0,0,0,0.2); padding-bottom: 50px">
    <h2 style="font-weight: 600; color: #ffffff; font-size: 5em; margin-right: auto; margin-left: auto">Как начать играть?</h2>
    <div style="color: #ffffff; margin-right: auto; margin-left: auto">
      <h4 style="font-weight: 600; font-size: 3em; margin-right: auto; margin-left: auto; margin-bottom: 10px">1.Зарегестрируй акаунт</h4>
      <p style="width: 600px; font-size: 1.2em">Наш проект подразумевает использование собственной системы авторизации, которая является необходимым условием для начала игры на наших серверах.</p>
      <a href="/register" class="main-btn">Регистрация</a>
      <h4 style="font-weight: 600; font-size: 3em; margin-right: auto; margin-left: auto; margin-bottom: 10px">2.Ознакомься с правилами</h4>
      <p style="width: 600px; font-size: 1.2em">При взаимодействии в чатах проекта и во время игры вы обязаны соблюдать установленные правила.</p>
      <a href="/rules" class="main-btn">Правила</a>
      <h4 style="font-weight: 600; font-size: 3em; margin-right: auto; margin-left: auto; margin-bottom: 10px">3.Скачай и запусти лаунчер</h4>
      <p style="width: 600px; font-size: 1.2em">Для доступа к нашим серверам необходимо использовать наш собственный игровой лаунчер.</p>
      <a href="https://lemonbrick.by/skins/LemonBrick.exe" class="main-btn">Лаунчер</a>
    </div>
  </div>
</template>

<style scoped>
.main-btn {
  background-color: #fcb900;
  color: #ffffff;
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2em;
  width: 10vw;
  height: 6.5vh;
  border: 2px;
  border-radius: 15px;
}
</style>
