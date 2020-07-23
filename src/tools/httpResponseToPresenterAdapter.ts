import { Response } from "express";

import { PresenterFactory } from "../core/main";

function createHttpResponseToPresenterAdapter(
  response: Response
): PresenterFactory {
  return {
    presentAuthorBooksRetrievalFailure: (error) =>
      response.status(error.hasUnExpectedError ? 500 : 403).send(error),
    presentAuthorBooksRetrievalSuccess: (books) =>
      response.status(200).send(books),
    presentChapterCommentFailure: (error) =>
      response.status(error.hasUnExpectedError ? 500 : 403).send(error),
    presentChapterCommentSuccess: (comment) =>
      response.status(200).send(comment),
    presentChapterEditionFailure: (error) =>
      response.status(error.hasUnExpectedError ? 500 : 403).send(error),
    presentChapterEditionSuccess: (chapter) =>
      response.status(200).send(chapter),
    presentBookEditionFailure: (error) =>
      response.status(error.hasUnExpectedError ? 500 : 403).send(error),
    presentBookEditionSuccess: (book) => response.status(200).send(book),
    presentChaptersRetrievalFailure: (error) =>
      response.status(error.hasUnExpectedError ? 500 : 403).send(error),
    presentChaptersRetrievalSuccess: (chapters) =>
      response.status(200).send(chapters),
    presentBooksRetrievalFailure: (error) => response.status(500).send(error),
    presentBooksRetrievalSuccess: (books) => response.status(200).send(books),
    presentChapterAdditionFailure: (error) =>
      response.status(error.hasUnExpectedError ? 500 : 403).send(error),
    presentChapterAdditionSuccess: (chapter) =>
      response.status(200).send(chapter),
    presentBookCreationFailure: (error) =>
      response.status(error.hasUnExpectedError ? 500 : 403).send(error),
    presentBookCreationSuccess: (book) => response.status(200).send(book),
    presentAccountAccessFailure: (error) =>
      response.status(error.wasAccountNotFound ? 403 : 500).send(error),
    presentAccountAccessSuccess: (author, accessToken) =>
      response.status(200).send({ author, accessToken }),
    presentAccountCreationSuccess: (author) =>
      response.status(200).send(author),
    presentAccountCreationFailure: (error) =>
      response.status(error.hasUnExpectedError ? 500 : 403).send(error),
  };
}

export { createHttpResponseToPresenterAdapter };
