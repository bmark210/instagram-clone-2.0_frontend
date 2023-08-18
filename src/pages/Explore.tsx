import { useEffect, useState } from "react";
import { getPopularPosts } from "../api/endpoints/posts";
import ContentLoader from "react-content-loader";
import { OnePost } from "../interfaces/post";
import PostImage from "../components/publications/PostImage";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const Explore = () => {
  const currentUser = useAppSelector((state: RootState) => state.auth.data);
  const [posts, setPosts] = useState<OnePost[]>([]);

  useEffect(() => {
    const popularPosts = async () => {
      try {
        const data = await getPopularPosts();
        setPosts(data);
      } catch (error) {
        alert("Ошибка сервера");
        console.error(error);
      }
    };
    popularPosts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto min-w-max">
      <div className="mb-12 mt-6 grid grid-cols-3 gap-1">
        {posts.length === 0
          ? [...Array(9)].map((_, index) => (
              <ContentLoader
                key={index}
                speed={2}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className="max-h-[309px] min-h-[309px] min-w-[263px]"
              >
                <rect width="100%" height="100%" />
              </ContentLoader>
            ))
          : posts.map((post: OnePost) => (
              <PostImage key={post._id} currentUser={currentUser} post={post} />
            ))}
      </div>
    </div>
  );
};

export default Explore;
