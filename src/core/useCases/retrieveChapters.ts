import { Chapter, ChaptersRetrievalError, Id } from "../../types";
import { ChapterRepository } from "../adapters/chapterRepository";
import { BookRepository } from "../adapters/bookRepository";

type ChaptersRetrievalInteractor = (bookId: Id) => void;

interface ChaptersRetrievalPresenter {
  presentChaptersRetrievalSuccess(chapters: Chapter[]): void;
  presentChaptersRetrievalFailure(error: ChaptersRetrievalError): void;
}

function createChaptersRetrievalInteractor(
  repository: ChapterRepository & BookRepository,
  presenter: ChaptersRetrievalPresenter
): ChaptersRetrievalInteractor {
  return (bookId) =>
    repository
      .getBook(bookId)
      .then((book) =>
        !!book
          ? repository
              .getChapters(book)
              .then(presenter.presentChaptersRetrievalSuccess)
              .catch(() =>
                presenter.presentChaptersRetrievalFailure({
                  hasUnExpectedError: true,
                  wasBookNotFound: false,
                })
              )
          : presenter.presentChaptersRetrievalFailure({
              hasUnExpectedError: false,
              wasBookNotFound: true,
            })
      )
      .catch(() =>
        presenter.presentChaptersRetrievalFailure({
          hasUnExpectedError: false,
          wasBookNotFound: true,
        })
      );
}

export {
  createChaptersRetrievalInteractor,
  ChaptersRetrievalInteractor,
  ChaptersRetrievalPresenter,
};
