import CameraImage from "../assets/camera.png";
import ContentLoader from "react-content-loader";

interface Props {
  posts: any;
  isCurrentUser: boolean | null;
}
const Publications = ({ posts, isCurrentUser }: Props) => {
  console.log(isCurrentUser);

  if (!posts)
    return (
      <div className="w-full flex justify-center mt-20">
        <ContentLoader
          viewBox="0 0 300 120"
          height={120}
          width={300}
          speed={2}
          backgroundColor="transparent"
        >
          <circle cx="75" cy="60" r="6" />
          <circle cx="117" cy="60" r="6" />
          <circle cx="159" cy="60" r="6" />
        </ContentLoader>
      </div>
    );
  return (
    <div className="min-w-max mx-auto">
      {posts.length ? (
        <div className="grid grid-cols-3 gap-1 mt-4 mb-12">
          {posts.map((post: any) => (
            <div className="w-[313px] h-[250px]" key={post.id}>
              <img
                src={post.image.downloadURL}
                className="min-w-full h-full object-cover"
                alt="image"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-96 mx-auto my-16 min-w-max">
          <img className="w-14 mx-auto my-3" src={CameraImage} alt="camera" />
          {isCurrentUser ? (
            <>
              <h2 className="font-extrabold text-3xl text-center my-2">
                Поделиться фото
              </h2>
              <p className="font-thin text-center w-96">
                Фото, которыми вы делитесь, будут показываться в вашем профиле.
              </p>
              <a className="block mt-4 hover:text-black-dark text-blue-medium font-medium text-center cursor-pointer">
                Поделитесь первым фото
              </a>
            </>
          ) : (
            <h2 className="font-extrabold text-3xl text-center my-2">
              No posts yet
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Publications;
