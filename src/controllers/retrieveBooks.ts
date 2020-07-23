import { InteractorFactory } from "../core/types/interactorFactory";

type BooksRetrievalController = (filter: any) => void;

function extractFilter(filter: any): { title: string } {
  return {
    title: !!filter ? filter.title : "",
  };
}

function createBooksRetrievalController(
  interactors: InteractorFactory
): BooksRetrievalController {
  return (filter) => interactors.retrieveBooks(extractFilter(filter));
}

export { createBooksRetrievalController, BooksRetrievalController };
