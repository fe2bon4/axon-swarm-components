"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstate_1 = require("xstate");
var axon_bind_push_1 = require("./machines/axon-bind-push");
var _a = process.env.PUBLISH_PORT, PUBLISH_PORT = _a === void 0 ? '8081' : _a;
var machine = axon_bind_push_1.spawnMachine({
    buffer: [],
    publish_port: parseInt(PUBLISH_PORT),
    socket: null
});
var service = xstate_1.interpret(machine);
service.start();
