import { Author, Book, Id, Identifable } from "../../types";

interface BookRepository {
  createBook(
    author: Identifable<Author>,
    book: Book
  ): Promise<Identifable<Book>>;
  getBook(id: Id): Promise<Identifable<Book> | null>;
  getBooks(filter: { title: string }): Promise<Identifable<Book>[]>;
  getBooksByAuthor(author: Identifable<Author>): Promise<Identifable<Book>[]>;
  updateBook(id: Id, nextBook: Book): Promise<Identifable<Book>>;
}

export { BookRepository };
