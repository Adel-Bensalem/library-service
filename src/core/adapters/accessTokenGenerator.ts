import { Author, Identifable } from "../../types";

interface AccessTokenGenerator {
  generateAccessToken(author: Identifable<Author>): Promise<string>;
}

export { AccessTokenGenerator };
