import { AccountAccessError, Author, Identifable } from "../../types";
import { AuthorRepository } from "../adapters/authorRepository";
import { AccessTokenGenerator } from "../adapters/accessTokenGenerator";

type AccountAccessInteractor = (credentials: {
  email: string;
  password: string;
}) => void;

interface AccountAccessPresenter {
  presentAccountAccessSuccess: (
    author: Identifable<Author>,
    accessToken: string
  ) => void;
  presentAccountAccessFailure: (error: AccountAccessError) => void;
}

function createAccessAccountInteractor(
  repository: AuthorRepository,
  tokenGenerator: AccessTokenGenerator,
  presenter: AccountAccessPresenter
): AccountAccessInteractor {
  return (credentials) =>
    repository
      .getAccount(credentials)
      .then((author) =>
        author
          ? tokenGenerator
              .generateAccessToken(author)
              .then((accessToken) =>
                presenter.presentAccountAccessSuccess(author, accessToken)
              )
              .catch(() =>
                presenter.presentAccountAccessFailure({
                  didAccessTokenGenerationFailed: true,
                  wasAccountNotFound: false,
                  hasUnExpectedError: false,
                })
              )
          : presenter.presentAccountAccessFailure({
              wasAccountNotFound: true,
              hasUnExpectedError: false,
              didAccessTokenGenerationFailed: false,
            })
      )
      .catch(() =>
        presenter.presentAccountAccessFailure({
          hasUnExpectedError: true,
          wasAccountNotFound: false,
          didAccessTokenGenerationFailed: false,
        })
      );
}

export {
  createAccessAccountInteractor,
  AccountAccessInteractor,
  AccountAccessPresenter,
};
