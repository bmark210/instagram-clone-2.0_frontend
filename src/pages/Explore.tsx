import { useEffect, useState } from "react";
import { getPopularPosts } from "../api/endpoints/posts";
import ContentLoader from "react-content-loader";
import { OnePost } from "../types/post/post";

const Explore = () => {
  const [posts, setPosts] = useState<OnePost[]>([]);

  useEffect(() => {
    getPopularPosts().then((res) => {
      setPosts(res);
    });
  }, []);

  return (
    <div className="min-w-max mx-auto">
      <div className="grid grid-cols-3 gap-1 mt-6 mb-12">
        {posts.length === 0
          ? [...Array(9)].map((_, index) => (
              <ContentLoader
                key={index}
                speed={2}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className="w-[313px] h-[250px]"
              >
                <rect width="100%" height="100%" />
              </ContentLoader>
            ))
          : posts.map((post: OnePost) => (
              <div className="w-[313px] h-[250px]" key={post._id}>
                <img
                  src={post.image.downloadURL}
                  className="min-w-full h-full object-cover"
                  alt="image"
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Explore;
