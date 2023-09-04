import { useState } from "react";

const Footer = () => {
  const [footerParams] = useState([
    {
      id: 1,
      caption: "Meta",
      link: "#",
    },
    {
      id: 2,
      caption: "About",
      link: "#",
    },
    {
      id: 3,
      caption: "Blog",
      link: "#",
    },
    {
      id: 4,
      caption: "Jobs",
      link: "#",
    },
    {
      id: 5,
      caption: "Help",
      link: "#",
    },
    {
      id: 6,
      caption: "API",
      link: "#",
    },
    {
      id: 7,
      caption: "Privacy",
      link: "#",
    },
    {
      id: 8,
      caption: "Locations",
      link: "#",
    },
    {
      id: 9,
      caption: "Top Accounts",
      link: "#",
    },
    {
      id: 10,
      caption: "Locations",
      link: "#",
    },
    {
      id: 11,
      caption: " Instagram Lite",
      link: "#",
    },
    {
      id: 12,
      caption: "Threads",
      link: "#",
    },
    {
      id: 13,
      caption: "Contact Uploading & Non-Users",
      link: "#",
    },
    {
      id: 14,
      caption: "Meta Verified",
      link: "#",
    },
  ]);

  return (
    <>
      <div className="my-5 flex w-[900px] flex-wrap justify-center text-xs">
        {footerParams.map(item => {
          return (
            <div key={item.id} className="text-gray-400 ">
              <a className="mx-1 hover:underline" href={item.link}>
                {item.caption}
              </a>
            </div>
          );
        })}
        <span className="mx-1 mt-5 text-gray-400">Verified © 2023 INSTAGRAM FROM META</span>
      </div>
    </>
  );
};

export default Footer;
