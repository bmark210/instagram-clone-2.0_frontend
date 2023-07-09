import { FC, useEffect, useState } from "react";
import SuggestedProfile from "./suggestedProfile";
import { getSuggestionsIfJustLoggedIn } from "../../api/serveses/suggestions/getSuggestions";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";

interface Props {
  user?: any;
}
const Suggestions = ({ user }: Props) => {
  const [profiles, setProfiles] = useState([]);
  const userId = user ? user.userId : null;
  const following = user ? user.following : [];
  const [isOpen, setIsOpen] = useState(false);
  console.log("user", user.data);

  useEffect(() => {
    getSuggestionsIfJustLoggedIn().then((res) => {
      setProfiles(res);
    });
  }, []);
  console.log("profiles", profiles);

  const handleShowModal = () => {
    return isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div className="rounded flex flex-col w-80 mt-4">
      <div className="flex text-sm items-center justify-between">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="font-medium text-gray-500">Suggestions for you</p>
          <Link
            to="/explore/people"
            role="button"
            onClick={handleShowModal}
            className="text-black-dark font-medium text-xs"
          >
            See all
          </Link>
        </div>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.length === 0 || !profiles
          ? [...Array(5)].map((_, index) => (
              <ContentLoader key={index} className="w-80 h-8 flex mr-3">
                <circle cx="16" cy="16" r="16" />
                <rect x="50" y="3" rx="3" ry="3" width="70" height="7" />
                <rect x="50" y="20" rx="3" ry="3" width="100" height="6" />
                <rect x="275" y="9" rx="3" ry="3" width="45" height="13" />
              </ContentLoader>
            ))
          : profiles.map((user: any) => (
              <SuggestedProfile key={user._id} userId={user._id} />
            ))}
      </div>
    </div>
  );
};

export default Suggestions;

// {
//   postsIsLoading ? (
//     [...Array(5)].map((_, index) => (
//       <ContentLoader
//         key={index}
//         speed={2}
//         viewBox="0 0 220 160"
//         backgroundColor="#f3f3f3"
//         foregroundColor="#ecebeb"
//         className="w-3/5 mx-auto mb-12"
//       >
//         <rect x="27" y="7" rx="3" ry="3" width="55" height="10" />
//         <rect x="0" y="25" rx="3" ry="3" width="220" height="124" />
//         <circle cx="8" cy="12" r="8" />
//       </ContentLoader>
//     ))
//   ) : posts.items.length === 0 ? (
//     <h2 className="text-2xl text-center text-gray-400 mt-10">
//       Here will be your feed
//     </h2>
//   ) : (
//     posts.items.map((post: any) => (
//       <PostItem key={post._id} post={post} user={post.user} />
//     ))
//   );
// }
