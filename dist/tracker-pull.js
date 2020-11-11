"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstate_1 = require("xstate");
var axon_bind_pull_1 = require("./machines/axon-bind-pull");
var _a = process.env.PULL_PORT, PULL_PORT = _a === void 0 ? '8081' : _a;
var machine = axon_bind_pull_1.spawnMachine({
    pull_port: parseInt(PULL_PORT),
    socket: null
});
var service = xstate_1.interpret(machine);
service.start();
