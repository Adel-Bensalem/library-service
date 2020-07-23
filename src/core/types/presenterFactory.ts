import { AccountCreationPresenter } from "../useCases/createAccount";
import { AccountAccessPresenter } from "../useCases/accessAccount";
import { BookCreationPresenter } from "../useCases/createBook";
import { ChapterAdditionPresenter } from "../useCases/addChapter";
import { BooksRetrievalPresenter } from "../useCases/retrieveBooks";
import { ChaptersRetrievalPresenter } from "../useCases/retrieveChapters";
import { BookEditionPresenter } from "../useCases/editBook";
import { ChapterEditionPresenter } from "../useCases/editChapter";
import { ChapterCommentPresenter } from "../useCases/commentChapter";
import { AuthorBooksRetrievalPresenter } from "../useCases/retrieveAuthorBooks";

interface PresenterFactory
  extends AccountCreationPresenter,
    AccountAccessPresenter,
    BookCreationPresenter,
    ChapterAdditionPresenter,
    BooksRetrievalPresenter,
    ChaptersRetrievalPresenter,
    BookEditionPresenter,
    ChapterEditionPresenter,
    ChapterCommentPresenter,
    AuthorBooksRetrievalPresenter {}

export { PresenterFactory };
