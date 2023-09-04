import CommentsIcon from "../common/icons/PostIcons/CommentsIcon";
import HeartIcon from "../common/icons/PostIcons/HeartIcon";
import HeartActiveIcon from "../common/icons/PostIcons/HeartActiveIcon";

interface Props {
  postId?: string;
  likesArray: string[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  likesLength: number;
  toggleLiked: boolean;
  setLikesLength: React.Dispatch<React.SetStateAction<number>>;
  handleToggleLiked: (postId: string) => Promise<void>;
}

const Actions = ({ postId, setIsOpen, toggleLiked, likesLength, handleToggleLiked }: Props) => {
  return (
    <>
      <div className="flex justify-between py-4 pl-1">
        <div className="flex flex-row items-center">
          {
            <button onClick={() => handleToggleLiked(!postId ? "" : postId)} className="mr-1">
              {toggleLiked ? <HeartActiveIcon /> : <HeartIcon />}
            </button>
          }
          <button onClick={() => setIsOpen(true)}>
            <CommentsIcon />
          </button>
        </div>
      </div>
      <div className="py-0 pl-2">
        <p className="font-medium dark:text-white">
          {likesLength === 1 ? `${likesLength} like` : `${likesLength} likes`}
        </p>
      </div>
    </>
  );
};
export default Actions;
