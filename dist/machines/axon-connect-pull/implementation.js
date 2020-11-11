"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("xstate/lib/actions");
var axon_1 = require("axon");
var append = function () { return "[" + new Date().toISOString() + "][Axon-Bind-Push]"; };
var implementation = {
    services: {
        runService: function (_a) {
            var connect_port = _a.connect_port, connect_host = _a.connect_host;
            return function (send) {
                var socket = axon_1.socket('pull');
                socket.connect(connect_port, connect_host);
                send({
                    type: 'CONNECTED',
                    socket: socket
                });
                var messageHandler = function (payload) {
                    console.log(payload);
                    send({
                        type: 'MESSAGE',
                        payload: payload
                    });
                };
                var closeHandler = function () { return socket.close(); };
                process.on('SIGINT', closeHandler);
                socket.on('message', messageHandler);
                return function () {
                    process.removeListener('SIGINT', closeHandler);
                    socket.removeListener('message', messageHandler);
                };
            };
        }
    },
    actions: {
        logListening: function (_a) {
            var connect_host = _a.connect_host, connect_port = _a.connect_port;
            return console.log(append(), "Connected to " + connect_host + ":" + connect_port);
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
