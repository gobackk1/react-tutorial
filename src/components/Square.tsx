import React from "react";
import { Mark } from "../types";

type SquareProps = {
  value: Mark;
  onClick: () => void;
};

export const Square: React.FC<SquareProps> = (props: SquareProps) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};
