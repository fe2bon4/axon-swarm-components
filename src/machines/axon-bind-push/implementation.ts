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
    runService: ({publish_port }) => send => {

      const socket = Socket('push')

      socket.bind(publish_port)

      send({
        type: 'SOCKET_LISTENING',
        socket
      })
      
      const closeHandler = () => socket.close() 

      process.on('SIGINT', closeHandler)

      const service = () => {
        send({
          type: 'PUBLISH',
          payload: {
            value: 'Foo',
            created_date: new Date().toISOString()
          }
        })
        setImmediate(service)
      }
      service()
    }
  },
  actions: {
    logListening: ({publish_port}) => console.log(append(), `Listening on port ${publish_port}`),
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