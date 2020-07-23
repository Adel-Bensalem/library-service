///<reference path="global.d.ts"/>

import express from "express";
import morgan from "morgan";

import { router } from "./router/main";
import { createInteractorFactory } from "./core/main";
import { createControllerFactory } from "./controllers/main";
import { createHttpResponseToPresenterAdapter } from "./tools/httpResponseToPresenterAdapter";
import { createAccessTokenGenerator } from "./tools/accessTokenGenerator";
import { createAccessTokenDecoder } from "./tools/accessTokenDecoder";
import {
  createBookRepository,
  createAuthorRepository,
  createCommentRepository,
  createDatabase,
  createChapterRepository,
} from "./dataPersistence/main";

console.log("Initializing Database");

createDatabase(
  {
    dbName: process.env.DB_NAME || "testDB",
    connectionUrl: process.env.DB_CONNECTION_URL || "mongodb://localhost:27017",
  },
  (db, closeDb) => {
    console.log("Initialized Database");

    const app = express();

    app.use(morgan("combined"));
    app.use(express.json());

    app.use((req, res, next) => {
      req.controllers = createControllerFactory(
        createInteractorFactory(
          {
            accessTokenDecoder: createAccessTokenDecoder(
              process.env.ACCESS_TOKEN_SECRET || "This is a secret"
            ),
            accessTokenGenerator: createAccessTokenGenerator(
              process.env.ACCESS_TOKEN_SECRET || "This is a secret"
            ),
            authorRepository: createAuthorRepository(db),
            bookRepository: createBookRepository(db),
            chapterRepository: createChapterRepository(db),
            commentRepository: createCommentRepository(db),
          },
          createHttpResponseToPresenterAdapter(res)
        )
      );

      next();
    });
    app.use(router);
    process.on("exit", closeDb);
    app.listen(process.env.PORT || 3000, () =>
      console.log("App listening on port 3000")
    );
  },
  () => {
    console.log("Database Initialization Failed !\nKilling process");
    process.exit(500);
  }
);
