import { InteractorFactory } from "../core/types/interactorFactory";
import { ControllerFactory } from "./types/controllerFactory";
import { PresenterFactory } from "../core/types/presenterFactory";
import { createAccountCreationController } from "./createAccount";
import { createAccountAccessController } from "./accessAccount";
import { createBookCreationController } from "./createBook";
import { createChapterAdditionController } from "./addChapter";
import { createBooksRetrievalController } from "./retrieveBooks";
import { createChaptersRetrievalController } from "./retrieveChapters";
import { createBookEditionController } from "./editBook";
import { createChapterEditionController } from "./editChapter";
import { createChapterCommentController } from "./commentChapter";
import { createAuthorBooksRetrievalController } from "./retrieveAuthorBooks";

function createControllerFactory(
  interactors: InteractorFactory
): ControllerFactory {
  return {
    createAccount: createAccountCreationController(interactors),
    accessAccount: createAccountAccessController(interactors),
    createBook: createBookCreationController(interactors),
    addChapter: createChapterAdditionController(interactors),
    retrieveBooks: createBooksRetrievalController(interactors),
    retrieveChapters: createChaptersRetrievalController(interactors),
    editBook: createBookEditionController(interactors),
    editChapter: createChapterEditionController(interactors),
    commentChapter: createChapterCommentController(interactors),
    retrieveAuthorBooks: createAuthorBooksRetrievalController(interactors),
  };
}

export { createControllerFactory, ControllerFactory, PresenterFactory };
