import { Book, Chapter, Identifable } from "../types";
import { InteractorFactory } from "../core/types/interactorFactory";

type ChapterAdditionController = (
  accessToken: unknown,
  book: unknown,
  chapter: unknown
) => void;

function extractAccessToken(accessToken: any): string {
  return accessToken || "";
}

function extractBook(book: any): Identifable<Book> {
  return {
    author: {
      id: !!book && !!book.author ? book.author.id || "" : "",
      fullName: !!book && !!book.author ? book.author.fullName || "" : "",
      email: !!book && book.author ? book.author.email || "" : "",
      password: !!book && book.author ? book.author.password || "" : "",
    },
    chapters: !!book ? book.chapter : [],
    description: !!book ? book.description : "",
    id: !!book ? book.id : "",
    title: !!book ? book.title : "",
  };
}

function extractChapter(chapter: any): Chapter {
  return {
    ...chapter,
    body: !!chapter ? chapter.body : [],
    number: !!chapter ? chapter.number : 0,
    title: !!chapter ? chapter.title : "",
  };
}

function createChapterAdditionController(
  interactors: InteractorFactory
): ChapterAdditionController {
  return (accessToken, book, chapter) =>
    interactors.addChapter({
      accessToken: extractAccessToken(accessToken),
      book: extractBook(book),
      chapter: extractChapter(chapter),
    });
}

export { createChapterAdditionController, ChapterAdditionController };
