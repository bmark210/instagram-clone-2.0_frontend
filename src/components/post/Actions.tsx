import CommentsIcon from "../common/icons/PostIcons/CommentsIcon";
import HeartIcon from "../common/icons/PostIcons/HeartIcon";
import HeartActiveIcon from "../common/icons/PostIcons/HeartActiveIcon";
import { useEffect, useState } from "react";
import { setPostLiked } from "../../api/serveses/likes/setLiked";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  postId?: string;
  likesArray: string[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  likesLength: number;
  setToggleLiked: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLiked: boolean;
  setLikesLength: React.Dispatch<React.SetStateAction<number>>;
}

const Actions = ({
  postId,
  likesArray,
  setIsOpen,
  setToggleLiked,
  toggleLiked,
  likesLength,
  setLikesLength,
}: Props) => {
  const [isDisableLike, setIsDisableLike] = useState(false);
  const currentUser = useAppSelector(state => state.auth.data);

  useEffect(() => {
    if (currentUser && likesArray.includes(currentUser._id)) {
      setToggleLiked(true);
    }
  }, [postId, likesArray, currentUser, setToggleLiked]);

  async function handleToggleLiked(postId: string) {
    if (postId.length > 0 && !isDisableLike) {
      if (postId && currentUser) {
        try {
          setIsDisableLike(true);
          await setPostLiked(postId);
          setIsDisableLike(false);
          setToggleLiked(toggleLiked => !toggleLiked);
          setLikesLength(toggleLiked ? likesLength - 1 : likesLength + 1);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

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
        <p className="font-medium">
          {likesLength === 1 ? `${likesLength} like` : `${likesLength} likes`}
        </p>
      </div>
    </>
  );
};
export default Actions;
