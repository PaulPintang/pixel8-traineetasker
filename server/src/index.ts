import connectDB from "./config/conn";
import errorHandler from "./middleware/errorMiddleware";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import { TokenPayload } from "./interfaces/user.interface";
import { Server } from "socket.io";
import path from "path";

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
const io = new Server(server, {
  cors: {
    origin: "https://traineetasker.vercel.app",
    credentials: true,
  },
});

// if (process.env.NODE_ENV === "production") {
// const __dir = path.resolve();
// app.use(express.static(path.join(__dir, "../client/dist")));
// app.use(express.static("dist"));
// } else {
app.get("/", (req, res) => res.send("Server is ready"));
// }

app.use(express.json({ limit: "200mb" }));
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/trainee", require("./routes/traineeRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));
app.use(errorHandler);

io.on("connection", (socket) => {
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

server.listen(5000, () => console.log("Server is running on PORT 5000"));
