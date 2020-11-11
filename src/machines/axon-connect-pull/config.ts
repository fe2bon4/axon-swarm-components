const config =  {
  initial: 'running',
  states:{
    running: {
      invoke: {
        id: 'runService',
        src: 'runService'
      },
      on: {
        CONNECTED: {
          actions: ['logListening', 'assignSocket']
        },
        MESSAGE: {
          actions: ['logMessage']
        }
      }
    }
  },
}

export default config