import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  to: string;
  className?: string;
};

const CustomLink = ({ children, to, className }: Props) => {
  return (
    <NavLink to={to} className={className}>
      {children}
    </NavLink>
  );
};

export default CustomLink;
