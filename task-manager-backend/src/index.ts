import connectDb from "./config/db";
import { app } from "./app";
import { ENV } from "./config/env";
import http from 'http';
import { initSocket } from './realtime/socket';

async function bootstrap() {
  return connectDb()
    .then((data) => {
      console.log("Database connection established...", ENV.CORS_ORIGIN);
      // app.listen(Number(ENV.PORT), () => {
      //   console.log("Server is successfully listening on port...", ENV.PORT);
      // });
      const server = http.createServer(app);
      initSocket(server, ENV.CORS_ORIGIN);
      server.listen(Number(ENV.PORT), () => {
      console.log(`🚀 API http://localhost:${ENV.PORT}`);
      console.log('🔌 Socket.IO ready');
  });
    })
}

bootstrap().catch((e) => {
  console.error('Failed to start:', e.message);
  process.exit(1);
});
