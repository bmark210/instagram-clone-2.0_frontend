import { useState } from "react";
import { OnePost } from "../../interfaces/post";
import HeartWhiteIcon from "../common/icons/PostIcons/HeartWhiteIcon";
import CommentsWhiteIcon from "../common/icons/PostIcons/CommentsWhiteIcon";
import Modal from "../common/modals/Modal";
import PostModal from "../post/postModal";
import { OneUser } from "../../interfaces/user";
import { setPostLiked } from "../../api/serveses/likes/setLiked";

type Props = {
  post: OnePost;
  currentUser: OneUser | null;
};

const PostImage = ({ post, currentUser }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleLiked, setToggleLiked] = useState(false);
  const [likesLength, setLikesLength] = useState(post.likes?.length);
  const [isDisableLike, setIsDisableLike] = useState(false);

  async function handleToggleLiked(postId: string) {
    if (postId.length > 0 && !isDisableLike) {
      if (postId && currentUser) {
        try {
          setIsDisableLike(true);
          await setPostLiked(postId);
          setIsDisableLike(false);
          setToggleLiked(toggleLiked => !toggleLiked);
          setLikesLength(toggleLiked ? likesLength - 1 : likesLength + 1);
        } catch (error) {
          alert("Ошибка сервера");
          console.log(error);
        }
      }
    }
  }
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group relative min-h-[309px] min-w-[309px]"
        key={post._id}
      >
        <img
          src={post.image.downloadURL}
          className="max-h-[309px] min-h-[309px] min-w-full max-w-[309px] object-cover"
          alt="image"
        />
        <div className="absolute bottom-0 left-0 z-10 hidden h-full w-full items-center justify-evenly bg-black-faded group-hover:flex">
          <p className="flex items-center gap-2 font-bold text-white">
            <HeartWhiteIcon />
            {likesLength}
          </p>

          <p className="flex items-center gap-2 font-bold text-white">
            <CommentsWhiteIcon />
            {post.commentsLength}
          </p>
        </div>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          <PostModal
            handleToggleLiked={handleToggleLiked}
            currentUser={currentUser}
            toggleLiked={toggleLiked}
            likesLength={likesLength}
            setLikesLength={setLikesLength}
            setToggleLiked={setToggleLiked}
            post={post}
          />
        </Modal>
      )}
    </>
  );
};

export default PostImage;
