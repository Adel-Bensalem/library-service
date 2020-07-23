import { Chapter } from "../types";
import { InteractorFactory } from "../core/types/interactorFactory";

type ChapterEditionController = (
  accessToken: unknown,
  book: unknown,
  nextChapter: unknown
) => void;

function extractAccessToken(accessToken: any): string {
  return accessToken || "";
}

function extractChapter(chapter: any): Chapter {
  return {
    ...chapter,
    body: !!chapter ? chapter.body : [],
    number: !!chapter ? chapter.number : 0,
    title: !!chapter ? chapter.title : "",
  };
}

function createChapterEditionController(
  interactors: InteractorFactory
): ChapterEditionController {
  return (accessToken, chapter, nextChapter) =>
    interactors.editChapter({
      accessToken: extractAccessToken(accessToken),
      chapter: extractChapter(chapter),
      nextChapter: extractChapter(nextChapter),
    });
}

export { createChapterEditionController, ChapterEditionController };
