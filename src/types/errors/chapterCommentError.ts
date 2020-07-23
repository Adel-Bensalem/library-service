type ChapterCommentError = {
  isCommentBodyEmpty: boolean;
  wasCommentAuthorNotFound: boolean;
  wasChapterNotFound: boolean;
  hasUnExpectedError: boolean;
};

export { ChapterCommentError };
