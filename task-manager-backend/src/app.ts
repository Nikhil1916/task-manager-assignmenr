// atmf3NkoFhqdsBFN nikhilchawla9013_db_user
import "dotenv/config";
import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/tasks.routes";


export const app = express();
const corsOptions = {
  origin: ENV.CORS_ORIGIN,
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  const status = err.statusCode ?? 500;
  res.status(status).json({ message: err.message ?? 'Internal Server Error' });
});
