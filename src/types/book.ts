import { Author } from "./author";
import { Chapter } from "./chapter";
import { Identifable } from "./utils";

type Book = {
  author: Identifable<Author>;
  title: string;
  description: string;
  chapters: Chapter[];
};

export { Book };
