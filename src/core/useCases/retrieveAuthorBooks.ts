import { AuthorBooksRetrievalError, Book, Id, Identifable } from "../../types";
import { AccessTokenDecoder } from "../adapters/accessTokenDecoder";
import { AuthorRepository } from "../adapters/authorRepository";
import { BookRepository } from "../adapters/bookRepository";

type AuthorBooksRetrievalInteractor = (accessToken: string) => void;

interface AuthorBooksRetrievalPresenter {
  presentAuthorBooksRetrievalSuccess(books: Identifable<Book>[]): void;
  presentAuthorBooksRetrievalFailure(error: AuthorBooksRetrievalError): void;
}

function createAuthorBooksRetrievalInteractor(
  accessTokenDecoder: AccessTokenDecoder,
  repository: AuthorRepository & BookRepository,
  presenter: AuthorBooksRetrievalPresenter
): AuthorBooksRetrievalInteractor {
  return (accessToken) =>
    accessTokenDecoder
      .decodeAccessToken(accessToken)
      .then(repository.getAccount)
      .then((author) =>
        !!author
          ? repository
              .getBooksByAuthor(author)
              .then(presenter.presentAuthorBooksRetrievalSuccess)
              .catch(() =>
                presenter.presentAuthorBooksRetrievalFailure({
                  hasUnExpectedError: true,
                  wasAuthorNotFound: false,
                })
              )
          : presenter.presentAuthorBooksRetrievalFailure({
              hasUnExpectedError: false,
              wasAuthorNotFound: true,
            })
      )
      .catch(() =>
        presenter.presentAuthorBooksRetrievalFailure({
          hasUnExpectedError: true,
          wasAuthorNotFound: false,
        })
      );
}

export {
  createAuthorBooksRetrievalInteractor,
  AuthorBooksRetrievalInteractor,
  AuthorBooksRetrievalPresenter,
};
