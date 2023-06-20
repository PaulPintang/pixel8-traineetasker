import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export const JoinRoom = (course: string, role: string) => {
  // socket.on("connect", () => {
  socket.emit("courseRoom", course);
  socket.emit("roleRoom", role);
  // });
};
