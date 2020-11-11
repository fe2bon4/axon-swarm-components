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
                var socket = axon_1.socket('push');
                socket.connect(connect_port, connect_host);
                send({
                    type: 'CONNECTED',
                    socket: socket
                });
                var timeout;
                var service = function () {
                    send({
                        type: 'PUBLISH',
                        payload: {
                            value: 'Foo',
                            created_date: new Date().toISOString()
                        }
                    });
                    timeout = setTimeout(service, 1000);
                };
                service();
                return function () {
                    clearTimeout(timeout);
                };
            };
        }
    },
    actions: {
        logListening: function (_a) {
            var connect_host = _a.connect_host, connect_port = _a.connect_port;
            return console.log(append(), "Connected to " + connect_host + ":" + connect_port);
        },
        assignSocket: actions_1.assign({
            socket: function (_, _a) {
                var socket = _a.socket;
                return socket;
            }
        }),
        bufferPublication: function (_a, _b) {
            var buffer = _a.buffer;
            var payload = _b.payload;
            buffer.push(payload);
        },
        publishToSocket: function (_a, _b) {
            var buffer = _a.buffer, socket = _a.socket;
            var payload = _b.payload;
            while (buffer.length) {
                var buffered_payload = buffer.shift();
                socket.send(buffered_payload);
            }
            socket.send(payload);
        }
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
