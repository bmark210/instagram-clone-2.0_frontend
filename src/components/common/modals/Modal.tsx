import React, { useEffect } from "react";
import { useAppDispach } from "../../../redux/hooks";
import { closeModal } from "../../../redux/slices/modal";

type Props = {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  const dispatch = useAppDispach();
  const handleCloseModal = () => {
    if (setIsOpen) {
      setIsOpen(false);
    } else {
      dispatch(closeModal("createModal"));
      dispatch(closeModal("avatarModal"));
    }
  };

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
      onClick={handleCloseModal}
      className={`${
        isOpen ? "fixed z-40 opacity-100" : "hidden opacity-0"
      } inset-0 z-20 flex h-screen w-full items-center justify-center bg-black-faded/60 backdrop-opacity-10 transition-opacity duration-1000 ease-in-out`}
    >
      <button className="fixed right-0 top-0 p-4 text-3xl text-white">🞪</button>

      {children}
    </div>
  );
};
export default Modal;
