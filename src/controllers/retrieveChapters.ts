import { Id } from "../types";
import { InteractorFactory } from "../core/types/interactorFactory";

type ChaptersRetrievalController = (book: unknown) => void;

function extractBook(book: any): Id {
  return book || "";
}

function createChaptersRetrievalController(
  interactors: InteractorFactory
): ChaptersRetrievalController {
  return (book) => interactors.retrieveChapters(extractBook(book));
}

export { createChaptersRetrievalController, ChaptersRetrievalController };
