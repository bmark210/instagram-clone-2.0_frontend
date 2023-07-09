import React, { useEffect } from "react";

type Props = {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  useEffect(() => {
    const rootElement: any = document.body;
    if (isOpen) {
      rootElement.classList.add(`overflow-hidden`);
    } else {
      rootElement.classList.remove(`overflow-hidden`);
    }
    return () => {
      rootElement.classList.remove(`overflow-hidden`);
    };
  }, [isOpen]);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`${
        isOpen ? "fixed opacity-100" : "hidden opacity-0"
      } w-full transition-opacity duration-1000 ease-in-out z-10 inset-0 h-screen bg-black-faded/60 backdrop-opacity-10 flex items-center justify-center`}
    >
      <button className="fixed top-0 right-0 text-white text-3xl p-4 z-20">
        🞪
      </button>

      {children}
    </div>
  );
};
export default Modal;
