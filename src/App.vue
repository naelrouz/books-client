<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;

  background: #acb6e5;
  background: linear-gradient(to right, #acb6e5, #86fde8);
}
a {
  color: inherit;
  text-decoration: none;
}
.btn {
  display: inline-block;
  font-size: 24px;
  padding: 10px 20px;
  cursor: pointer;
  user-select: none;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  outline: 0;
  background: #20c77d;
  color: #ffffff;
}
.btn_group {
  /* display: flex;
  flex-flow: row wrap;
  justify-content: center; */
}
.btn_group .btn {
  margin: 0 5px;
}
button:active,
button:focus {
  outline: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
label {
  text-align: left;
  display: block;
}

.text_input {
  font-size: 22px;
  line-height: 58px;
  display: block;
  width: 100%;
  max-width: 560px;
  height: 60px;
  padding: 0 20px;
  margin-bottom: 20px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  outline: 0;
  background: #f2f2f2;
  box-shadow: inset 3px 3px 10px rgba(0, 0, 0, 0.2);
}

textarea {
  font-size: 22px;
  line-height: 1.5;
  display: block;
  width: 100%;
  max-width: 560px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  outline: 0;
  background: #f2f2f2;
  box-shadow: inset 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.message_box {
  padding: 10px;
  font-size: 22px;
  color: #ffffff;
  border-radius: 5px;
}

.success {
  background: #4caf50;
}

.error {
  background: #f44336;
}
</style>
