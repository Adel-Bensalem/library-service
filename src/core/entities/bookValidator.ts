import { Author, Book, BookEditionError, Identifable } from "../../types";
import { BookCreationError } from "../../types/errors/bookCreationError";

function validateBook(
  book: Book
): { isTitleInvalid: boolean; isDescriptionInvalid: boolean } {
  return {
    isTitleInvalid: book.title.length === 0,
    isDescriptionInvalid: book.description.length === 0,
  };
}

function doesBookCreationHaveError(error: BookCreationError): boolean {
  return (
    error.isTitleInvalid ||
    error.isDescriptionInvalid ||
    error.wasAccountNotFound ||
    error.hasUnExpectedError
  );
}

function doesBookEditionHaveError(error: BookEditionError): boolean {
  return (
    error.isTitleInvalid ||
    error.isDescriptionInvalid ||
    error.wasAuthorNotFound ||
    error.wasBookNotFound ||
    error.isAuthorNotAuthorizedToEditBook ||
    error.hasUnExpectedError
  );
}

function isAuthorBookAuthor(
  author: Identifable<Author>,
  book: Identifable<Book>
): boolean {
  return author.id.toString() === book.author.id.toString();
}

export {
  validateBook,
  doesBookCreationHaveError,
  doesBookEditionHaveError,
  isAuthorBookAuthor,
};
