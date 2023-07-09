import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import defaultAvatar from "../../assets/avatars/default_avatar.jpg";
import { addCaption } from "../../api/serveses/caption/addCaption";

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.auth.data);
  function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  }

  const [bio, setBio] = useState("");
  const isValid = bio !== "";
  console.log(bio);

  const onSubmit = async () => {
    await addCaption(bio);
    setBio("");
    window.location.reload();
  };

  return (
    <div className="mt-32 flex flex-col">
      <h2 className="absolute m-7 top-0 text-2xl font-medium">Edit profile</h2>
      <div className="ml-32 mb-5 flex flex-row gap-7 items-center">
        <img
          className="w-9 h-9 rounded-full"
          src={
            user?.avatar?.downloadURL
              ? user?.avatar?.downloadURL
              : defaultAvatar
          }
          alt="avatar"
          onError={handleImageError}
        />
        <div className="flex flex-col">
          <p>{user.username}</p>
          <button className="text-sm text-blue-primary font-medium">
            Change profile photo
          </button>
        </div>
      </div>
      <div className="mb-3 flex flex-row gap-7">
        <p className="ml-28 text-sm font-medium">Website</p>
        <div className="flex flex-col gap-2">
          <input
            className="cursor-no-drop border border-gray-base rounded-sm px-2 py-1 bg-gray-200 w-80"
            type="text"
            placeholder="Website"
            disabled
          />
          <p className="text-xs w-80">
            Editing your links is only available on mobile. Visit the Instagram
            app and edit your profile to change the websites in your bio.
          </p>
        </div>
      </div>
      <div className="mb-3 flex flex-row gap-7">
        <div className="ml-36 text-sm font-medium">Bio</div>
        <textarea
          className="border border-gray-base rounded-sm px-2 py-1 outline-none w-80"
          rows={2}
          maxLength={100}
          value={bio}
          name="bio"
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </div>
      <button
        disabled={!isValid}
        className="ml-48 mt-3 disabled:bg-blue-200 w-20 px-2 py-1 rounded-lg text-white bg-blue-primary font-medium"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default EditProfile;
