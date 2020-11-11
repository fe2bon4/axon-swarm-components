const config =  {
  initial: 'running',
  states:{
    running: {
      invoke: {
        id: 'runService',
        src: 'runService'
      },
      on: {
        SOCKET_LISTENING: {
          actions: ['logListening', 'assignSocket']
        },
        PUBLISH: [
          {
            cond: 'socketIsNotNull',
            actions: 'publishToSocket'
          },
          {
            actions: ['bufferPublication']
          }
        ]
      }
    }
  },
}

export default config