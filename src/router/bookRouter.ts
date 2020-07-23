import { Router, Request } from "express";

import { ControllerFactory } from "../controllers/types/controllerFactory";

const bookRouter = Router();

bookRouter.get("/", (req: Request & { controllers: ControllerFactory }) =>
  req.controllers.retrieveBooks(req.query)
);
bookRouter.get(
  "/:id/chapters",
  (req: Request & { controllers: ControllerFactory }) =>
    req.controllers.retrieveChapters(req.params.id)
);
bookRouter.post("/", (req: Request & { controllers: ControllerFactory }) => {
  const accessToken = req.get("Authorization");

  req.controllers.createBook(
    accessToken ? accessToken.replace(/bearer /i, "") : "",
    req.body
  );
});
bookRouter.put("/:id", (req: Request & { controllers: ControllerFactory }) => {
  const accessToken = req.get("Authorization");

  req.controllers.editBook(
    accessToken ? accessToken.replace(/bearer /i, "") : "",
    req.body.book,
    req.body.nextBook
  );
});

export { bookRouter };
