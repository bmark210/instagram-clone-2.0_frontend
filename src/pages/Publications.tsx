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
      <div className="mx-auto">
        {posts === null ? (
          <div className="mb-12 mt-6 grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, index) => (
              <ContentLoader
                key={index}
                speed={2}
                foregroundColor="#ecebeb"
                backgroundColor="currentColor"
                className="min-h-[309px] min-w-[309px] text-gray-70 dark:text-black-light dark:opacity-20"
              >
                <rect width="100%" height="100%" />
              </ContentLoader>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="mx-auto my-16 h-40 w-[934px]">
            <img className="bg-camera mx-auto my-3 w-14" src={CameraImage} alt="camera" />
            {isCurrentUser ? (
              <>
                <h2 className="my-2 text-center text-3xl font-extrabold dark:text-white">
                  Share Photos
                </h2>
                <p className="mx-auto w-96 font-thin dark:text-white">
                  When you share photos, they will appear on your profile.
                </p>
                <a
                  onClick={() => handleOpenModal("createModal")}
                  className="mt-4 block cursor-pointer text-center font-medium text-blue-bright hover:text-black-dark dark:hover:text-white"
                >
                  Share your first photo
                </a>
              </>
            ) : (
              <h2 className="my-2 text-center text-3xl font-extrabold dark:text-white">
                No posts yet
              </h2>
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
