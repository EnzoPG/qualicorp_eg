<template>
  <div id="app">
    <List />
    <!-- FAB BTN -->
    <div class="fabDiv">
      <md-button class="md-fab fab" :md-ripple="false" @click="openModalToCreate">
        <md-icon>add</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script src="./controllers/mainController.js"></script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow-x: hidden;
}

.fabDiv {
  /* margin-top: 20vh;
  margin-bottom: 5%;
  margin-right: 5%; */
  position: fixed;
  bottom: 10px;
  right: 10px;
}

.fab {
  background-color: mediumseagreen !important;
}

/* Mobile */
@media only screen and (max-width: 720px) {
  .fabDiv {
    margin-top: 10vh;
    margin-bottom: 5%;
    margin-right: 5%;
  }
}
</style>
