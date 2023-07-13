import { io } from "socket.io-client";

export const socket = io("/api", {
  // export const socket = io(import.meta.env.VITE_LOCAL_SERVER, {
  withCredentials: true,
});

export const JoinRoom = (course: string, role: string) => {
  socket.emit("courseRoom", course);
  socket.emit("roleRoom", role);
  socket.connect();
};
