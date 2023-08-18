import Header from "./Header";
import Image from "./Image";
import Comments from "./Comments";
import { useState, useEffect } from "react";
import Actions from "./Actions";
import Footer from "./Footer";
import { OneUser } from "../../interfaces/user";
import { OnePost } from "../../interfaces/post";
import { useAppSelector } from "../../redux/hooks";
import Modal from "../common/modals/Modal";
import PostModal from "./postModal";
import { setPostLiked } from "../../api/serveses/likes/setLiked";

interface Props {
  post: OnePost;
  user: OneUser;
}

const PostItem = ({ post, user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [toggleLiked, setToggleLiked] = useState(false); /// I need to add this to modalPost- Actions also in just post Actions
  const [likesLength, setLikesLength] = useState(post.likes.length);  this one state I also need to add in those two components
  const [isDisableLike, setIsDisableLike] = useState(false);
  const currentUser = useAppSelector(state => state.auth.data);

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
          console.log(error);
        }
      }
    }
  }

  useEffect(() => {
    if (currentUser && post.likes.includes(currentUser._id)) {
      setToggleLiked(true);
    }
  }, [currentUser, post.likes, setToggleLiked]);

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
        handleToggleLiked={handleToggleLiked}
        likesLength={likesLength}
        setLikesLength={setLikesLength}
        toggleLiked={toggleLiked}
        likesArray={post.likes}
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
            setToggleLiked={setToggleLiked}
            likesLength={likesLength}
            setLikesLength={setLikesLength}
            toggleLiked={toggleLiked}
            handleToggleLiked={handleToggleLiked}
            currentUser={currentUser}
            post={post}
          />
        </Modal>
      )}
    </div>
  );
};

export default PostItem;
