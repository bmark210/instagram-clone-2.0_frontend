import React, { useEffect } from "react";

type Props = {
  children?: React.ReactNode;
  isOpen: boolean;
  onRequestClose?: () => void;
};

const Modal = ({ children, isOpen, onRequestClose }: Props) => {
  useEffect(() => {
    const rootElement: HTMLElement = document.body;
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
      onClick={onRequestClose}
      className="fixed inset-0 z-50 flex animate-showModal items-center justify-center bg-black-faded/60 backdrop-opacity-10 transition-opacity duration-1000 ease-in-out"
    >
      <button className="fixed right-0 top-0 p-4 text-3xl text-white">🞪</button>
      {children}
    </div>
  );
};
export default Modal;
