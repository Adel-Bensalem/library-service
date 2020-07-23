import { Chapter } from "../../types";

function validateChapter(
  chapter: Chapter
): { isChapterBodyEmpty: boolean; isTitleInvalid: boolean } {
  return {
    isTitleInvalid: chapter.title.length === 0,
    isChapterBodyEmpty: chapter.body.length === 0,
  };
}

function isChapterInvalid(error: {
  isChapterBodyEmpty: boolean;
  isTitleInvalid: boolean;
}): boolean {
  return error.isChapterBodyEmpty || error.isTitleInvalid;
}

export { validateChapter, isChapterInvalid };
