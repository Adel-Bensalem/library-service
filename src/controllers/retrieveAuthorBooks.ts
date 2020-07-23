import { InteractorFactory } from "../core/types/interactorFactory";

type AuthorBooksRetrievalController = (accessToken: string) => void;

function createAuthorBooksRetrievalController(
  interactors: InteractorFactory
): AuthorBooksRetrievalController {
  return (accessToken) => interactors.retrieveAuthorBooks(accessToken);
}

export { createAuthorBooksRetrievalController, AuthorBooksRetrievalController };
