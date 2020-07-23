import { Router, Request } from "express";

import { ControllerFactory } from "../controllers/types/controllerFactory";

const commentRouter = Router();

commentRouter.post("/", (req: Request & { controllers: ControllerFactory }) => {
  const accessToken = req.get("Authorization");

  req.controllers.commentChapter(
    accessToken ? accessToken.replace(/bearer /i, "") : "",
    req.body.chapter,
    req.body.comment
  );
});

export { commentRouter };
