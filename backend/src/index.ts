import app from "./server";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { initAlertChecker } from "./jobs/alertChecker";
import { initJijiSync } from "./jobs/jijiSync";

// Initialize cron jobs
initAlertChecker();
initJijiSync();

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`RentHob API is running on port ${PORT} in ${env.NODE_ENV} mode`);
});
