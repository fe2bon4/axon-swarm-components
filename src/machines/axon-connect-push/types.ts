export type MessageType = any

export interface SocketListeningEvent {
  type: 'CONNECTED',
  socket: any
}

export interface  PublishEvent<TPayload> {
  type: 'PUBLISH'
  payload: TPayload
}

export interface Context {
  buffer: any,
  connect_port: number,
  connect_host: string,
  socket: any | null
}