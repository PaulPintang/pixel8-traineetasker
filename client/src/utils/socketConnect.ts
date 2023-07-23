import { io } from "socket.io-client";

export const socket = io({
  autoConnect: false,
});

export const JoinRoom = (course: string, role: string) => {
  socket.connect();
  socket.emit("courseRoom", course);
  socket.emit("roleRoom", role);
};
