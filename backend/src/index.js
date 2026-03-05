import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const BASE_PORT = Number(process.env.PORT || 4000);

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      const nextPort = port + 1;
      console.warn(`Port ${port} is in use, retrying on ${nextPort}...`);
      startServer(nextPort);
      return;
    }
    throw err;
  });
}

startServer(BASE_PORT);
