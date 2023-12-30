import { DatabaseConfigTypes } from "@/types/config/config.types";

const { DB_URI, DB_NAME } = process.env;

const databaseConfig: DatabaseConfigTypes = {
  uri: `${DB_URI}/${DB_NAME}`,
};

export default databaseConfig;
