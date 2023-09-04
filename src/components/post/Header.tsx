import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/avatars/default_avatar.jpg";
import React from "react";
import { getTimeDifferenceInShortWords } from "../../utils/getTimeDifference";

interface Props {
  username: string;
  avatarUrl?: string;
  place?: string;
  createdAt?: string;
}

const Header = ({ username, avatarUrl, createdAt, place }: Props) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  };

  return (
    <div className="flex items-center py-4 pl-2 dark:text-white">
      <div className="flex items-center">
        <Link to={`/${username}/`} className="flex items-center">
          <img
            className="mr-3 flex h-8 w-8 rounded-full object-cover"
            src={avatarUrl || defaultAvatar}
            alt={`${username} profile picture`}
            onError={handleImageError}
          />
          <div className="col-span-3 flex flex-col">
            <div className="flex flex-row items-center">
              <h3 className="text-sm font-medium">{username}</h3>
              {createdAt && (
                <span className="ml-2 text-sm text-gray-medium">
                  • {getTimeDifferenceInShortWords(createdAt)}
                </span>
              )}
            </div>
            {place && <p className="text-xs">{place}</p>}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
