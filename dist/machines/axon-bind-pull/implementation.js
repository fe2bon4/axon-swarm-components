"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("xstate/lib/actions");
var axon_1 = require("axon");
var append = function () { return "[" + new Date().toISOString() + "][Axon-Bind-Pull]"; };
var implementation = {
    services: {
        runService: function (_a) {
            var pull_port = _a.pull_port;
            return function (send) {
                var socket = axon_1.socket('pull');
                socket.bind(pull_port);
                send({
                    type: 'SOCKET_LISTENING',
                    socket: socket
                });
                var messageHandler = function (payload) {
                    send({
                        type: 'MESSAGE',
                        payload: payload
                    });
                };
                var closeHandler = function () { return socket.close(); };
                process.on('SIGINT', closeHandler);
                socket.on('message', messageHandler);
                return function () {
                    socket.removeListener('message', messageHandler);
                };
            };
        }
    },
    actions: {
        logListening: function (_a) {
            var pull_port = _a.pull_port;
            return console.log(append(), "Listening on port " + pull_port);
        },
        logMessage: function (_, _a) {
            var payload = _a.payload;
            return console.log(append(), "Message", payload);
        },
        assignSocket: actions_1.assign({
            socket: function (_, _a) {
                var socket = _a.socket;
                return socket;
            }
        }),
    },
    activities: {},
    delays: {},
    guards: {
        socketIsNotNull: function (_a) {
            var socket = _a.socket;
            return socket !== null;
        }
    }
};
exports.default = implementation;
