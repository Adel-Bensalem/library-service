import { ControllerFactory } from "./controllers/types/controllerFactory";

declare global {
  namespace Express {
    interface Request {
      controllers: ControllerFactory;
    }
  }
}
