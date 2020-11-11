"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstate_1 = require("xstate");
var axon_connect_push_1 = require("./machines/axon-connect-push");
var _a = process.env, _b = _a.CONNECT_HOST, CONNECT_HOST = _b === void 0 ? 'localhost' : _b, _c = _a.CONNECT_PORT, CONNECT_PORT = _c === void 0 ? '8081' : _c;
var machine = axon_connect_push_1.spawnMachine({
    buffer: [],
    connect_host: CONNECT_HOST,
    connect_port: parseInt(CONNECT_PORT),
    socket: null
});
var service = xstate_1.interpret(machine);
service.start();
