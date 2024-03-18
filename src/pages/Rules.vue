<template>
  <div>
    <q-page class="q-pa-md">
      <div class="container">
        <h1 class="header-text">Правила проекта</h1>
        <h2 class="header-text">Термины</h2>
      </div>
      <q-card class="custom-card q-mb-md">
        <q-card-section>
          <p class="text"></p>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>

</script>


<style scoped>
.text {
  font-size: 18px;
  line-height: 1.6;
  font-stretch: normal;
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.custom-card {
  border-radius: 20px;
  background-color: #f0f0f0;
  position: relative;
  padding: 20px;
}

.custom-card:before {
  content: "";
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #f0f0f0;
}
.header-text {
  margin: 0;
  color: #ffffff;
  font-weight: 600  ;

}
.floating-element {
  top: 50%;
  left: 50%;
  transform: translate(-40%, -40%);
  transition: transform 0.4s ease;
  animation: floating 4s ease-in-out infinite;
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
</style>
