import CommentsIcon from "../common/icons/PostIcons/CommentsIcon";
import HeartIcon from "../common/icons/PostIcons/HeartIcon";
import HeartActiveIcon from "../common/icons/PostIcons/HeartActiveIcon";
import { useEffect, useState } from "react";
import { setPostLiked } from "../../api/serveses/likes/setLiked";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Props {
  postId?: string;
  likesArray: any;
}

const Actions = ({ postId, likesArray }: Props) => {
  const currentUser = useSelector((state: RootState) => state.auth.data);

  const [toggleLiked, setToggleLiked] = useState(false);
  const [likesLength, setLikesLength] = useState(likesArray.length);

  useEffect(() => {
    for (const key in likesArray) {
      const value = likesArray[key];
      if (value._id === currentUser?._id) {
        setToggleLiked(true);
      }
    }
  }, [postId, likesArray, currentUser]);

  async function handleToggleLiked(postId: string | undefined) {
    setToggleLiked((toggleLiked) => !toggleLiked);
    if (postId && currentUser) {
      try {
        await setPostLiked(postId);
      } catch (error) {
        console.log(error);
      }
      setLikesLength(toggleLiked ? likesLength - 1 : likesLength + 1);
    }
  }

  return (
    <>
      <div className="flex justify-between pl-1 py-4">
        <div className="flex flex-row items-center">
          {
            <button onClick={() => handleToggleLiked(postId)} className="mr-1">
              {toggleLiked ? <HeartActiveIcon /> : <HeartIcon />}
            </button>
          }
          <button>
            <CommentsIcon />
          </button>
        </div>
      </div>
      <div className="pl-2 py-0">
        <p className="font-medium">
          {likesLength === 1 ? `${likesLength} like` : `${likesLength} likes`}
        </p>
      </div>
    </>
  );
};
export default Actions;
