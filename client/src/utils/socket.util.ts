import { io } from "socket.io-client"

const URL = "ws://localhost:5000"

export const socket = io(URL)
export const gameSocket = io(`${URL}/game`)
