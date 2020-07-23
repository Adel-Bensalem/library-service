import { Book, Chapter, Identifable } from "../../types";

interface ChapterRepository {
  getChapters(book: Identifable<Book>): Promise<Chapter[]>;
  getChapter(chapter: Chapter): Promise<Chapter | null>;
  createChapter(book: Identifable<Book>, chapter: Chapter): Promise<Chapter>;
  updateChapter(chapter: Chapter, nextChapter: Chapter): Promise<Chapter>;
}

export { ChapterRepository };
