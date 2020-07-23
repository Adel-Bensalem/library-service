import { ChapterNode } from "./chapterNode";
import { Book } from "./book";
import { Identifable } from "./utils";

type Chapter = {
  book: Identifable<Book>;
  title: string;
  number: number;
  body: ChapterNode[];
};

export { Chapter };
