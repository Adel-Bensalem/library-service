import { Book, Chapter, ChapterAdditionError, Identifable } from "../../types";
import { AccessTokenDecoder } from "../adapters/accessTokenDecoder";
import { BookRepository } from "../adapters/bookRepository";
import { AuthorRepository } from "../adapters/authorRepository";
import { ChapterRepository } from "../adapters/chapterRepository";
import { isAuthorBookAuthor } from "../entities/bookValidator";
import {
  isChapterInvalid,
  validateChapter,
} from "../entities/chapterValidator";

type ChapterAdditionInteractor = (requestModel: {
  accessToken: string;
  book: Identifable<Book>;
  chapter: Chapter;
}) => void;

interface ChapterAdditionPresenter {
  presentChapterAdditionSuccess(chapter: Chapter): void;
  presentChapterAdditionFailure(error: ChapterAdditionError): void;
}

function createChapterAdditionError(
  error: Partial<ChapterAdditionError>
): ChapterAdditionError {
  return {
    isChapterInvalid: { isChapterBodyEmpty: false, isTitleInvalid: false },
    wasAuthorNotFound: false,
    wasBookNotFound: false,
    isAuthorNotAuthorizedToEditBook: false,
    hasUnExpectedError: false,
    ...error,
  };
}

function createChapterAdditionInteractor(
  accessTokenDecoder: AccessTokenDecoder,
  repository: AuthorRepository & BookRepository & ChapterRepository,
  presenter: ChapterAdditionPresenter
): ChapterAdditionInteractor {
  return ({ accessToken, chapter, book }) => {
    const error = validateChapter(chapter);

    isChapterInvalid(error)
      ? presenter.presentChapterAdditionFailure(
          createChapterAdditionError({ isChapterInvalid: error })
        )
      : accessTokenDecoder
          .decodeAccessToken(accessToken)
          .then(repository.getAccount)
          .then((author) => {
            !author
              ? presenter.presentChapterAdditionFailure(
                  createChapterAdditionError({
                    isChapterInvalid: error,
                    wasAuthorNotFound: true,
                  })
                )
              : repository.getBook(book.id).then((book) =>
                  !book
                    ? presenter.presentChapterAdditionFailure(
                        createChapterAdditionError({
                          isChapterInvalid: error,
                          wasBookNotFound: true,
                        })
                      )
                    : isAuthorBookAuthor(author, book)
                    ? repository
                        .createChapter(book, {
                          ...chapter,
                          number: book.chapters.length + 1,
                        })
                        .then(presenter.presentChapterAdditionSuccess)
                        .catch(() =>
                          presenter.presentChapterAdditionFailure(
                            createChapterAdditionError({
                              isChapterInvalid: error,
                              hasUnExpectedError: true,
                            })
                          )
                        )
                    : presenter.presentChapterAdditionFailure(
                        createChapterAdditionError({
                          isChapterInvalid: error,
                          isAuthorNotAuthorizedToEditBook: true,
                        })
                      )
                );
          })
          .catch(() =>
            presenter.presentChapterAdditionFailure(
              createChapterAdditionError({
                isChapterInvalid: error,
                hasUnExpectedError: true,
              })
            )
          );
  };
}

export {
  createChapterAdditionInteractor,
  ChapterAdditionInteractor,
  ChapterAdditionPresenter,
};
