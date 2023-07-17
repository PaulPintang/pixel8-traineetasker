import { io } from "socket.io-client";

export const socket = io();

export const JoinRoom = (course: string, role: string) => {
  socket.emit("courseRoom", course);
  socket.emit("roleRoom", role);
};
