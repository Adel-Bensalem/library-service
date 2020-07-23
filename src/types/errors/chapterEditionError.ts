type ChapterEditionError = {
  isChapterInvalid: {
    isTitleInvalid: boolean;
    isChapterBodyEmpty: boolean;
  };
  wasAuthorNotFound: boolean;
  wasBookNotFound: boolean;
  wasChapterNotFound: boolean;
  isAuthorNotAuthorizedToEditBook: boolean;
  hasUnExpectedError: boolean;
};

export { ChapterEditionError };
