import { Image } from "../../../interfaces/image";

type Props = {
  image: Image;
};

const Image = ({ image }: Props) => {
  return (
    <div>
      <img
        className="h-full max-h-[600px] min-h-[600px] min-w-full object-cover"
        src={image.downloadURL}
      />
    </div>
  );
};

export default Image;
