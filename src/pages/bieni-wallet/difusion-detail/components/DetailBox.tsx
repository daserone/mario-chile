import React from "react";

interface DetailBoxProps {
  title: string;
  children: React.ReactNode;
}

const DetailBox = ({ title, children }: DetailBoxProps) => {
  return (
    <div className="detail-item my-1">
      <span className="subtitle text-muted">{title}</span>
      {children}
    </div>
  );
};

export default DetailBox;
