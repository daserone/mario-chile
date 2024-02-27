import React from "react";

interface Props {
  condicion: boolean;
  children: React.ReactNode;
}

const If: React.FC<Props> = ({ condicion, children }) => {
  return condicion ? <>{children}</> : null;
};

export default If;
