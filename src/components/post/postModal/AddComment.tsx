import { RefObject, useState } from "react";
import { addComment } from "../../../api/serveses/comments/setComment";
import { Comment } from "../../../interfaces/post";

interface Props {
  postId: string;
  commentItem: Comment;
  setCommentItem: React.Dispatch<React.SetStateAction<Comment>>;
  commentInput: RefObject<HTMLInputElement>;
}

const AddComment = ({ postId, commentItem, setCommentItem, commentInput }: Props) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = async (
    event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (commentText.length === 0) return;

    if (commentItem) {
      await addComment(postId, commentText);
      setCommentItem({ ...commentItem, comment: commentText });
      setCommentText("");
    }
  };
  return (
    <div className="border-t border-gray-base">
      <form
        className="flex justify-between"
        method="POST"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmitComment(event)}
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="mx-3 w-full px-2 py-3 text-sm outline-none"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={commentText}
          onChange={({ target }) => setCommentText(target.value)}
          ref={commentInput}
          maxLength={200}
        />
        <button
          className={`mr-3 text-sm font-bold text-blue-primary ${!commentText && "opacity-25"}`}
          type="button"
          hidden={commentText.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};
export default AddComment;
