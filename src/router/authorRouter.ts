import { Router, Request } from "express";

import { ControllerFactory } from "../controllers/types/controllerFactory";

const authorRouter = Router();

authorRouter.post("/", (req: Request & { controllers: ControllerFactory }) => {
  req.controllers.createAccount(req.body);
});

authorRouter.get("/", (req: Request & { controllers: ControllerFactory }) => {
  req.controllers.accessAccount(req.query);
});

authorRouter.get(
  "/:id/books",
  (req: Request & { controllers: ControllerFactory }) => {
    const accessToken = req.get("Authorization");

    req.controllers.retrieveAuthorBooks(
      accessToken ? accessToken.replace(/bearer /i, "") : ""
    );
  }
);

export { authorRouter };
