import { Author, Identifable } from "../../types";

interface AccessTokenDecoder {
  decodeAccessToken(accessToken: string): Promise<Identifable<Author>>;
}

export { AccessTokenDecoder };
