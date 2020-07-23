import { Comment } from "../../types";

function isCommentValid(comment: Comment): boolean {
  return comment.body.length > 0;
}

export { isCommentValid };
