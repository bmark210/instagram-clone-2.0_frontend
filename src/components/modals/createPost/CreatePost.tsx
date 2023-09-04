import MediaIcon from "../../common/icons/MediaIcon";
import React, { useRef, useState, useEffect } from "react";
import PlaceIcon from "../../common/icons/PlaceIcon";
import defaultAvatar from "../../../assets/avatars/default_avatar.jpg";
import { UserData } from "../../../interfaces/user";
import { useAppDispach, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../../redux/slices/modal";
import CircleLoader from "../../common/loaders/circleLoader/CircleLoader";
import { addPostDataInFieldToUser } from "../../../api/endpoints/posts";
import { Fields } from "../../../interfaces/fields";
import { uploadImg } from "../../../api/serveses/image/setImage";
import { FEED } from "../../../constants/routes";
import { fetchPosts } from "../../../redux/slices/posts";
// import { deleteImageFromDB } from "../../../api/serveses/image/deleteImage";

interface Props {
  setControlConcilation: React.Dispatch<React.SetStateAction<boolean>>;
}

const Create = ({ setControlConcilation }: Props) => {
  const dispatch = useAppDispach();
  const currentUser: UserData = useAppSelector(state => state.auth);
  const currentUserAvatarUrl = currentUser.data?.avatar?.downloadURL || defaultAvatar;
  const navigate = useNavigate();
  const imageRef = useRef<HTMLInputElement>(null);
  const [nextStep, setNextStep] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(false);
  const [fields, setFields] = useState<Fields>({
    image: null,
    text: "",
    place: "",
  });

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setImageLoading(true);
      const formData = new FormData();
      if (e.target.files) {
        const file = e.target.files[0];
        formData.append("image", file);
        const data = await uploadImg(formData, "image");
        setFields({ ...fields, image: data });
      }
    } catch (error) {
      alert("Ошибка при загрузке файла");
      setFields({ ...fields, image: null });
    } finally {
      setImageLoading(false);
    }
  };
  useEffect(() => {
    async function handleConcellation() {
      if (fields.image) {
        setControlConcilation(false);
      } else {
        setControlConcilation(true);
      }
    }
    handleConcellation();
  }, [fields, setControlConcilation]);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await addPostDataInFieldToUser(fields);
      setFields({
        image: null,
        text: "",
        place: "",
      });
      dispatch(closeModal("createModal"));
      if (location.pathname === FEED) {
        dispatch(fetchPosts());
      } else {
        navigate(FEED);
      }
    } catch (error) {
      console.log(error);
      alert("Ошибка при добавлении поста");
    }
  };

  return (
    <div
      onClick={e => e.stopPropagation()}
      className={`${
        fields.image ? "w-1/2" : "w-1/3"
      } mx-auto rounded-lg bg-white dark:bg-black-light dark:text-white`}
    >
      {fields.image ? (
        <>
          <div className="flex border-b py-2 dark:border-zinc-600">
            <p className="flex-1 text-center font-medium">Create new post</p>
            {nextStep ? (
              <button
                onClick={onSubmit}
                className="pr-4 text-end font-medium text-blue-pure hover:text-black-light dark:hover:text-white"
              >
                Share
              </button>
            ) : (
              <button
                onClick={() => setNextStep(true)}
                className="pr-4 text-end font-medium text-blue-pure hover:text-black-light dark:hover:text-white"
              >
                Next
              </button>
            )}
          </div>
          <div className="flex flex-row justify-between">
            <div className="mx-auto bg-gray-200">
              <img
                className="h-[550px] w-full object-cover"
                src={fields.image.downloadURL}
                alt="uploaded image"
              />
            </div>
            {nextStep && (
              <div className="flex flex-col border-l border-gray-base dark:border-zinc-600 ">
                <div className="mx-2 flex w-36 items-center gap-3 py-2">
                  <img src={currentUserAvatarUrl} alt="avatar" className="h-10 w-10 rounded-full" />
                  <p className="font-xl text-center font-medium">{currentUser.data?.username}</p>
                </div>
                <textarea
                  cols={30}
                  rows={10}
                  placeholder="Добавьте подпись..."
                  className="h-50 w-80 overflow-y-auto px-3 outline-none dark:bg-black-light"
                  maxLength={500}
                  onChange={e => setFields({ ...fields, text: e.target.value })}
                  value={fields.text}
                ></textarea>
                <div>
                  <input
                    type="text"
                    value={fields.place}
                    placeholder="Добавьте место"
                    className="h-10 w-80 border-y border-gray-base px-3 outline-none dark:border-zinc-600 dark:bg-black-light"
                    maxLength={60}
                    onChange={e => setFields({ ...fields, place: e.target.value })}
                  />
                  <PlaceIcon />
                </div>
              </div>
            )}
          </div>
        </>
      ) : imageLoading ? (
        <div className="flex items-center justify-center py-20">
          <CircleLoader size="3xl" color="gray-400" />
        </div>
      ) : (
        <>
          <p className="border-b border-gray-base py-2  text-center font-medium dark:border-zinc-600">
            Create new post
          </p>
          <div className="flex flex-col py-32">
            <div className="mx-auto pb-2">
              <MediaIcon />
            </div>
            <h2 className="pb-2 text-center text-xl">Drag photos and videos here</h2>
            <input ref={imageRef} type="file" onChange={handleChangeFile} hidden />
            <button
              onClick={() => imageRef.current?.click()}
              className="mx-auto mt-2 rounded-lg bg-blue-pure px-3 py-1.5 text-sm text-white hover:bg-blue-bright"
            >
              Select from computer
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Create;
