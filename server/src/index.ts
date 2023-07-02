import connectDB from "./config/conn";
import errorHandler from "./middleware/errorMiddleware";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import { TokenPayload } from "./interfaces/user.interface";
import { Server } from "socket.io";
import { ITask } from "./interfaces/task.interface";

dotenv.config();

declare module "express" {
  interface Response {
    locals: {
      user: TokenPayload;
    };
  }
}

connectDB();
const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "200mb" }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/trainee", require("./routes/traineeRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("courseRoom", (course: string) => {
    socket.join(course);
    console.log(`Client joined course room: ${course}`);
  });
  socket.on("roleRoom", (role: string) => {
    socket.join(role);
    console.log(`Client joined role room: ${role}`);
  });

  socket.on("assign", ({ task, rooms }) => {
    rooms.forEach((room: string) => {
      socket.to(room).emit("assignTask", task);
      console.log(`Task assign to room: ${room}`);
    });
  });
  socket.on("add", ({ task, rooms }) => {
    rooms.forEach((room: string) => {
      socket.to(room).emit("addTask", task);
      console.log(`Task added to room: ${room}`);
    });
  });
  socket.on("status", ({ task, rooms }) => {
    rooms.forEach((room: string) => {
      socket.to(room).emit("taskStatus", task);
      console.log(`Task status update to room: ${room}`);
    });
  });
  socket.on("comment", ({ msg, rooms }) => {
    rooms.forEach((room: string) => {
      socket.to(room).emit("taskComment", msg);
      console.log(`Comment added in room: ${room}`);
    });
  });
  socket.on("delete", ({ _id, rooms }) => {
    rooms.forEach((room: string) => {
      socket.to(room).emit("deleteTask", _id);
      console.log(`Task remove to room: ${room}`);
    });
  });
});

server.listen(5000, () => console.log("Server is running on PORT 5000"));
