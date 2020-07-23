type ChapterAdditionError = {
  isChapterInvalid: {
    isTitleInvalid: boolean;
    isChapterBodyEmpty: boolean;
  };
  wasAuthorNotFound: boolean;
  wasBookNotFound: boolean;
  isAuthorNotAuthorizedToEditBook: boolean;
  hasUnExpectedError: boolean;
};

export { ChapterAdditionError };
