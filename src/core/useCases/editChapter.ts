import { Chapter, ChapterEditionError } from "../../types";
import { AuthorRepository } from "../adapters/authorRepository";
import { BookRepository } from "../adapters/bookRepository";
import { ChapterRepository } from "../adapters/chapterRepository";
import { AccessTokenDecoder } from "../adapters/accessTokenDecoder";
import {
  isChapterInvalid,
  validateChapter,
} from "../entities/chapterValidator";
import { isAuthorBookAuthor } from "../entities/bookValidator";

type ChapterEditionInteractor = (requestModel: {
  accessToken: string;
  chapter: Chapter;
  nextChapter: Chapter;
}) => void;

interface ChapterEditionPresenter {
  presentChapterEditionSuccess(chapter: Chapter): void;
  presentChapterEditionFailure(error: ChapterEditionError): void;
}

function createChapterEditionInteractor(
  repository: AuthorRepository & BookRepository & ChapterRepository,
  accessTokenDecoder: AccessTokenDecoder,
  presenter: ChapterEditionPresenter
): ChapterEditionInteractor {
  return (requestModel) => {
    const error: ChapterEditionError = {
      isChapterInvalid: validateChapter(requestModel.nextChapter),
      hasUnExpectedError: false,
      isAuthorNotAuthorizedToEditBook: false,
      wasAuthorNotFound: false,
      wasBookNotFound: false,
      wasChapterNotFound: false,
    };

    isChapterInvalid(error.isChapterInvalid)
      ? presenter.presentChapterEditionFailure(error)
      : accessTokenDecoder
          .decodeAccessToken(requestModel.accessToken)
          .then(repository.getAccount)
          .then((author) => {
            !author
              ? presenter.presentChapterEditionFailure({
                  ...error,
                  wasAuthorNotFound: true,
                })
              : repository.getBook(requestModel.chapter.book.id).then((book) =>
                  !book
                    ? presenter.presentChapterEditionFailure({
                        ...error,
                        wasBookNotFound: true,
                      })
                    : isAuthorBookAuthor(author, book)
                    ? repository
                        .updateChapter(
                          requestModel.chapter,
                          requestModel.nextChapter
                        )
                        .then(presenter.presentChapterEditionSuccess)
                        .catch(() =>
                          presenter.presentChapterEditionFailure({
                            ...error,
                            hasUnExpectedError: true,
                          })
                        )
                    : presenter.presentChapterEditionFailure({
                        ...error,
                        isAuthorNotAuthorizedToEditBook: true,
                      })
                );
          })
          .catch(() =>
            presenter.presentChapterEditionFailure({
              ...error,
              hasUnExpectedError: true,
            })
          );
  };
}

export {
  createChapterEditionInteractor,
  ChapterEditionInteractor,
  ChapterEditionPresenter,
};
