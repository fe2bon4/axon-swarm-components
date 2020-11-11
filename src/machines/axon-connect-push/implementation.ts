import { MachineOptions } from 'xstate'
import { assign } from 'xstate/lib/actions'
import { socket as Socket} from 'axon';
import {
  Context,
  SocketListeningEvent,
  PublishEvent,
  MessageType
} from './types'

const append = (): string => `[${new Date().toISOString()}][Axon-Bind-Push]`

const implementation: MachineOptions<Context, 
SocketListeningEvent
| PublishEvent<MessageType>
| any
>  = {
  services: {
    runService: ({connect_port, connect_host }) => send => {

      const socket = Socket('push')

      socket.connect(connect_port, connect_host)

      send({
        type: 'CONNECTED',
        socket
      })

      let timeout: any 
      const service = () => {
        send({
          type: 'PUBLISH',
          payload: {
            value: 'Foo',
            created_date: new Date().toISOString()
          }
        })
        timeout = setTimeout(service, 1000)
      }
      service()

      return () => {
        clearTimeout(timeout)
      }
    }
  },
  actions: {
    logListening: ({connect_host, connect_port}) => console.log(append(), `Connected to ${connect_host}:${connect_port}`),
    assignSocket: assign({
      socket: (_, {socket}: SocketListeningEvent) =>socket
    }),
    bufferPublication: ({buffer}, {payload}) => {
      buffer.push(payload)
    },
    publishToSocket: ({buffer, socket}, {payload}) => {
      while(buffer.length){
        const buffered_payload = buffer.shift()
        socket.send(buffered_payload)
      }
      socket.send(payload)
    }
  },
  activities: {},
  delays: {},
  guards: {
    socketIsNotNull: ({socket}) => socket !== null
  }
}

export default implementation