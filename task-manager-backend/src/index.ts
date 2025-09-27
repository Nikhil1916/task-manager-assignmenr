import connectDb from "./config/db";
import { app } from "./app";
import { ENV } from "./config/env";

async function bootstrap() {
  return connectDb()
    .then((data) => {
      console.log("Database connection established...", ENV.CORS_ORIGIN);
      app.listen(Number(ENV.PORT), () => {
        console.log("Server is successfully listening on port...", ENV.PORT);
      });
    })
}

bootstrap().catch((e) => {
  console.error('Failed to start:', e.message);
  process.exit(1);
});
