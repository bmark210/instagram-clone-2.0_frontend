import { useEffect, useRef, useState } from "react";
import axios from "../../../axios";
import { useAppDispach, useAppSelector } from "../../../redux/hooks";
import { closeModal } from "../../../redux/slices/modal";
import CircleLoader from "../../common/loaders/circleLoader/CircleLoader";
import { fetchAuth } from "../../../redux/slices/auth";
const CreateAvatar = () => {
  const dispatch = useAppDispach();
  const handleCloseModal = (value: string) => {
    dispatch(closeModal(value));
  };
  const currentAvatar = useAppSelector(state => state.auth.data?.avatar);
  const [loading, setLoading] = useState(false);
  const image = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState({
    name: "",
    downloadURL: "",
    type: "",
  });

  useEffect(() => {
    const createAvatar = async () => {
      try {
        if (avatar.name !== "") {
          await axios.patch("/users/avatar", { avatar }).then(data => {
            return data;
          });
          handleCloseModal("avatarModal");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        alert("Ошибка при добавлении аватара");
      } finally {
        setLoading(false);
      }
    };
    createAvatar();
  }, [avatar]);

  const handleChangeFileAndSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (e.target.files) {
        const file = e.target.files[0];
        formData.append("avatar", file);
        const { data } = await axios.post("/avatar", formData);
        setAvatar(data);
      }
    } catch (error) {
      alert("Ошибка при загрузке файла");
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      setLoading(true);
      if (currentAvatar?.name) {
        await axios.patch("/avatar", { name: currentAvatar.name }).then(res => {
          return res;
        });
        window.location.reload();
        await axios.patch("/users/avatar", { avatar: {} });
      }
    } catch (error) {
      console.log(error);
      alert("Ошибка при удалении аватара");
    }
  };
  if (loading) {
    return (
      <div
        onClick={e => e.stopPropagation()}
        className="flex h-60 w-96 items-center justify-center rounded-2xl bg-white"
      >
        <CircleLoader />
      </div>
    );
  }
  return (
    <div
      onClick={e => e.stopPropagation()}
      className="flex h-60 w-96 animate-showCreateAvatar items-center justify-between rounded-2xl bg-white"
    >
      <div className="grid h-full w-full">
        <h2 className="border-b border-gray-base pt-5 text-center text-xl">Change Profile Photo</h2>
        <button
          onClick={() => image.current?.click()}
          className="mb-2 border-b border-gray-base font-medium text-blue-primary"
        >
          Upload photo
        </button>
        <input ref={image} type="file" onChange={handleChangeFileAndSubmit} hidden />
        {currentAvatar?.downloadURL && (
          <button
            onClick={handleDeleteAvatar}
            className="mb-2 border-b border-gray-base font-medium text-red-primary"
          >
            Remove current photo
          </button>
        )}
        <button onClick={() => handleCloseModal("avatarModal")} className="mb-2 font-thin">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateAvatar;
