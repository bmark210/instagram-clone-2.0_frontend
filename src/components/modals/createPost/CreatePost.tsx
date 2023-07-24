import MediaIcon from "../../common/icons/MediaIcon";
import React, { useRef, useState, useEffect } from "react";
import axios from "../../../axios";
import ContentLoader from "react-content-loader";
import PlaceIcon from "../../common/icons/PlaceIcon";
import defaultAvatar from "../../../assets/avatars/default_avatar.jpg";
import { User } from "../../../types/user/user";
import { useAppDispach, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { closeModal, openModal } from "../../../redux/slices/modal";

type Fields = {
  image: {
    name: string;
    downloadURL: string;
    type: string;
  } | null;
  text: string;
  place: string;
};

const Create = () => {
  const dispatch = useAppDispach();
  const isOpen = useAppSelector(state => state.modals.createModal);
  const handleOpen = (modalName: string) => {
    dispatch(openModal(modalName));
  };

  const currentUser: User | null = useAppSelector(state => state.auth);
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

  useEffect(() => {
    if (isOpen === false && fields.image !== null) {
      const result = confirm("Post will be deleted");
      return result ? handleClose() : handleOpen("createModal");
    }
    if (isOpen === false) {
      setNextStep(false);
    }
    console.log(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeModal("createModal"));
    axios
      .post(`/image/remove/${fields.image?.name}`)
      .then(() => {
        setFields({
          image: null,
          text: "",
          place: "",
        });
        navigate("/feed");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setImageLoading(true);
      const formData = new FormData();
      if (e.target.files) {
        const file = e.target.files[0];
        formData.append("image", file);
        const { data } = await axios.post("/image", formData);
        setFields({ ...fields, image: data });
      }
    } catch (error) {
      alert("Ошибка при загрузке файла");
      setFields({ ...fields, image: null });
    } finally {
      setImageLoading(false);
    }
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post("/posts/create", fields);
      setFields({
        image: null,
        text: "",
        place: "",
      });
      navigate("/feed");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Ошибка при добавлении поста");
    }
  };

  return (
    <div
      onClick={e => e.stopPropagation()}
      className={`${fields.image ? "w-1/2" : "w-1/3"} mx-auto rounded-lg bg-white`}
    >
      {fields.image ? (
        <>
          <div className="flex border-b border-gray-base py-2">
            <p className="flex-1 text-center font-medium">Создание публикации</p>
            {nextStep ? (
              <button
                onClick={onSubmit}
                className="pr-4 text-end font-medium text-blue-primary hover:text-black-light"
              >
                Поделиться
              </button>
            ) : (
              <button
                onClick={() => setNextStep(true)}
                className="pr-4 text-end font-medium text-blue-primary hover:text-black-light"
              >
                Далее
              </button>
            )}
          </div>
          <div className="flex flex-row justify-between">
            <div className="mx-auto bg-gray-200">
              <img
                className="h-[550px] w-full object-cover"
                src={fields.image?.downloadURL}
                alt="uploaded image"
              />
            </div>
            {nextStep && (
              <div className="flex flex-col border-l  border-gray-base">
                <div className="mx-2 flex w-36 items-center gap-3 py-2">
                  <img src={currentUserAvatarUrl} alt="avatar" className="h-10 w-10 rounded-full" />
                  <p className="font-xl text-center font-medium">{currentUser.data?.username}</p>
                </div>
                <textarea
                  cols={30}
                  rows={10}
                  placeholder="Добавьте подпись..."
                  className="h-50 w-80  overflow-y-auto px-3 outline-none"
                  maxLength={500}
                  onChange={e => setFields({ ...fields, text: e.target.value })}
                  value={fields.text}
                ></textarea>
                <div>
                  <input
                    type="text"
                    value={fields.place}
                    placeholder="Добавьте место"
                    className="h-10 w-80 border-y border-gray-base px-3 outline-none"
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
        <div className="py-20">
          <ContentLoader
            viewBox="0 0 400 160"
            height={160}
            width={400}
            backgroundColor="transparent"
            className="mx-auto"
          >
            <circle cx="150" cy="86" r="8" />
            <circle cx="194" cy="86" r="8" />
            <circle cx="238" cy="86" r="8" />
          </ContentLoader>
        </div>
      ) : (
        <>
          <p className="border-b border-gray-base py-2 text-center font-medium">
            Создание публикации
          </p>

          <div className="flex flex-col py-32">
            <div className="mx-auto pb-2">
              <MediaIcon />
            </div>
            <h2 className="pb-2 text-center text-xl">Перетащите сюда фото и видео</h2>
            <input ref={imageRef} type="file" onChange={handleChangeFile} hidden />
            <button
              onClick={() => imageRef.current?.click()}
              className="mx-auto mt-2 rounded-lg bg-blue-primary px-3 py-1.5 text-sm text-white hover:bg-blue-medium"
            >
              Выбрать на компьютере
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Create;