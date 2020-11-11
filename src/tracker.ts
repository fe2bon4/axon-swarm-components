import { interpret } from 'xstate'
import { spawnMachine } from './machines/axon-bind-push'


const {
  PUBLISH_PORT = '8081'
} = process.env

const machine = spawnMachine({
  buffer:[],
  publish_port: parseInt(PUBLISH_PORT),
  socket: null
})

const service = interpret( machine)

service.start()