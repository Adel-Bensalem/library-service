import { InteractorFactory } from "./types/interactorFactory";
import { AdaptersMap } from "./types/adaptersMap";
import { PresenterFactory } from "./types/presenterFactory";
import { AuthorRepository } from "./adapters/authorRepository";
import { BookRepository } from "./adapters/bookRepository";
import { AccessTokenDecoder } from "./adapters/accessTokenDecoder";
import { AccessTokenGenerator } from "./adapters/accessTokenGenerator";
import { ChapterRepository } from "./adapters/chapterRepository";
import { CommentRepository } from "./adapters/commentRepository";
import { createAccountCreationInteractor } from "./useCases/createAccount";
import { createAccessAccountInteractor } from "./useCases/accessAccount";
import { createBookCreationInteractor } from "./useCases/createBook";
import { createChapterAdditionInteractor } from "./useCases/addChapter";
import { createBooksRetrievalInteractor } from "./useCases/retrieveBooks";
import { createChaptersRetrievalInteractor } from "./useCases/retrieveChapters";
import { createBookEditionInteractor } from "./useCases/editBook";
import { createChapterEditionInteractor } from "./useCases/editChapter";
import { createChapterCommentInteractor } from "./useCases/commentChapter";
import { createAuthorBooksRetrievalInteractor } from "./useCases/retrieveAuthorBooks";

function createInteractorFactory(
  adaptersMap: AdaptersMap,
  presenterFactory: PresenterFactory
): InteractorFactory {
  return {
    createAccount: createAccountCreationInteractor(
      adaptersMap.authorRepository,
      presenterFactory
    ),
    accessAccount: createAccessAccountInteractor(
      adaptersMap.authorRepository,
      adaptersMap.accessTokenGenerator,
      presenterFactory
    ),
    createBook: createBookCreationInteractor(
      { ...adaptersMap.authorRepository, ...adaptersMap.bookRepository },
      adaptersMap.accessTokenDecoder,
      presenterFactory
    ),
    addChapter: createChapterAdditionInteractor(
      adaptersMap.accessTokenDecoder,
      {
        ...adaptersMap.authorRepository,
        ...adaptersMap.bookRepository,
        ...adaptersMap.chapterRepository,
      },
      presenterFactory
    ),
    retrieveBooks: createBooksRetrievalInteractor(
      adaptersMap.bookRepository,
      presenterFactory
    ),
    retrieveChapters: createChaptersRetrievalInteractor(
      { ...adaptersMap.chapterRepository, ...adaptersMap.bookRepository },
      presenterFactory
    ),
    editBook: createBookEditionInteractor(
      { ...adaptersMap.bookRepository, ...adaptersMap.authorRepository },
      adaptersMap.accessTokenDecoder,
      presenterFactory
    ),
    editChapter: createChapterEditionInteractor(
      {
        ...adaptersMap.authorRepository,
        ...adaptersMap.bookRepository,
        ...adaptersMap.chapterRepository,
      },
      adaptersMap.accessTokenDecoder,
      presenterFactory
    ),
    commentChapter: createChapterCommentInteractor(
      adaptersMap.accessTokenDecoder,
      {
        ...adaptersMap.authorRepository,
        ...adaptersMap.chapterRepository,
        ...adaptersMap.commentRepository,
      },
      presenterFactory
    ),
    retrieveAuthorBooks: createAuthorBooksRetrievalInteractor(
      adaptersMap.accessTokenDecoder,
      { ...adaptersMap.authorRepository, ...adaptersMap.bookRepository },
      presenterFactory
    ),
  };
}

export {
  createInteractorFactory,
  AuthorRepository,
  InteractorFactory,
  AccessTokenGenerator,
  AccessTokenDecoder,
  BookRepository,
  ChapterRepository,
  CommentRepository,
  PresenterFactory,
};
