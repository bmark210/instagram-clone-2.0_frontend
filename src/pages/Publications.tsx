import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CameraImage from "../assets/camera.png";
import { OnePost } from "../interfaces/post";
import PostImage from "../components/publications/PostImage";
import { fetchPostsByUserUsername } from "../api/endpoints/posts";
import { useAppDispach, useAppSelector } from "../redux/hooks";
import { openModal } from "../redux/slices/modal";
import ContentLoader from "react-content-loader";

const Publications = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState<OnePost[] | null>(null);
  const currentUser = useAppSelector(state => state.auth.data);
  const isCurrentUser = currentUser?.username === username;
  const dispatch = useAppDispach();

  const handleOpenModal = (modalName: string) => {
    dispatch(openModal(modalName));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const data = await fetchPostsByUserUsername(username);
          setPosts(data);
        }
      } catch (error) {
        alert("Ошибка сервера");
        console.log(error);
      }
    };
    fetchData();
  }, [username]);

  return (
    <>
      <div className="mx-auto min-h-[220px] w-full min-w-max">
        {posts === null ? (
          <div className="mb-12 mt-6 grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, index) => (
              <ContentLoader
                key={index}
                speed={2}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className="h-[250px] w-[313px]"
              >
                <rect width="100%" height="100%" />
              </ContentLoader>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="mx-auto my-16 h-40 w-96 min-w-max">
            <img className="mx-auto my-3 w-14" src={CameraImage} alt="camera" />
            {isCurrentUser ? (
              <>
                <h2 className="my-2 text-center text-3xl font-extrabold">Share Photos</h2>
                <p className="w-96 text-center font-thin">
                  When you share photos, they will appear on your profile.
                </p>
                <a
                  onClick={() => handleOpenModal("createModal")}
                  className="mt-4 block cursor-pointer text-center font-medium text-blue-medium hover:text-black-dark"
                >
                  Share your first photo
                </a>
              </>
            ) : (
              <h2 className="my-2 text-center text-3xl font-extrabold">No posts yet</h2>
            )}
          </div>
        ) : (
          <div className="mb-12 mt-4 grid grid-cols-3 gap-1">
            {posts.map(post => (
              <PostImage key={post._id} post={post} currentUser={currentUser} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Publications;