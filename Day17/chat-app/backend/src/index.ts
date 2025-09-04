import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app";
import { setupSocket } from "./socket";

const port = process.env.PORT || 4000;
const server = http.createServer(app);

// initialize socket.io on same server
setupSocket(server);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
