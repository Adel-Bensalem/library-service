import { Book, Identifable } from "../types";
import { InteractorFactory } from "../core/types/interactorFactory";

type BookEditionController = (
  accessToken: unknown,
  book: unknown,
  nextBook: unknown
) => void;

function extractAccessToken(accessToken: any): string {
  return accessToken || "";
}

function extractBook(book: any): Identifable<Book> {
  return {
    ...book,
    description: !!book ? book.description || "" : "",
    title: !!book ? book.title || "" : "",
  };
}

function createBookEditionController(
  interactors: InteractorFactory
): BookEditionController {
  return (accessToken, book, nextBook) =>
    interactors.editBook({
      accessToken: extractAccessToken(accessToken),
      book: extractBook(book),
      nextBook: extractBook(nextBook),
    });
}

export { createBookEditionController, BookEditionController };
