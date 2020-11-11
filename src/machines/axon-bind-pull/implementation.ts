import { MachineOptions } from 'xstate'
import { assign } from 'xstate/lib/actions'
import { socket as Socket} from 'axon';
import {
  Context,
  SocketListeningEvent,
  MessageEvent,
  MessageType
} from './types'

const append = (): string => `[${new Date().toISOString()}][Axon-Bind-Pull]`

const implementation: MachineOptions<Context, 
SocketListeningEvent
| MessageEvent<MessageType>
| any
>  = {
  services: {
    runService: ({pull_port }) => send => {

      const socket = Socket('pull')

      socket.bind(pull_port)

      send({
        type: 'SOCKET_LISTENING',
        socket
      })

      const messageHandler =(payload: MessageType) => {
        send({
          type: 'MESSAGE',
          payload
        })
      }
      
      const closeHandler = () => socket.close() 

      process.on('SIGINT', closeHandler)
      socket.on('message', messageHandler)

      return () => {
        socket.removeListener('message', messageHandler)
      }
    }
  },
  actions: {
    logListening: ({pull_port}) => console.log(append(), `Listening on port ${pull_port}`),
    logMessage: (_,{payload}:MessageEvent<MessageType>) => console.log(append(), `Message`, payload),
    assignSocket: assign({
      socket: (_, {socket}: SocketListeningEvent) =>socket
    }),
  },
  activities: {},
  delays: {},
  guards: {
    socketIsNotNull: ({socket}) => socket !== null
  }
}

export default implementation