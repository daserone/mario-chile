import React from "react";
import { Card } from "react-bootstrap";

interface CardStatisticProps {
  title: string;
  quantity: number;
  isMoney?: boolean;
}

const CardStatistic = ({
  title,
  quantity,
  isMoney = false,
}: CardStatisticProps) => {
  return (
    <Card
      className="border shadow-lg h-100 bg-light"
      style={{
        minHeight: "150px",
        maxHeight: "200px",
      }}
    >
      <Card.Body className="d-flex flex-column justify-content-start align-items-start">
        <h3 className="my-2">{title}</h3>

        <h1 className="text-center">{isMoney ? `$${quantity}` : quantity}</h1>
      </Card.Body>
    </Card>
  );
};

export default CardStatistic;
