import { interpret } from 'xstate'
import { spawnMachine } from './machines/axon-connect-pull'


const {
  CONNECT_HOST = 'localhost',
  CONNECT_PORT = '8081'
} = process.env


const machine = spawnMachine({
  connect_host: CONNECT_HOST,
  connect_port: parseInt(CONNECT_PORT),
  socket: null
})

const service = interpret( machine)

service.start()