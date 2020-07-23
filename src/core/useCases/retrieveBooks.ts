import { Book, Identifable, BooksRetrievalError } from "../../types";
import { BookRepository } from "../adapters/bookRepository";

type BooksRetrievalInteractor = (filter: { title: string }) => void;

interface BooksRetrievalPresenter {
  presentBooksRetrievalSuccess(books: Identifable<Book>[]): void;
  presentBooksRetrievalFailure(error: BooksRetrievalError): void;
}

function createBooksRetrievalInteractor(
  repository: BookRepository,
  presenter: BooksRetrievalPresenter
): BooksRetrievalInteractor {
  return (filter) =>
    repository
      .getBooks(filter)
      .then(presenter.presentBooksRetrievalSuccess)
      .catch(() =>
        presenter.presentBooksRetrievalFailure({ hasUnExpectedError: true })
      );
}

export {
  createBooksRetrievalInteractor,
  BooksRetrievalInteractor,
  BooksRetrievalPresenter,
};
