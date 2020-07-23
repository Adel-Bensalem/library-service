import { Db } from "mongodb";
import { AuthorRepository } from "../core/adapters/authorRepository";
import { Author, Identifable } from "../types";
import { Collections } from "./types/collections";

function createAccount(db: Db) {
  return (author: Author): Promise<Identifable<Author>> =>
    db
      .collection(Collections.AUTHOR)
      .insertOne(author)
      .then(({ insertedId }) => ({
        id: insertedId.toString(),
        ...author,
      }));
}

function getAccount(db: Db) {
  return ({ email, password }: { email: string; password: string }) =>
    db
      .collection(Collections.AUTHOR)
      .findOne({
        $and: [{ email: { $eq: email } }, { password: { $eq: password } }],
      })
      .then((document) =>
        !!document ? { ...document, id: document._id } : null
      );
}

function createAuthorRepository(db: Db): AuthorRepository {
  return {
    createAccount: createAccount(db),
    getAccount: getAccount(db),
  };
}

export { createAuthorRepository };
