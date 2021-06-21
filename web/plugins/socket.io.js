import Vue from 'vue'
import io from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended'

export default ({ store, $config }) => {
  const socket = io($config.SOCKET_URL)
  Vue.use(VueSocketIOExt, socket, { store })
}
