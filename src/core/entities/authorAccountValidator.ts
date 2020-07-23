import { AccountCreationError, Author } from "../../types";

function validateArtistAccount(account: Author): AccountCreationError {
  return {
    isEmailInvalid: account.email.length === 0,
    isFullNameInvalid: account.fullName.length === 0,
    isPasswordInvalid: account.password.length === 0,
    hasUnExpectedError: false,
  };
}

function doesArtistAccountHaveError(
  accountCreationError: AccountCreationError
): boolean {
  return (
    accountCreationError.isEmailInvalid ||
    accountCreationError.isFullNameInvalid ||
    accountCreationError.isPasswordInvalid ||
    accountCreationError.hasUnExpectedError
  );
}

export { validateArtistAccount, doesArtistAccountHaveError };
