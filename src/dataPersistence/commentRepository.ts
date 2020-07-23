import { Db } from "mongodb";
import { CommentRepository } from "../core/adapters/commentRepository";
import { Collections } from "./types/collections";
import { Chapter, Comment, Identifable } from "../types";

function createComment(db: Db) {
  return (chapter: Chapter, comment: Comment): Promise<Identifable<Comment>> =>
    db
      .collection(Collections.COMMENT)
      .insertOne({ ...comment, chapter })
      .then(({ insertedId }) => ({
        id: insertedId.toString(),
        ...comment,
        chapter,
      }));
}

function createCommentRepository(db: Db): CommentRepository {
  return {
    createComment: createComment(db),
  };
}

export { createCommentRepository };
