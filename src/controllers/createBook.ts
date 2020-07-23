import { Book } from "../types";
import { InteractorFactory } from "../core/types/interactorFactory";

type BookCreationController = (accessToken: unknown, book: unknown) => void;

function extractAccessToken(accessToken: any): string {
  return accessToken || "";
}

function extractBook(book: any): Book {
  return {
    ...book,
    description: !!book ? book.description || "" : "",
    title: !!book ? book.title || "" : "",
  };
}

function createBookCreationController(
  interactors: InteractorFactory
): BookCreationController {
  return (accessToken, book) =>
    interactors.createBook({
      accessToken: extractAccessToken(accessToken),
      book: extractBook(book),
    });
}

export { createBookCreationController, BookCreationController };
