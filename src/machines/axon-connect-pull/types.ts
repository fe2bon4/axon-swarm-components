export type MessageType = any

export interface SocketListeningEvent {
  type: 'CONNECTED',
  socket: any
}

export interface  MessageEvent<TPayload> {
  type: 'MESSAGE'
  payload: TPayload
}

export interface Context {
  connect_host: string
  connect_port: number
  socket: any | null
}