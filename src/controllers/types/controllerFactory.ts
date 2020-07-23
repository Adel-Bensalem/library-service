import { AccountCreationController } from "../createAccount";
import { AccountAccessController } from "../accessAccount";
import { BookCreationController } from "../createBook";
import { ChapterAdditionController } from "../addChapter";
import { BooksRetrievalController } from "../retrieveBooks";
import { ChaptersRetrievalController } from "../retrieveChapters";
import { BookEditionController } from "../editBook";
import { ChapterEditionController } from "../editChapter";
import { ChapterCommentController } from "../commentChapter";
import { AuthorBooksRetrievalController } from "../retrieveAuthorBooks";

interface ControllerFactory {
  createAccount: AccountCreationController;
  accessAccount: AccountAccessController;
  createBook: BookCreationController;
  addChapter: ChapterAdditionController;
  retrieveBooks: BooksRetrievalController;
  retrieveChapters: ChaptersRetrievalController;
  editBook: BookEditionController;
  editChapter: ChapterEditionController;
  commentChapter: ChapterCommentController;
  retrieveAuthorBooks: AuthorBooksRetrievalController;
}

export { ControllerFactory };
