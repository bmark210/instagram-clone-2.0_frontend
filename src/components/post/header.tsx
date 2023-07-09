import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/avatars/default_avatar.jpg";
import React from "react";
import { getTimeDifference } from "../../utils/getTimeDifference";
interface Props {
  username: string;
  avatarUrl: string;
  place: string;
  createdAt: string;
}

const Header = ({ username, avatarUrl, createdAt, place }: Props) => {
  function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  }
  const dateOfCreation = getTimeDifference(createdAt);
  return (
    <div className="flex items-center pl-1 py-4">
      <div className="flex items-center">
        <Link to={`/${username}/`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={avatarUrl !== undefined ? `${avatarUrl}` : `${defaultAvatar}`}
            alt={`${username} profile picture`}
            onError={handleImageError}
          />
          <div className="flex flex-col col-span-3">
            <div className="flex flex-row items-center">
              <p className="font-medium text-sm">{username}</p>
              <span className="ml-2 text-sm text-gray-medium">
                • {dateOfCreation}
              </span>
            </div>
            {place && <p className="text-xs">{place}</p>}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
