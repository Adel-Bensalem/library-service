import { InteractorFactory } from "../core/types/interactorFactory";

type AccountAccessController = (credentials: unknown) => void;

function extractCredentials(
  requestData: any
): { email: string; password: string } {
  return {
    email: !!requestData ? requestData.email || "" : "",
    password: !!requestData ? requestData.password || "" : "",
  };
}

function createAccountAccessController(
  interactors: InteractorFactory
): AccountAccessController {
  return (credentials) => {
    interactors.accessAccount(extractCredentials(credentials));
  };
}

export { createAccountAccessController, AccountAccessController };
