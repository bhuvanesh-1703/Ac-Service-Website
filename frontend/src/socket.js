import { io } from "socket.io-client";

const socket = io("http://localhost:5100");

export default socket;
