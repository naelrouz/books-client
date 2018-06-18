<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <button @click="pingServer()">Ping Server</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isConnected: false,
      socketMessage: ''
    };
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
      console.log('connect');
    },

    disconnect() {
      this.isConnected = false;
      console.log('disconnect');
    }

    // Fired when the server sends something on the "messageChannel" channel.
    // pingServerRes(payload) {
    //   this.socketMessage = payload;
    //   console.log(payload);
    // }
  },

  methods: {
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit('pingServer', 'PING!');
    }
  },
  mounted() {
    this.$options.sockets.pingServerRes = payload => {
      console.log(payload);
    };
  }
};
</script>