export type MessageType = any

export interface SocketListeningEvent {
  type: 'SOCKET_LISTENING',
  socket: any
}

export interface  PublishEvent<TPayload> {
  type: 'PUBLISH'
  payload: TPayload
}

export interface Context {
  buffer: any,
  publish_port: number
  socket: any | null
}