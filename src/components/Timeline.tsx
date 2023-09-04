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
      <div className="mx-auto mt-8 px-3">
        {postsIsLoading ? (
          [...Array(5)].map((_, index) => (
            <ContentLoader
              key={index}
              speed={3}
              viewBox="0 0 220 300"
              backgroundColor="currentColor"
              foregroundColor="#ecebeb"
              className="mb-12 w-[458px] text-gray-70 dark:text-black-light dark:opacity-20"
            >
              <rect x="27" y="7" rx="3" ry="3" width="55" height="10" />
              <rect x="0" y="25" rx="3" ry="3" width="220" height="270" />
              <circle cx="8" cy="12" r="8" />
            </ContentLoader>
          ))
        ) : posts.items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center">
            <img src="src/assets/instagram-logo.png" className="w-16" alt="instagram_logo" />
            <h2 className="mt-8 text-center text-2xl dark:text-white">Here will be your feed</h2>
            <p className="mt-3 text-sm dark:text-white">Follow people to see their posts</p>
          </div>
        ) : (
          posts.items.map(post => <PostItem key={post._id} post={post} user={post.user} />)
        )}
      </div>
    </>
  );
};

export default Timeline;
