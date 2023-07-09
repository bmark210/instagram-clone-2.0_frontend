import { useState } from "react";

const Footer = () => {
  const [footerParams, setFooterParams] = useState([
    {
      id: 1,
      caption: "About",
      link: "#",
    },
    {
      id: 2,
      caption: "Help",
      link: "#",
    },
    {
      id: 3,
      caption: "Press",
      link: "#",
    },
    {
      id: 4,
      caption: "API",
      link: "#",
    },
    {
      id: 5,
      caption: "Jobs",
      link: "#",
    },
    {
      id: 6,
      caption: "Privacy",
      link: "#",
    },
    {
      id: 7,
      caption: "Terms",
      link: "#",
    },
    {
      id: 8,
      caption: "Locations",
      link: "#",
    },
    {
      id: 9,
      caption: "Language",
      link: "#",
    },
    {
      id: 10,
      caption: "Meta Verified",
      link: "#",
    },
  ]);

  return (
    <>
      <div className="w-80 mt-8 text-xs flex flex-wrap">
        {footerParams.map((item) => {
          return (
            <div key={item.id} className="text-gray-400 ">
              <a className="hover:underline mx-1" href={item.link}>
                {item.caption}
              </a>
              ·
            </div>
          );
        })}
        <span className="mx-1 text-gray-400 mt-5">
          Verified © 2023 INSTAGRAM FROM META
        </span>
      </div>
    </>
  );
};

export default Footer;
