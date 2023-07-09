type Props = {
  username: string;
  avatarUrl: string;
};

const StoryItem = ({ avatarUrl, username }: Props) => {
  return (
    <>
      <div className="mx-2.5">
        <div className="w-16 h-16 rounded-full max-w-sm bg-gradient-to-bl via-amber-500 from-pink-600 to-yellow-300 p-0.5">
          <div className="border-2 border-white rounded-full">
            <img
              className="w-full rounded-full"
              src={avatarUrl}
              alt={`${username} stories`}
            />
          </div>
        </div>
        <p className="text-center text-xs">{username}</p>
      </div>
    </>
  );
};

export default StoryItem;
