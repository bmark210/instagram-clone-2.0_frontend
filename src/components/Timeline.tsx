import ContentLoader from "react-content-loader";
import { Posts } from "../interfaces/post";
import PostItem from "./post";

interface Props {
  posts: Posts;
}
const Timeline = ({ posts }: Props) => {
  const postsIsLoading = posts.status === "loading";

  return (
    <>
      <div className="col-span-2 mt-8 w-2/3 px-16">
        {postsIsLoading ? (
          [...Array(5)].map((_, index) => (
            <ContentLoader
              key={index}
              speed={2}
              viewBox="0 0 220 300"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              className="mx-auto mb-12 w-2/3"
            >
              <rect x="27" y="7" rx="3" ry="3" width="55" height="10" />
              <rect x="0" y="25" rx="3" ry="3" width="220" height="270" />
              <circle cx="8" cy="12" r="8" />
            </ContentLoader>
          ))
        ) : posts.items.length === 0 ? (
          <h2 className="mt-10 text-center text-2xl text-gray-400">Here will be your feed</h2>
        ) : (
          posts.items.map(post => <PostItem key={post._id} post={post} user={post.user} />)
        )}
      </div>
    </>
  );
};

export default Timeline;
