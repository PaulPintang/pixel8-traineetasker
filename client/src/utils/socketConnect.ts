import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SERVER_DOMAIN, {
  withCredentials: true,
});

export const JoinRoom = (course: string, role: string) => {
  socket.emit("courseRoom", course);
  socket.emit("roleRoom", role);
  socket.connect();
};
