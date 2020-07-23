import { AccountCreationError, Author, Identifable } from "../../types";
import { AuthorRepository } from "../adapters/authorRepository";
import {
  doesArtistAccountHaveError,
  validateArtistAccount,
} from "../entities/authorAccountValidator";

type AccountCreationInteractor = (author: Author) => void;

interface AccountCreationPresenter {
  presentAccountCreationSuccess: (author: Identifable<Author>) => void;
  presentAccountCreationFailure: (error: AccountCreationError) => void;
}

function createAccountCreationInteractor(
  repository: AuthorRepository,
  presenter: AccountCreationPresenter
): AccountCreationInteractor {
  return (author) => {
    const error: AccountCreationError = validateArtistAccount(author);

    doesArtistAccountHaveError(error)
      ? presenter.presentAccountCreationFailure(error)
      : repository
          .createAccount(author)
          .then(presenter.presentAccountCreationSuccess)
          .catch(() =>
            presenter.presentAccountCreationFailure({
              ...error,
              hasUnExpectedError: true,
            })
          );
  };
}

export {
  createAccountCreationInteractor,
  AccountCreationInteractor,
  AccountCreationPresenter,
};
