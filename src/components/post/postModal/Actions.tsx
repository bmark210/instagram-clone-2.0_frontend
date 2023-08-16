import CommentsIcon from "../../common/icons/PostIcons/CommentsIcon";
import HeartIcon from "../../common/icons/PostIcons/HeartIcon";
import HeartActiveIcon from "../../common/icons/PostIcons/HeartActiveIcon";
import { RefObject } from "react";

interface Props {
  postId?: string;
  likesArray: string[];
  commentInput: RefObject<HTMLInputElement>;
  likesLength: number;
  setLikesLength: React.Dispatch<React.SetStateAction<number>>;
  setToggleLiked: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLiked: boolean;
  handleToggleLiked: (postId: string) => Promise<void>;
}

const Actions = ({ postId, commentInput, likesLength, toggleLiked, handleToggleLiked }: Props) => {
  return (
    <>
      <div className="flex justify-between pb-2 pl-1 pt-3">
        <div className="flex flex-row items-center gap-2">
          {
            <button onClick={() => handleToggleLiked(!postId ? "" : postId)} className="mr-1">
              {toggleLiked ? <HeartActiveIcon /> : <HeartIcon />}
            </button>
          }
          <button onClick={() => commentInput.current?.focus()}>
            <CommentsIcon />
          </button>
        </div>
      </div>
      <div className="ml-1">
        <p className="font-medium">
          {likesLength === 1 ? `${likesLength} like` : `${likesLength} likes`}
        </p>
      </div>
    </>
  );
};
export default Actions;
