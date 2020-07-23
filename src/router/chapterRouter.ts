import { Router, Request } from "express";

import { ControllerFactory } from "../controllers/types/controllerFactory";

const chapterRouter = Router();

chapterRouter.post("/", (req: Request & { controllers: ControllerFactory }) => {
  const accessToken = req.get("Authorization");

  req.controllers.addChapter(
    accessToken ? accessToken.replace(/bearer /i, "") : "",
    req.body.book,
    req.body.chapter
  );
});

chapterRouter.put(
  "/:id",
  (req: Request & { controllers: ControllerFactory }) => {
    const accessToken = req.get("Authorization");

    req.controllers.editChapter(
      accessToken ? accessToken.replace(/bearer /i, "") : "",
      req.body.chapter,
      req.body.nextChapter
    );
  }
);

export { chapterRouter };
