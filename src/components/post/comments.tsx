import { useState } from "react";
import AddComment from "./AddComment";
import { Link } from "react-router-dom";
import { Comment, OnePost } from "../../types/post/post";
import { OneUser } from "../../types/user/user";

interface CommentsProps {
  post: OnePost;
  commentsLength: number;
  posted: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: OneUser;
  currentUser: OneUser | null;
}

const Comments = ({ post, commentsLength, setIsOpen, currentUser, user }: CommentsProps) => {
  const [commentItem, setCommentItem] = useState<Comment>({
    comment: "",
    user: currentUser,
  });

  const [commentsValue, setCommentsValue] = useState(commentsLength);
  return (
    <>
      <div className="pt-1">
        {commentItem.comment !== "" && (
          <p className="mb-1 ml-2">
            <Link to={`/${currentUser?.username}`}>
              <span className="mr-1 font-medium">{currentUser?.username}</span>
            </Link>
            <span className="w-[467px] break-words text-sm font-thin">{commentItem.comment}</span>
          </p>
        )}
      </div>
      <div className="pt-1">
        {commentsValue >= 1 && (
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="mb-1 ml-2 cursor-pointer text-sm text-gray-400 focus:outline-none"
            type="button"
          >
            View all {commentsValue} comments
          </button>
        )}
        <AddComment
          username={user?.username}
          postId={post._id}
          commentItem={commentItem}
          setCommentsValue={setCommentsValue}
          setCommentItem={setCommentItem}
        />
      </div>
    </>
  );
};

export default Comments;
