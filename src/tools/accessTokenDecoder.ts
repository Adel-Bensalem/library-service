import jwt from "jsonwebtoken";
import { AccessTokenDecoder } from "../core/main";
import { Author, Identifable } from "../types";

function createAccessTokenDecoder(tokenSecret: string): AccessTokenDecoder {
  return {
    decodeAccessToken(accessToken: string): Promise<Identifable<Author>> {
      return new Promise<Identifable<Author>>((resolve, reject) => {
        try {
          resolve(jwt.verify(accessToken, tokenSecret) as Identifable<Author>);
        } catch (e) {
          reject();
        }
      });
    },
  };
}

export { createAccessTokenDecoder };
