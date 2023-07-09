import { useState } from "react";
import ContentLoader from "react-content-loader";
import StoryMenu from "./stories/StoryMenu";
import { Posts, OnePost } from "../types/posts/post";
import PostItem from "./post";

interface Props {
  posts: Posts;
}
const Timeline = ({ posts }: Props) => {


  const postsIsLoading = posts.status === "loading";
  // const usersIsLoading = users.status === "loading";
  console.log("timeline, posts", posts);

  return (
    <>
      <div className="w-2/3 col-span-2 min-w-max">
        <div className="min-w-max p-4 mt-8">
          <StoryMenu />
        </div>
        {postsIsLoading ? (
          [...Array(5)].map((_, index) => (
            <ContentLoader
              key={index}
              speed={2}
              viewBox="0 0 220 300"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              className="w-3/5 mx-auto mb-12"
            >
              <rect x="27" y="7" rx="3" ry="3" width="55" height="10" />
              <rect x="0" y="25" rx="3" ry="3" width="220" height="270" />
              <circle cx="8" cy="12" r="8" />
            </ContentLoader>
          ))
        ) : posts.items.length === 0 ? (
          <h2 className="text-2xl text-center text-gray-400 mt-10">
            Here will be your feed
          </h2>
        ) : (
          posts.items.map((post: OnePost) => (
            <PostItem key={post._id} post={post} user={post.user} />
          ))
        )}
      </div>
    </>
  );
};

export default Timeline;
