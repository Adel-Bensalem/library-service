import { Book, Identifable } from "../../types";
import { BookCreationError } from "../../types/errors/bookCreationError";
import { AuthorRepository } from "../adapters/authorRepository";
import { BookRepository } from "../adapters/bookRepository";
import { AccessTokenDecoder } from "../adapters/accessTokenDecoder";
import {
  doesBookCreationHaveError,
  validateBook,
} from "../entities/bookValidator";

type BookCreationInteractor = (requestModel: {
  accessToken: string;
  book: Book;
}) => void;

interface BookCreationPresenter {
  presentBookCreationSuccess(book: Identifable<Book>): void;
  presentBookCreationFailure(error: BookCreationError): void;
}

function createBookCreationInteractor(
  repository: AuthorRepository & BookRepository,
  accessTokenDecoder: AccessTokenDecoder,
  presenter: BookCreationPresenter
): BookCreationInteractor {
  return ({ accessToken, book }) => {
    const error: BookCreationError = {
      ...validateBook(book),
      hasUnExpectedError: false,
      wasAccountNotFound: false,
    };

    doesBookCreationHaveError(error)
      ? presenter.presentBookCreationFailure(error)
      : accessTokenDecoder
          .decodeAccessToken(accessToken)
          .then(repository.getAccount)
          .then((author) => {
            !author
              ? presenter.presentBookCreationFailure({
                  ...error,
                  wasAccountNotFound: true,
                })
              : repository
                  .createBook(author, { ...book, chapters: [] })
                  .then(presenter.presentBookCreationSuccess)
                  .catch(() =>
                    presenter.presentBookCreationFailure({
                      ...error,
                      hasUnExpectedError: true,
                    })
                  );
          })
          .catch(() =>
            presenter.presentBookCreationFailure({
              ...error,
              hasUnExpectedError: true,
            })
          );
  };
}

export {
  createBookCreationInteractor,
  BookCreationInteractor,
  BookCreationPresenter,
};
