type BookCreationError = {
  isTitleInvalid: boolean;
  isDescriptionInvalid: boolean;
  wasAccountNotFound: boolean;
  hasUnExpectedError: boolean;
};

export { BookCreationError };
