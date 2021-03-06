"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    initial: 'running',
    states: {
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
};
exports.default = config;
