interface Props {
  photoUrl: string;
  caption?: string;
}

const Image = ({ photoUrl, caption }: Props) => {
  return <img className="max-h-[611px] w-full rounded" src={photoUrl} alt={caption} />;
};

export default Image;
