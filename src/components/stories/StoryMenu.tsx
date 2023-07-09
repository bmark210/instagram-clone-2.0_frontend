import StoryItem from "./StoryItem";
import ContentLoader from "react-content-loader";
import { useState } from "react";
import { useEffect } from "react";
import { fetchStories } from "../../api/endpoints/users";

const StoryMenu = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // fetchStories().then((stories) => setStories(stories));
    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  if (isLoading) {
    return (
      <div className="flex flex-row justify-center">
        <ContentLoader
          width={704}
          height={100}
          className="min-w-fit flex flex-row justify-center"
          viewBox="0 0 704 100"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <circle cx="40" cy="34" r="33" />
          <rect x="10" y="75" rx="5" ry="5" width="64" height="15" />

          <circle cx="130" cy="34" r="33" />
          <rect x="100" y="75" rx="5" ry="5" width="64" height="15" />

          <circle cx="220" cy="34" r="33" />
          <rect x="190" y="75" rx="5" ry="5" width="64" height="15" />

          <circle cx="310" cy="34" r="33" />
          <rect x="280" y="75" rx="5" ry="5" width="64" height="15" />

          <circle cx="400" cy="34" r="33" />
          <rect x="370" y="75" rx="5" ry="5" width="64" height="15" />

          <circle cx="490" cy="34" r="33" />
          <rect x="460" y="75" rx="5" ry="5" width="64" height="15" />

          <circle cx="580" cy="34" r="33" />
          <rect x="550" y="75" rx="5" ry="5" width="64" height="15" />

          <circle cx="670" cy="34" r="33" />
          <rect x="640" y="75" rx="5" ry="5" width="64" height="15" />

          <circle cx="760" cy="34" r="33" />
          <rect x="730" y="75" rx="5" ry="5" width="64" height="15" />
        </ContentLoader>
      </div>
    );
  }
  // return (
  //   <div className="flex flex-row justify-center mb-5">
  //     {users.map((user: any) => (
  //       <StoryItem
  //         key={user.id}
  //         avatarUrl={user.avatarUrl}
  //         username={user.username}
  //       />
  //     ))}
  //   </div>
  // );
};

export default StoryMenu;
