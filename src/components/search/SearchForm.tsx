import { getUsersByQuery } from "../../api/serveses/search/search";
import { useEffect, useState } from "react";
import { OneUser } from "../../interfaces/user";
import SearchModalItem from "./SearchModalItem";
import CircleLoader from "../common/loaders/circleLoader/CircleLoader";

interface Props {
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchModalOpen: boolean;
}

const SearchModal = ({ setIsSearchModalOpen, isSearchModalOpen }: Props) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<OneUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleHideSearchModal = () => {
    setIsSearchModalOpen(false);
    setUsers([]);
  };

  useEffect(() => {
    const fetchUsersForSearch = async () => {
      if (!query) return;
      try {
        setIsLoading(true);
        await getUsersByQuery(query).then(res => {
          setUsers(res);
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        alert("Ошибка сервера");
        setQuery("");
      }
    };
    fetchUsersForSearch();
  }, [query]);

  return (
    <div
      className={`absolute bottom-0 left-[69px] right-0 top-0 h-full ${
        isSearchModalOpen ? "animate-showRight" : ""
      } `}
      onClick={handleHideSearchModal}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="fixed top-0 z-30 h-screen w-96 overflow-y-auto rounded-r-2xl bg-white shadow-right"
      >
        <div className="flex-column h-32 w-full border-b border-gray-base px-5">
          <div className="my-2 w-full">
            <h2 className="mb-8 mt-6 text-2xl font-medium">Search</h2>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full rounded-lg border-gray-base bg-gray-100 px-3 py-2 outline-none placeholder:font-thin"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="my-2 w-full px-6">
          <h4 className="font-medium">Resent</h4>
          {users === null ? (
            <p></p>
          ) : isLoading && users.length === 0 ? (
            <div className="mt-32 flex h-full justify-center">
              <CircleLoader color="gray-400" />
            </div>
          ) : users.length === 0 ? (
            <p className="mt-36 flex h-full justify-center text-sm text-gray-500">
              No users found.
            </p>
          ) : (
            users.map(user => (
              <SearchModalItem
                handleHideSearchModal={handleHideSearchModal}
                user={user}
                key={user._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
