<template>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;400&display=swap');

body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
  background: #f6f6f6;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f6f6f6;
}

body {
  padding-top: 80px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
