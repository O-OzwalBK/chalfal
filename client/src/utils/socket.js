import io from "socket.io-client";
const serverURL = "http://localhost:8000/";

export function SocketConnection() {
  return io(serverURL);
}
