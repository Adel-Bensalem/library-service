import { Chapter, Comment, Identifable } from "../../types";

interface CommentRepository {
  createComment(
    chapter: Chapter,
    comment: Comment
  ): Promise<Identifable<Comment>>;
}

export { CommentRepository };
