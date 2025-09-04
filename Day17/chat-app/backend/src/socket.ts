import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import Message from "./models/Message";
import User from "./models/User";

type SocketToUser = { [userId: string]: string }; // userId -> socketId

let io: Server;
const online: SocketToUser = {};

export function setupSocket(server: HttpServer) {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET","POST"] }
  });

  io.on("connection", (socket: Socket) => {
    console.log("socket connected", socket.id);

    socket.on("user:join", async (payload: { userId: string }) => {
      const { userId } = payload;
      online[userId] = socket.id;
      await User.findByIdAndUpdate(userId, { online: true }).catch(()=>{});
      io.emit("user:online", { userId });
    });

    socket.on("user:leave", async (payload:{userId:string})=>{
      delete online[payload.userId];
      await User.findByIdAndUpdate(payload.userId, { online: false }).catch(()=>{});
      io.emit("user:offline", { userId: payload.userId });
    });

    socket.on("message:send", async (data: { conversationId: string, from: string, to: string, text: string }) => {
      const { conversationId, from, to, text } = data;
      const message = new Message({ conversationId, from, to, text, createdAt: new Date() });
      await message.save();
      // send to recipient if online
      const toSocketId = online[to];
      io.to(toSocketId || "").emit("message:receive", message);
      // also emit back to sender so UI can confirm
      socket.emit("message:sent", message);
    });

    socket.on("disconnect", () => {
      // try to remove user from online map
      const entries = Object.entries(online).find(([, sid]) => sid === socket.id);
      if (entries) {
        const [userId] = entries;
        delete online[userId];
        User.findByIdAndUpdate(userId, { online: false }).catch(()=>{});
        io.emit("user:offline", { userId });
      }
      console.log("socket disconnected", socket.id);
    });
  });

  console.log("Socket.IO initialized");
}
