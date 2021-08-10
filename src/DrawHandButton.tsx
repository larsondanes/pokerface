import * as React from "react";
import {
  useEffect,
  useState,
  FunctionComponent,
  MouseEventHandler,
} from "react";
interface DrawHandButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const DrawHandButton: FunctionComponent<DrawHandButtonProps> = ({
  onClick,
}) => {
  return <button onClick={onClick}>Draw hand</button>;
};
