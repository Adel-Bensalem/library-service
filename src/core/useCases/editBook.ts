import { Book, BookEditionError, Identifable } from "../../types";
import { BookRepository } from "../adapters/bookRepository";
import { AuthorRepository } from "../adapters/authorRepository";
import { AccessTokenDecoder } from "../adapters/accessTokenDecoder";
import {
  doesBookEditionHaveError,
  isAuthorBookAuthor,
  validateBook,
} from "../entities/bookValidator";

type BookEditionInteractor = (requestModel: {
  accessToken: string;
  book: Identifable<Book>;
  nextBook: Book;
}) => void;

interface BookEditionPresenter {
  presentBookEditionSuccess(book: Identifable<Book>): void;
  presentBookEditionFailure(error: BookEditionError): void;
}

function createBookEditionInteractor(
  repository: BookRepository & AuthorRepository,
  accessTokenDecoder: AccessTokenDecoder,
  presenter: BookEditionPresenter
): BookEditionInteractor {
  return (requestModel) => {
    const error: BookEditionError = {
      ...validateBook(requestModel.nextBook),
      hasUnExpectedError: false,
      isAuthorNotAuthorizedToEditBook: false,
      wasAuthorNotFound: false,
      wasBookNotFound: false,
    };

    doesBookEditionHaveError(error)
      ? presenter.presentBookEditionFailure(error)
      : accessTokenDecoder
          .decodeAccessToken(requestModel.accessToken)
          .then(repository.getAccount)
          .then((author) => {
            !author
              ? presenter.presentBookEditionFailure({
                  ...error,
                  wasAuthorNotFound: true,
                })
              : repository.getBook(requestModel.book.id).then((book) =>
                  !book
                    ? presenter.presentBookEditionFailure({
                        ...error,
                        wasBookNotFound: true,
                      })
                    : isAuthorBookAuthor(author, book)
                    ? repository
                        .updateBook(book.id, requestModel.nextBook)
                        .then(presenter.presentBookEditionSuccess)
                        .catch(() =>
                          presenter.presentBookEditionFailure({
                            ...error,
                            hasUnExpectedError: true,
                          })
                        )
                    : presenter.presentBookEditionFailure({
                        ...error,
                        isAuthorNotAuthorizedToEditBook: true,
                      })
                );
          })
          .catch(() =>
            presenter.presentBookEditionFailure({
              ...error,
              hasUnExpectedError: true,
            })
          );
  };
}

export {
  createBookEditionInteractor,
  BookEditionInteractor,
  BookEditionPresenter,
};
