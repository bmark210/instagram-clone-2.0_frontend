import { useState } from "react";
import { OnePost } from "../../types/post/post";
import HeartWhiteIcon from "../common/icons/PostIcons/HeartWhiteIcon";
import CommentsWhiteIcon from "../common/icons/PostIcons/CommentsWhiteIcon";
import Modal from "../common/modals/Modal";
import PostModal from "../postModal";
import { OneUser } from "../../types/user/user";

type Props = {
  post: OnePost;
  currentUser?: OneUser | null;
};

const PostImage = ({ post, currentUser }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleLiked, setToggleLiked] = useState(false);
  const [likesLength, setLikesLength] = useState(post.likes?.length);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group relative min-h-[250px] min-w-[313px]"
        key={post._id}
      >
        <img
          src={post.image.downloadURL}
          className="max-h-[250px] min-h-[250px] min-w-full max-w-[313px] object-cover"
          alt="image"
        />
        <div className="absolute bottom-0 left-0 z-10 hidden h-full w-full items-center justify-evenly bg-black-faded group-hover:flex">
          <p className="flex items-center gap-2 font-bold text-white">
            <HeartWhiteIcon />
            {post.likes?.length}
          </p>

          <p className="flex items-center gap-2 font-bold text-white">
            <CommentsWhiteIcon />
            {post.commentsLength}
          </p>
        </div>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <PostModal
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
