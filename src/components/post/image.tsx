import { FC } from "react";

interface ImageProps {
  photoUrl: string;
  caption?: string;
}

const Image: FC<ImageProps> = ({ photoUrl, caption }) => {
  return <img className="w-full max-h-[611px] rounded" src={photoUrl} alt={caption} />;
};

export default Image;
