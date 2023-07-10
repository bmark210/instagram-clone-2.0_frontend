import Header from "./header";
import Image from "./image";
import Comments from "./comments";
import Actions from "./actions";
import Footer from "./Footer";
import { Post } from "../../types/post/post";
import { User } from "../../types/user/user";

interface Props {
  post: Post;
  user: User;
}

const PostItem = ({ post, user }: Props) => {
  console.log(post._id);
  console.log(user);

  return (
    <div className="w-[468px] mx-auto bg-white mb-12">
      <Header
        username={user.username}
        avatarUrl={user.avatar.downloadURL}
        createdAt={post.createdAt}
        place={post.place}
      />
      <div className="flex items-center justify-center">
        <Image photoUrl={post.image.downloadURL} caption={post.text} />
      </div>
      <Actions likesArray={post.likes} postId={post._id} />
      <Footer caption={post.text} username={user.username} />
      {/* <Comments
        docId={post.postId}
        allComments={post.comments}
        posted={post.dateCreated}
        commentInput={commentInput}
      /> */}
    </div>
  );
};

export default PostItem;
