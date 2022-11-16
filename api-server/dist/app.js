"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./server/loadEnv");
const server_1 = require("./server");
const config_1 = require("./config");
new server_1.Server(config_1.serverConfig);
