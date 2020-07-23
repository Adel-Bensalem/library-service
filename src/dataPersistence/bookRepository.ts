import { Db, ObjectId } from "mongodb";
import { BookRepository } from "../core/adapters/bookRepository";
import { Author, Book, Id, Identifable } from "../types";
import { Collections } from "./types/collections";

function createBook(db: Db) {
  return (
    author: Identifable<Author>,
    book: Book
  ): Promise<Identifable<Book>> =>
    db
      .collection(Collections.BOOK)
      .insertOne({ ...book, author })
      .then(({ insertedId }) => ({
        id: insertedId.toString(),
        ...book,
        author,
      }));
}

function getBook(db: Db) {
  return (id: Id): Promise<Identifable<Book> | null> =>
    db
      .collection(Collections.BOOK)
      .findOne({ _id: { $eq: new ObjectId(id) } })
      .then((document) =>
        !!document ? { ...document, id: document._id } : null
      );
}

function getBooks(db: Db) {
  return (filter: { title: string }): Promise<Identifable<Book>[]> =>
    db
      .collection(Collections.BOOK)
      .find({ title: new RegExp(filter.title, "i") })
      .toArray()
      .then((books) => books.map((book) => ({ ...book, id: book._id })));
}

function getBooksByAuthor(db: Db) {
  return (author: Identifable<Author>): Promise<Identifable<Book>[]> =>
    db
      .collection(Collections.BOOK)
      .find({ "author._id": { $eq: new ObjectId(author.id) } })
      .toArray()
      .then((books) => books.map((book) => ({ ...book, id: book._id })));
}

function updateBook(db: Db) {
  return (id: Id, nextBook: Book): Promise<Identifable<Book>> =>
    db
      .collection(Collections.BOOK)
      .updateOne(
        { _id: { $eq: new ObjectId(id) } },
        { $set: { title: nextBook.title, description: nextBook.description } }
      )
      .then(() => ({ id, ...nextBook }));
}

function createBookRepository(db: Db): BookRepository {
  return {
    getBooksByAuthor: getBooksByAuthor(db),
    getBooks: getBooks(db),
    getBook: getBook(db),
    updateBook: updateBook(db),
    createBook: createBook(db),
  };
}

export { createBookRepository };
