import { Author, Identifable } from "../../types";

interface AuthorRepository {
  createAccount(author: Author): Promise<Identifable<Author>>;
  getAccount(credentials: {
    email: string;
    password: string;
  }): Promise<Identifable<Author> | null>;
}

export { AuthorRepository };
