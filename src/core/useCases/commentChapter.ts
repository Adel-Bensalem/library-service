import {
  Chapter,
  ChapterCommentError,
  Comment,
  Identifable,
} from "../../types";
import { isCommentValid } from "../entities/commentValidator";
import { CommentRepository } from "../adapters/commentRepository";
import { AccessTokenDecoder } from "../adapters/accessTokenDecoder";
import { AuthorRepository } from "../adapters/authorRepository";
import { ChapterRepository } from "../adapters/chapterRepository";

type ChapterCommentInteractor = (requestModel: {
  accessToken: string;
  chapter: Chapter;
  comment: Comment;
}) => void;

interface ChapterCommentPresenter {
  presentChapterCommentSuccess(comment: Identifable<Comment>): void;
  presentChapterCommentFailure(error: ChapterCommentError): void;
}

function getCreationDate(): string {
  const now = new Date();

  return `${now.getMonth()}-${now.getDate()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

function createChapterCommentInteractor(
  accessTokenDecoder: AccessTokenDecoder,
  repository: AuthorRepository & ChapterRepository & CommentRepository,
  presenter: ChapterCommentPresenter
): ChapterCommentInteractor {
  return ({ accessToken, comment, chapter }) => {
    const error: ChapterCommentError = {
      isCommentBodyEmpty: !isCommentValid(comment),
      hasUnExpectedError: false,
      wasChapterNotFound: false,
      wasCommentAuthorNotFound: false,
    };

    error.isCommentBodyEmpty
      ? presenter.presentChapterCommentFailure(error)
      : accessTokenDecoder
          .decodeAccessToken(accessToken)
          .then(repository.getAccount)
          .then((author) => {
            !author
              ? presenter.presentChapterCommentFailure({
                  ...error,
                  wasCommentAuthorNotFound: true,
                })
              : repository
                  .getChapter(chapter)
                  .then((chapter) =>
                    !chapter
                      ? presenter.presentChapterCommentFailure({
                          ...error,
                          wasChapterNotFound: true,
                        })
                      : repository
                          .createComment(chapter, {
                            body: comment.body,
                            author,
                            creationDate: getCreationDate(),
                          })
                          .then(presenter.presentChapterCommentSuccess)
                          .catch(() =>
                            presenter.presentChapterCommentFailure({
                              ...error,
                              hasUnExpectedError: true,
                            })
                          )
                  )
                  .catch(() =>
                    presenter.presentChapterCommentFailure({
                      ...error,
                      wasChapterNotFound: true,
                    })
                  );
          })
          .catch(() =>
            presenter.presentChapterCommentFailure({
              ...error,
              hasUnExpectedError: true,
            })
          );
  };
}

export {
  createChapterCommentInteractor,
  ChapterCommentInteractor,
  ChapterCommentPresenter,
};
