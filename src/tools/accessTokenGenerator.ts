import jwt from "jsonwebtoken";
import { AccessTokenGenerator } from "../core/main";
import { Author, Identifable } from "../types";

function createAccessTokenGenerator(tokenSecret: string): AccessTokenGenerator {
  return {
    generateAccessToken(author: Identifable<Author>): Promise<string> {
      return new Promise<string>((resolve, reject) => {
        try {
          resolve(jwt.sign(author, tokenSecret));
        } catch (e) {
          reject();
        }
      });
    },
  };
}

export { createAccessTokenGenerator };
