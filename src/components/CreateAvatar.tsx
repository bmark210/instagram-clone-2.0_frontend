import { useEffect, useRef, useState } from "react";
import axios from "../axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import PagePreloader from "./loaders/PagePreloader";
const CreateAvatar = () => {
  const currentAvatar = useSelector(
    (state: RootState) => state.auth.data?.avatar
  );
  const [loading, setLoading] = useState(false);
  const image = useRef(null);
  const [avatar, setAvatar] = useState({
    name: "",
    downloadURL: "",
    type: "",
  });

  useEffect(() => {
    try {
      if (avatar.name !== "") {
        axios.patch("/users/avatar", { avatar }).then((data) => {
          console.log(data);
        });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Ошибка при добавлении аватара");
    } finally {
      setLoading(false);
    }
  }, [avatar]);

  const handleChangeFileAndSubmit = async (e: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("avatar", file);
      const { data } = await axios.post("/avatar", formData);
      setAvatar(data);
    } catch (error) {
      alert("Ошибка при загрузке файла");
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      setLoading(true);
      await axios.patch("/avatar", { name: currentAvatar.name }).then((res) => {
        console.log(res);
      });
      window.location.reload();
      await axios.patch("/users/avatar", { avatar: {} });
    } catch (error) {
      console.log(error);
      alert("Ошибка при удалении аватара");
    }
  };
  if (loading) {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex justify-between items-center bg-white w-96 h-60 rounded-2xl"
      >
        <PagePreloader />
      </div>
    );
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex justify-between items-center bg-white w-96 h-60 rounded-2xl"
    >
      <div className="w-full h-full grid">
        <h2 className="text-xl text-center pt-5 border-b border-gray-base">
          Change Profile Photo
        </h2>
        <button
          onClick={() => image.current?.click()}
          className="text-blue-primary mb-2 font-medium border-b border-gray-base"
        >
          Upload photo
        </button>
        <input
          ref={image}
          type="file"
          onChange={handleChangeFileAndSubmit}
          hidden
        />
        {currentAvatar.downloadURL && (
          <button
            onClick={handleDeleteAvatar}
            className="text-red-primary mb-2 font-medium border-b border-gray-base"
          >
            Remove current photo
          </button>
        )}
        <button
          onClick={(e) => {
            e.nativeEvent.preventDefault();
          }}
          className="font-thin mb-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateAvatar;
