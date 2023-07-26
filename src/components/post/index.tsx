import Header from "./Header";
import Image from "./Image";
import Comments from "./Comments";
import { useState } from "react";
import Actions from "./Actions";
import Footer from "./Footer";
import { OneUser } from "../../types/user";
import { OnePost } from "../../types/post";
import { useAppSelector } from "../../redux/hooks";
import Modal from "../common/modals/Modal";
import PostModal from "../postModal";

interface Props {
  post: OnePost;
  user: OneUser;
}

const PostItem = ({ post, user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [toggleLiked, setToggleLiked] = useState(false); /// I need to add this to modalPost- Actions also in just post Actions
  const [likesLength, setLikesLength] = useState(post.likes.length); // this one state I also need to add in those two components

  const currentUser = useAppSelector(state => state.auth.data);
  return (
    <div className="mx-auto mb-12 w-[468px] bg-white">
      <Header
        username={user.username}
        avatarUrl={user.avatar?.downloadURL}
        createdAt={post.createdAt}
        place={post.place}
      />
      <div className="flex items-center justify-center">
        <Image photoUrl={post.image.downloadURL} caption={post.caption} />
      </div>
      <Actions
        likesLength={likesLength}
        setLikesLength={setLikesLength}
        toggleLiked={toggleLiked}
        likesArray={post.likes}
        setToggleLiked={setToggleLiked}
        setIsOpen={setIsOpen}
        postId={post._id}
      />
      <Footer caption={post.caption} username={user.username} />
      <Comments
        user={user}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        post={post}
        commentsLength={post.commentsLength}
        posted={post.createdAt}
        currentUser={currentUser}
      />
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <PostModal
            likesLength={likesLength}
            setLikesLength={setLikesLength}
            toggleLiked={toggleLiked}
            setToggleLiked={setToggleLiked}
            currentUser={currentUser}
            post={post}
          />
        </Modal>
      )}
    </div>
  );
};

export default PostItem;
