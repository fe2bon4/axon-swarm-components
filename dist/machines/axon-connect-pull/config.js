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
                CONNECTED: {
                    actions: ['logListening', 'assignSocket']
                },
                MESSAGE: {
                    actions: ['logMessage']
                }
            }
        }
    },
};
exports.default = config;
