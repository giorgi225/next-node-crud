import { ServerConfigTypes } from "@/types/config/config.types";
const serverConfig: ServerConfigTypes = {
  host: process.env.HOST || "localhost",
  port: Number(process.env.PORT) || 3000,
};

export default serverConfig;
