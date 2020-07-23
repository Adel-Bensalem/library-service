import { Router } from "express";

import { authorRouter } from "./authorRouter";
import { bookRouter } from "./bookRouter";
import { chapterRouter } from "./chapterRouter";
import { commentRouter } from "./commentRouter";

const router = Router();

router.use("/authors", authorRouter);
router.use("/books", bookRouter);
router.use("/chapters", chapterRouter);
router.use("/comments", commentRouter);

export { router };
