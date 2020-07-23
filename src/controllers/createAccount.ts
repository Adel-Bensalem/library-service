import { Author } from "../types";
import { InteractorFactory } from "../core/types/interactorFactory";

type AccountCreationController = (author: unknown) => void;

function extractAuthor(requestData: any): Author {
  return {
    fullName: !!requestData ? requestData.fullName || "" : "",
    email: !!requestData ? requestData.email || "" : "",
    password: !!requestData ? requestData.password || "" : "",
  };
}

function createAccountCreationController(
  interactors: InteractorFactory
): AccountCreationController {
  return (author) => interactors.createAccount(extractAuthor(author));
}

export { createAccountCreationController, AccountCreationController };
