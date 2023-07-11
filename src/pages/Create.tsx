import MediaIcon from "../components/common/icons/MediaIcon";
import React, { useRef, useState, useEffect } from "react";
import axios from "../axios";
import ContentLoader from "react-content-loader";
import PlaceIcon from "../components/common/icons/PlaceIcon";
import defaultAvatar from "../assets/avatars/default_avatar.jpg";
import { User } from "../types/user/user";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Fields = {
  image: {
    name: string;
    downloadURL: string;
    type: string;
  } | null;
  text: string;
  place: string;
};

const Create = ({ isOpen, setIsOpen }: Props) => {
  const currentUser: User | null = useAppSelector((state) => state.auth);
  const currentUserAvatarUrl =
    currentUser.data?.avatar?.downloadURL || defaultAvatar;

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
      return result ? handleClose() : setIsOpen(!isOpen);
    }
    if (isOpen === false) {
      setNextStep(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    axios
      .post(`/image/remove/${fields.image?.name}`)
      .then(() => {
        setFields({
          image: null,
          text: "",
          place: "",
        });
        window.location.reload();
        navigate("/feed");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFields({
          image: null,
          text: "",
          place: "",
        });
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
      setIsOpen(false);
      setFields({
        image: null,
        text: "",
        place: "",
      });
      navigate("/feed");
    } catch (error) {
      console.log(error);
      alert("Ошибка при добавлении поста");
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        fields.image ? "w-1/2" : "w-1/3"
      } mx-auto bg-white rounded-lg`}
    >
      {fields.image ? (
        <>
          <div className="flex border-b border-gray-base py-2">
            <p className="font-medium text-center flex-1">
              Создание публикации
            </p>
            {nextStep ? (
              <button
                onClick={onSubmit}
                className="text-end pr-4 font-medium hover:text-black-light text-blue-primary"
              >
                Поделиться
              </button>
            ) : (
              <button
                onClick={() => setNextStep(true)}
                className="text-end pr-4 font-medium hover:text-black-light text-blue-primary"
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
                <div className="w-36 flex justify-between items-center py-2">
                  <img
                    src={currentUserAvatarUrl}
                    alt="avatar"
                    className="w-10 h-10 mx-auto rounded-full"
                  />
                  <p className="font-xl font-medium text-center">
                    {currentUser.data?.username}
                  </p>
                </div>
                <textarea
                  cols={30}
                  rows={10}
                  placeholder="Добавьте подпись..."
                  className="w-80 h-50  outline-none overflow-y-auto px-3"
                  maxLength={500}
                  onChange={(e) =>
                    setFields({ ...fields, text: e.target.value })
                  }
                  value={fields.text}
                ></textarea>
                <div>
                  <input
                    type="text"
                    value={fields.place}
                    placeholder="Добавьте место"
                    className="w-80 h-10 outline-none px-3 border-y border-gray-base"
                    maxLength={60}
                    onChange={(e) =>
                      setFields({ ...fields, place: e.target.value })
                    }
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
          <p className="font-medium text-center border-b border-gray-base py-2">
            Создание публикации
          </p>

          <div className="flex flex-col py-32">
            <div className="mx-auto pb-2">
              <MediaIcon />
            </div>
            <h2 className="text-center text-xl pb-2">
              Перетащите сюда фото и видео
            </h2>
            <input
              ref={imageRef}
              type="file"
              onChange={handleChangeFile}
              hidden
            />
            <button
              onClick={() => imageRef.current?.click()}
              className="mx-auto rounded-lg py-1.5 px-3 bg-blue-primary hover:bg-blue-medium text-white text-sm mt-2"
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
