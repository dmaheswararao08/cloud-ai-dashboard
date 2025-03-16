import { Request } from "express";
import { Server as SocketServer } from "socket.io";

export interface CustomRequest extends Request {
  io?: SocketServer;
}
