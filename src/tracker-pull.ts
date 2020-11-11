import { interpret } from 'xstate'
import { spawnMachine } from './machines/axon-bind-pull'

const {
  PULL_PORT = '8081'
} = process.env

const machine = spawnMachine({
  pull_port: parseInt(PULL_PORT),
  socket: null
})

const service = interpret( machine)

service.start()