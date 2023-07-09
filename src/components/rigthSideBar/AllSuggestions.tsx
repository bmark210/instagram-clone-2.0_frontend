import { useEffect, useState } from "react";
import SuggestedProfile from "./suggestedProfile";
import { getAllSuggestions } from "../../api/serveses/suggestions/getSuggestions";
import ContentLoader from "react-content-loader";
import Footer from "./Footer";

const AllSuggestions = () => {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    getAllSuggestions().then((res) => {
      setProfiles(res);
    });
  }, []);

  return (
    <>
      <div className="h-full w-1/3 mx-auto mt-20 grid gap-5">
        <h2 className="font-medium">Suggested</h2>
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
        <Footer />
      </div>
    </>
  );
};
export default AllSuggestions;
