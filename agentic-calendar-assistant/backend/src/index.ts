import "dotenv/config";
import cors from "cors";
import express from "express";
import { getPool } from "./db/pool.js";
import { connectionRouter } from "./routes/connection.routes.js";
import { agentRoutes } from "./routes/agent.routes.js";
import { calendarRouter } from "./routes/calendar.routes.js";
import { mountMcpServer } from "./mcp/mount.js";

const app = express();
const port = Number(process.env.PORT) || 4000;
const appOrigin = process.env.APP_URL ?? "http://localhost:3000";

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, MCP)
      if (!origin) return callback(null, true);
      
      if (
        origin === appOrigin ||
        origin === "http://localhost:3000" ||
        origin.endsWith(".vercel.app") ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }
      
      callback(null, true); // Permissive fallback for authorized frontends
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await getPool().query("SELECT 1");
    res.json({ status: "ok", service: "agentic-calendar-app", database: "up" });
  } catch {
    res.status(503).json({
      status: "error",
      service: "agentic-calendar-app",
      database: "down",
    });
  }
});

app.use("/api/connections", connectionRouter);
app.use("/api/agent", agentRoutes);
app.use("/api/calendar", calendarRouter);

mountMcpServer(app);

// ----------------------------------------------------------------------
// Autonomous Keep-Alive Heartbeat (Prevents Render Free-tier from Sleeping)
// ----------------------------------------------------------------------
function initKeepAlive() {
  const targetUrl =
    process.env.RENDER_EXTERNAL_URL ||
    process.env.BACKEND_URL ||
    process.env.PUBLIC_BACKEND_URL;

  if (!targetUrl) {
    console.log("[Keep-Alive] No external backend URL configured for self-ping (local dev mode).");
    return;
  }

  const pingUrl = `${targetUrl.replace(/\/$/, "")}/health`;
  const PING_INTERVAL_MS = 10 * 60 * 1000; // Ping every 10 minutes (Render sleeps after 15m)

  console.log(`[Keep-Alive] Heartbeat worker active targeting ${pingUrl} (every 10 min)`);

  setInterval(async () => {
    try {
      const start = Date.now();
      const res = await fetch(pingUrl);
      const latency = Date.now() - start;
      if (res.ok) {
        console.log(`[Keep-Alive] Heartbeat ping successful (${latency}ms) - Server kept active.`);
      } else {
        console.warn(`[Keep-Alive] Heartbeat ping returned status: ${res.status}`);
      }
    } catch (err) {
      console.warn(`[Keep-Alive] Heartbeat warning:`, err instanceof Error ? err.message : err);
    }
  }, PING_INTERVAL_MS);
}

app.listen(port, () => {
  console.log(`Agentic Calendar App is running on port: ${port}`);
  initKeepAlive();
});
