import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  caption: string;
  username: string;
}

const Footer = ({ caption, username }: Props) => {
  const firstPart = caption?.substring(0, 150);
  const secondPart = caption.length > 150 ? caption?.substring(150) : "";

  const [showSecondPart, setShowSecondPart] = useState(false);

  const handleClick = () => {
    setShowSecondPart(!showSecondPart);
  };

  return (
    <div className="pl-2 pt-2">
      {caption && (
        <>
          <Link to={`/${username}/`}>
            <span className="mr-1 font-medium">{username}</span>
          </Link>
          <span className="text-sm font-thin">
            {firstPart}
            {showSecondPart ? secondPart : secondPart && " ..."}
            {secondPart && (
              <button onClick={handleClick} className="text-blue-500 ml-1 underline">
                {showSecondPart ? "Read less" : "Read more"}
              </button>
            )}
          </span>
        </>
      )}
    </div>
  );
};

export default Footer;
