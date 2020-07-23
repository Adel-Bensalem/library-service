type AccountAccessError = {
  didAccessTokenGenerationFailed: boolean;
  wasAccountNotFound: boolean;
  hasUnExpectedError: boolean;
};

export { AccountAccessError };
