export type MessageType = any

export interface SocketListeningEvent {
  type: 'SOCKET_LISTENING',
  socket: any
}

export interface  MessageEvent<TPayload> {
  type: 'MESSAGE'
  payload: TPayload
}

export interface Context {
  pull_port: number
  socket: any | null
}