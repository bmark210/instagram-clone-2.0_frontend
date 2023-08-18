import { Comment, OnePost } from "../../../interfaces/post";
import { useState, useEffect } from "react";
import CircleLoader from "../../common/loaders/circleLoader/CircleLoader";
import PostModalCommentItem from "./PostModalCommentItem";
import { getComments } from "../../../api/serveses/comments/setComment";

type Props = {
  post: OnePost;
  commentItem: Comment;
};
const Comments = ({ post, commentItem }: Props) => {
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    getComments(post._id)
      .then(comments => {
        setComments(comments);
      })
      .catch(error => {
        console.log(error);
      });
  }, [post._id]);
  return (
    <div className="h-96 overflow-y-auto border-b border-gray-base">
      {post.caption && (
        <PostModalCommentItem
          avatar={post.user.avatar?.downloadURL}
          username={post.user.username}
          text={post.caption}
        />
      )}
      {comments === null ? (
        <div className="mt-5 flex justify-center">
          <CircleLoader color="gray-400" />
        </div>
      ) : comments.length === 0 && post.caption === "" && !commentItem.comment ? (
        <div className="flex w-full mt-40 flex-col items-center justify-center">
          <p className="mb-3 text-2xl font-bold">No comments yet.</p>
          <span className="text-sm">Start the conversation.</span>
        </div>
      ) : (
        comments.map((item, index) => (
          <PostModalCommentItem
            key={index}
            avatar={item.user?.avatar?.downloadURL}
            username={item.user?.username}
            text={item.comment}
          />
        ))
      )}
      {commentItem.comment !== "" && (
        <PostModalCommentItem
          text={commentItem.comment}
          avatar={commentItem.user?.avatar?.downloadURL}
          username={commentItem.user?.username}
        />
      )}
    </div>
  );
};

export default Comments;
