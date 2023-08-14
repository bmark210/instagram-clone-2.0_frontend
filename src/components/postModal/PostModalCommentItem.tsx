import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/avatars/default_avatar.jpg";

type Props = {
  avatar?: string;
  username?: string;
  text: string;
};

const PostModalCommentItem = ({ avatar, username, text }: Props) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  };

  return (
    <div className="py-3 pl-2">
      <div className="flex px-3">
        <Link className="" to={"/" + username}>
          <img
            className="my-1 mr-3 h-8 w-8 rounded-full"
            src={avatar !== undefined ? `${avatar}` : `${defaultAvatar}`}
            alt={`${username} profile picture`}
            onError={handleImageError}
          />
        </Link>

        <div className="inline-block w-96">
          <span className="text-sm font-medium">{username}</span>
          <span className="w-96 break-words px-2">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default PostModalCommentItem;
