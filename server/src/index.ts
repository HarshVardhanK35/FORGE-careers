import app from "./app";
import { PORT } from "./config/env";
import { connectDb } from "./config/db";

async function start() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}

start();
