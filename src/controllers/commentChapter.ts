import { Book, Chapter, Comment, Identifable } from "../types";
import { InteractorFactory } from "../core/types/interactorFactory";

type ChapterCommentController = (
  accessToken: unknown,
  chapter: unknown,
  comment: unknown
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
    book: extractBook(!!chapter ? chapter.book : chapter),
    body: !!chapter ? chapter.body : [],
    number: !!chapter ? chapter.number : 0,
    title: !!chapter ? chapter.title : "",
  };
}

function extractComment(comment: any): Comment {
  return {
    ...comment,
    body: !!comment ? comment.body : "",
  };
}

function createChapterCommentController(
  interactors: InteractorFactory
): ChapterCommentController {
  return (accessToken, chapter, comment) =>
    interactors.commentChapter({
      accessToken: extractAccessToken(accessToken),
      chapter: extractChapter(chapter),
      comment: extractComment(comment),
    });
}

export { createChapterCommentController, ChapterCommentController };
