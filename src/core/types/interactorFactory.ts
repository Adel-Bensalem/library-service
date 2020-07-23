import { AccountCreationInteractor } from "../useCases/createAccount";
import { AccountAccessInteractor } from "../useCases/accessAccount";
import { BookCreationInteractor } from "../useCases/createBook";
import { ChapterAdditionInteractor } from "../useCases/addChapter";
import { BooksRetrievalInteractor } from "../useCases/retrieveBooks";
import { ChaptersRetrievalInteractor } from "../useCases/retrieveChapters";
import { BookEditionInteractor } from "../useCases/editBook";
import { ChapterEditionInteractor } from "../useCases/editChapter";
import { ChapterCommentInteractor } from "../useCases/commentChapter";
import { AuthorBooksRetrievalInteractor } from "../useCases/retrieveAuthorBooks";

interface InteractorFactory {
  createAccount: AccountCreationInteractor;
  accessAccount: AccountAccessInteractor;
  createBook: BookCreationInteractor;
  addChapter: ChapterAdditionInteractor;
  retrieveBooks: BooksRetrievalInteractor;
  retrieveChapters: ChaptersRetrievalInteractor;
  editBook: BookEditionInteractor;
  editChapter: ChapterEditionInteractor;
  commentChapter: ChapterCommentInteractor;
  retrieveAuthorBooks: AuthorBooksRetrievalInteractor;
}

export { InteractorFactory };
