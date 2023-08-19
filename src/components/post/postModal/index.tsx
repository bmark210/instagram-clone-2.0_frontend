import { Comment, OnePost } from "../../../interfaces/post";
import { OneUser } from "../../../interfaces/user";
import { getTimeDifferenceInFullWords } from "../../../utils/getTimeDifference";
import Header from "../Header";
import { useState, useRef } from "react";
import AddComment from "./AddComment";
import Actions from "./Actions";
import Comments from "./Comments";
import Image from "./Image";

interface Props {
  post: OnePost;
  likesLength: number;
  setLikesLength: React.Dispatch<React.SetStateAction<number>>;
  toggleLiked: boolean;
  setToggleLiked: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: OneUser | null;
  handleToggleLiked: (postId: string) => Promise<void>;
}

const PostModal = ({
  post,
  currentUser,
  likesLength,
  setLikesLength,
  toggleLiked,
  setToggleLiked,
  handleToggleLiked,
}: Props) => {
  const commentInput = useRef<HTMLInputElement>(null);
  const [commentItem, setCommentItem] = useState<Comment>({
    comment: "",
    user: currentUser,
  });

  return (
    <div
      onClick={e => {
        e.stopPropagation();
      }}
      className="mx-20 flex w-4/6 flex-row rounded bg-white"
    >
      <Image image={post.image} />
      <div className="w-2/3">
        <div className="border-b border-gray-base">
          <div className="mx-3">
            <Header username={post.user?.username} avatarUrl={post.user?.avatar?.downloadURL} />
          </div>
        </div>
        <Comments post={post} commentItem={commentItem} />
        <Actions
          handleToggleLiked={handleToggleLiked}
          commentInput={commentInput}
          postId={post._id}
          likesArray={post.likes}
          likesLength={likesLength}
          setLikesLength={setLikesLength}
          toggleLiked={toggleLiked}
          setToggleLiked={setToggleLiked}
        />
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
