import { FC } from "react";

interface FooterProps {
  caption?: string;
  username: string;
}

const Footer: FC<FooterProps> = ({ caption, username }) => {
  return (
    <div className="pt-2 pl-1 pb-1">
      {caption && (
        <>
          <span className="mr-1 font-medium">{username}</span>
          <span className="text-sm font-thin">{caption}</span>
        </>
      )}
    </div>
  );
};
export default Footer;
