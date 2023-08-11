import { useState } from "react";
import defaultAvatar from "../../assets/avatars/default_avatar.jpg";
import { addCaption } from "../../api/serveses/caption/addCaption";
import { useAppDispach, useAppSelector } from "../../redux/hooks";
import { openModal } from "../../redux/slices/modal";

const EditProfile = () => {
  const user = useAppSelector(state => state.auth.data);
  const dispatch = useAppDispach();
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  };

  const handleOpenModal = (modalName: string) => {
    dispatch(openModal(modalName));
  };

  const [bio, setBio] = useState("");
  const isValid = bio !== "";

  const onSubmit = async () => {
    await addCaption(bio);
    setBio("");
    window.location.reload();
  };

  return (
    <div className="mt-32 flex flex-col">
      <h2 className="absolute top-0 m-7 text-2xl font-medium">Edit profile</h2>
      <div className="mb-5 ml-32 flex flex-row items-center gap-7">
        <img
          className="h-9 w-9 rounded-full object-cover"
          src={user?.avatar?.downloadURL || defaultAvatar}
          alt="avatar"
          onError={handleImageError}
        />
        <div className="flex flex-col">
          <p>{user?.username}</p>
          <button
            onClick={() => handleOpenModal("avatarModal")}
            className="text-sm font-medium text-blue-primary"
          >
            Change profile photo
          </button>
        </div>
      </div>
      <div className="mb-3 flex flex-row gap-7">
        <p className="ml-28 text-sm font-medium">Website</p>
        <div className="flex flex-col gap-2">
          <input
            className="w-80 cursor-no-drop rounded-sm border border-gray-base bg-gray-200 px-2 py-1"
            type="text"
            placeholder="Website"
            disabled
          />
          <p className="w-80 text-xs">
            Editing your links is only available on mobile. Visit the Instagram app and edit your
            profile to change the websites in your bio.
          </p>
        </div>
      </div>
      <div className="mb-3 flex flex-row gap-7">
        <div className="ml-36 text-sm font-medium">Bio</div>
        <textarea
          className="w-80 rounded-sm border border-gray-base px-2 py-1 outline-none"
          rows={2}
          maxLength={100}
          value={bio}
          name="bio"
          onChange={e => setBio(e.target.value)}
        ></textarea>
      </div>
      <button
        disabled={!isValid}
        className="ml-48 mt-3 w-20 rounded-lg bg-blue-primary px-2 py-1 font-medium text-white disabled:bg-blue-200"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default EditProfile;
