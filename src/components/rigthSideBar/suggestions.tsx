import { useEffect, useState } from "react";
import { getAllSuggestions } from "../../api/serveses/suggestions/getSuggestions";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { OneUser } from "../../types/user/user";
import SuggestedProfile from "../rigthSideBar/SuggestedProfile";

const Suggestions = () => {
  const [profiles, setProfiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getAllSuggestions().then(res => {
      setProfiles(res);
    });
  }, []);

  const handleShowModal = () => {
    return isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div className="mt-4 flex w-80 flex-col rounded">
      <div className="flex items-center justify-between text-sm">
        <div className="flex w-full flex-row items-center justify-between">
          <p className="font-medium text-gray-500">Suggestions for you</p>
          <Link
            to="/explore/people"
            role="button"
            onClick={handleShowModal}
            className="text-xs font-medium text-black-dark"
          >
            See all
          </Link>
        </div>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.length === 0 || !profiles
          ? [...Array(5)].map((_, index) => (
              <ContentLoader key={index} className="mr-3 flex h-8 w-80">
                <circle cx="16" cy="16" r="16" />
                <rect x="50" y="3" rx="3" ry="3" width="70" height="7" />
                <rect x="50" y="20" rx="3" ry="3" width="100" height="6" />
                <rect x="275" y="9" rx="3" ry="3" width="45" height="13" />
              </ContentLoader>
            ))
          : profiles.map((user: OneUser) => <SuggestedProfile key={user._id} userId={user._id} />)}
      </div>
    </div>
  );
};

export default Suggestions;
