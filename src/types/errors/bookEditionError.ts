type BookEditionError = {
  isTitleInvalid: boolean;
  isDescriptionInvalid: boolean;
  wasAuthorNotFound: boolean;
  isAuthorNotAuthorizedToEditBook: boolean;
  wasBookNotFound: boolean;
  hasUnExpectedError: boolean;
};

export { BookEditionError };
