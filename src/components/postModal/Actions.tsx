import CommentsIcon from "../common/icons/PostIcons/CommentsIcon";
import HeartIcon from "../common/icons/PostIcons/HeartIcon";
import HeartActiveIcon from "../common/icons/PostIcons/HeartActiveIcon";
import { useEffect, RefObject, useState } from "react";
import { setPostLiked } from "../../api/serveses/likes/setLiked";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  postId?: string;
  likesArray: string[];
  commentInput: RefObject<HTMLInputElement>;
  likesLength: number;
  setLikesLength: React.Dispatch<React.SetStateAction<number>>;
  setToggleLiked: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLiked: boolean;
}

const Actions = ({
  postId,
  commentInput,
  likesLength,
  setLikesLength,
  setToggleLiked,
  toggleLiked,
  likesArray,
}: Props) => {
  const [isDisableLike, setIsDisableLike] = useState(false);
  const currentUser = useAppSelector(state => state.auth.data);

  useEffect(() => {
    if (currentUser && likesArray.includes(currentUser._id)) {
      setToggleLiked(true);
    }
  }, [postId, likesArray, currentUser, setToggleLiked]);

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
