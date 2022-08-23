import 'reflect-metadata'
import './server/loadEnv'
import { Server } from './server'
import { serverConfig } from './config'

new Server(serverConfig)