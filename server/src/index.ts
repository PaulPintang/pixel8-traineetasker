import connectDB from "./config/conn";
import errorHandler from "./middleware/errorMiddleware";
import express from "express";
import "dotenv/config";

import cookieParser from "cookie-parser";
import http from "http";
import { TokenPayload } from "./interfaces/user.interface";
import { Server } from "socket.io";

declare module "express" {
  interface Response {
    locals: {
      user: TokenPayload;
    };
  }
}

const port = process.env.PORT || 5000;

connectDB();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json({ limit: "200mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("dist"));
app.get("/", (req, res) => res.sendFile("index.html", { root: "dist" }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/trainee", require("./routes/traineeRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("User connected with user id", socket.id);
  socket.on("courseRoom", (course: string) => {
    socket.join(course);
    console.log(`Client joined course room: ${course}`);
  });
  socket.on("roleRoom", (role: string) => {
    socket.join(role);
  });

  socket.on("assign", ({ task, rooms }) => {
    rooms.forEach((room: string) => {
      socket.to(room).emit("assignTask", task);
    });
  });
  socket.on("add", ({ task, rooms }) => {
    rooms.forEach((room: string) => {
      socket.to(room).emit("addTask", task);
    });
  });
  socket.on("status", ({ task, rooms }) => {
    rooms.forEach((room: string) => {
      socket.to(room).emit("taskStatus", task);
    });
  });
  socket.on("comment", ({ msg, rooms }) => {
    rooms.forEach((room: string) => {
      socket.to(room).emit("taskComment", msg);
    });
  });
  socket.on("delete", ({ _id, rooms }) => {
    rooms.forEach((room: string) => {
      socket.to(room).emit("deleteTask", _id);
    });
  });
});

server.listen(port, () => console.log(`Server started on port ${port}`));
