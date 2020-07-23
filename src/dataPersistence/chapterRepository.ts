import { Db, ObjectId } from "mongodb";
import { ChapterRepository } from "../core/adapters/chapterRepository";
import { Book, Chapter, Identifable } from "../types";
import { Collections } from "./types/collections";

function createChapter(db: Db) {
  return (book: Identifable<Book>, chapter: Chapter): Promise<Chapter> =>
    db
      .collection(Collections.BOOK)
      .updateOne(
        { _id: { $eq: new ObjectId(book.id) } },
        { $push: { chapters: chapter } }
      )
      .then(() => ({ ...chapter, book }));
}

function getChapters(db: Db) {
  return (book: Identifable<Book>): Promise<Chapter[]> =>
    db
      .collection(Collections.BOOK)
      .findOne({ _id: new ObjectId(book.id) })
      .then((book) => (!!book ? book.chapters : []))
      .then((chapters: Chapter[]) =>
        chapters.map((chapter) => ({ ...chapter, book }))
      );
}

function updateChapter(db: Db) {
  return (chapter: Chapter, nextChapter: Chapter): Promise<Chapter> =>
    db
      .collection(Collections.BOOK)
      .updateOne(
        {
          _id: new ObjectId(chapter.book.id),
          "chapters.number": { $eq: chapter.number },
        },
        {
          $set: {
            "chapters.$.title": nextChapter.title,
            "chapters.$.body": nextChapter.body,
          },
        }
      )
      .then(() => nextChapter);
}

function getChapterFromBook(
  book: Identifable<Book>,
  number: number
): Chapter | null {
  const chapter: Chapter | undefined = book.chapters.find(
    (chapter: Chapter) => chapter.number === number
  );

  return chapter ? { ...chapter, book } : null;
}

function getChapter(db: Db) {
  return (chapter: Chapter): Promise<Chapter | null> =>
    db
      .collection(Collections.BOOK)
      .findOne({ _id: new ObjectId(chapter.book.id) })
      .then((book) =>
        !!book ? getChapterFromBook(book, chapter.number) : null
      );
}

function createChapterRepository(db: Db): ChapterRepository {
  return {
    getChapter: getChapter(db),
    updateChapter: updateChapter(db),
    createChapter: createChapter(db),
    getChapters: getChapters(db),
  };
}

export { createChapterRepository };
