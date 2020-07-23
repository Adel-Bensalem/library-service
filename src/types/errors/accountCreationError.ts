type AccountCreationError = {
  isFullNameInvalid: boolean;
  isEmailInvalid: boolean;
  isPasswordInvalid: boolean;
  hasUnExpectedError: boolean;
};

export { AccountCreationError };
