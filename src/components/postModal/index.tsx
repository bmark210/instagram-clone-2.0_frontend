import { Comment, OnePost } from "../../types/post/post";
import { OneUser } from "../../types/user/user";
import { getTimeDifferenceInFullWords } from "../../utils/getTimeDifference";
import Header from "../post/Header";
import PostModalCommentItem from "./PostModalCommentItem";
import { useEffect, useState, useRef } from "react";
import { getComments } from "../../api/serveses/comments/setComment";
import CircleLoader from "../common/loaders/circleLoader/CircleLoader";
import AddComment from "./AddComment";
import Actions from "./Actions";

interface Props {
  post: OnePost;
  likesLength: number;
  setLikesLength: React.Dispatch<React.SetStateAction<number>>;
  toggleLiked: boolean;
  setToggleLiked: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: OneUser | null;
}

const PostModal = ({
  post,
  currentUser,
  likesLength,
  setLikesLength,
  toggleLiked,
  setToggleLiked,
}: Props) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const commentInput = useRef<HTMLInputElement>(null);
  const [commentItem, setCommentItem] = useState<Comment>({
    comment: "",
    user: currentUser,
  });

  useEffect(() => {
    getComments(post._id)
      .then(comments => {
        setComments(comments);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div
      onClick={e => {
        e.stopPropagation();
      }}
      className="mx-20 flex h-[665px] max-w-[1140px] flex-row rounded bg-white "
    >
      <div className="">
        <img className="h-[665px] object-cover" src={post.image.downloadURL} />
      </div>
      <div className="min-w-[500px]">
        <div className="border-b border-gray-base">
          <div className="mx-3">
            <Header username={post.user?.username} avatarUrl={post.user?.avatar?.downloadURL} />
          </div>
        </div>

        <div className="h-[455px] overflow-y-auto border-b border-gray-base">
          {post.caption && (
            <PostModalCommentItem
              avatar={post.user.avatar?.downloadURL}
              username={post.user.username}
              text={post.caption}
            />
          )}
          {comments === null ? (
            <div className="mt-5 flex justify-center">
              <CircleLoader />
            </div>
          ) : comments.length === 0 && post.caption === "" ? (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <p className="mb-3 text-2xl font-bold">No comments yet.</p>
              <span className="text-sm">Start the conversation.</span>
            </div>
          ) : (
            comments.map((item, index) => (
              <PostModalCommentItem
                key={index}
                avatar={item.user.avatar?.downloadURL}
                username={item.user.username}
                text={item.comment}
              />
            ))
          )}
          {commentItem.comment !== "" && (
            <PostModalCommentItem
              text={commentItem.comment}
              avatar={commentItem.user?.avatar?.downloadURL}
              username={commentItem.user.username}
            />
          )}
        </div>
        <div className="mx-3 w-full">
          <Actions
            commentInput={commentInput}
            postId={post._id}
            likesArray={post.likes}
            likesLength={likesLength}
            setLikesLength={setLikesLength}
            toggleLiked={toggleLiked}
            setToggleLiked={setToggleLiked}
          />
        </div>
        <p className="my-2 ml-3 text-xs uppercase text-gray-400">
          {getTimeDifferenceInFullWords(post.createdAt)} ago
        </p>
        <AddComment
          commentInput={commentInput}
          postId={post._id}
          setCommentItem={setCommentItem}
          commentItem={commentItem}
        />
      </div>
    </div>
  );
};
export default PostModal;
