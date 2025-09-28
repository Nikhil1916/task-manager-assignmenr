import { Server  } from 'socket.io';
import type {Server as HTTPServer} from "http";
import { verifyToken } from '../utils/jwt';

type AuthedSocket  = import("socket.io").Socket & {userId?:string};


let io: Server;


export function initSocket(server:HTTPServer, corsOrigin: string) {
    io = new Server(server, {
        cors: {origin: corsOrigin, credentials: true},
        path: '/socket.io'
    })
    
    // /jwt auth on connection
    
    io.use((socket: AuthedSocket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      (socket.handshake.query?.token as string | undefined) ||
      (socket.handshake.headers['authorization'] as string | undefined);

    if (!token || typeof token !== 'string') return next(new Error('Unauthorized'));
    const payload = verifyToken(token);
    socket.userId = String(payload.sub);
    const room = roomForUser(socket.userId);
    socket.join(room);
    console.log('✅ joined', room, 'sid:', socket.id);
    next();
  } catch {
    next(new Error('Unauthorized'));
  }
});

    io.on("connection", (socket:AuthedSocket)=>{
        console.log("socket connnected");
        socket.emit('connected', { ok: true, userId: socket.userId });
        socket.on('disconnect', () => {
        // cleanup if needed
        });
    })

      io.engine.on("connection_error", (err) => {
        console.log(
          "❌ engine connection_error:",
          err.code,
          err.message,
          err.context
        );
      });

    return io;
}

export function roomForUser(userId: string) {
  return `user:${String(userId)}`;
}

export function emitTaskEvent(
  userId: string,
  type: 'created' | 'updated' | 'deleted',
  data: any
) {
  if (!io) return;
  const room = roomForUser(String(userId));
  console.log('📤 emitting', type, 'to', room, {type,data});
  io.to(room).emit('tasks:changed', { type, data }); // <— event name matches client
}

