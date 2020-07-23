import { AccessTokenDecoder } from "../adapters/accessTokenDecoder";
import { AccessTokenGenerator } from "../adapters/accessTokenGenerator";
import { AuthorRepository } from "../adapters/authorRepository";
import { BookRepository } from "../adapters/bookRepository";
import { ChapterRepository } from "../adapters/chapterRepository";
import { CommentRepository } from "../adapters/commentRepository";

type AdaptersMap = {
  accessTokenDecoder: AccessTokenDecoder;
  accessTokenGenerator: AccessTokenGenerator;
  authorRepository: AuthorRepository;
  bookRepository: BookRepository;
  chapterRepository: ChapterRepository;
  commentRepository: CommentRepository;
};

export { AdaptersMap };
