const configuredOrigins = (process.env.FRONTEND_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set([
  ...(process.env.NODE_ENV === "production" ? [] : ["http://localhost:5173"]),
  ...configuredOrigins,
]);

export const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allowed?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true,
};
