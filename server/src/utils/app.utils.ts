import serverConfig from "@/config/server.config";
import express from "express";

class App {
  private app: express.Application;
  constructor() {
    this.app = express();
  }

  public getExpressApp(): express.Application {
    return this.app;
  }
  public startServer(): void {
    const { port, host } = serverConfig;
    this.app.listen(port, host, () => {
      console.log(`Server is running on port http://${host}:${port}`);
    });
  }
}
export default new App();
