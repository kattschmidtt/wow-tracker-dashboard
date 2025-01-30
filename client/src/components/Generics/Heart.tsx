import React from "react";
import { styled, keyframes } from "@mui/system";

// Define the heartbeat animation
const heartbeat = keyframes`
  0% {
    transform: scale(1) rotate(-45deg);
  }
  25% {
    transform: scale(1.25) rotate(-45deg);
  }
  45% {
    transform: scale(1.5) rotate(-45deg);
  }
`;

// Define the break animation
const breakAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(-45deg);
    opacity: 1;
  }
  100% {
    transform: translateY(50px) rotate(-45deg);
    opacity: 0;
  }
`;

// Create the styled component
const Heart = styled("div")<{ isBreaking?: boolean; size?: number }>`
  height: ${({ size }) => size || 100}px;
  width: ${({ size }) => size || 100}px;
  background-color: #ff91af;
  transform: rotate(-45deg);
  position: relative;
  cursor: pointer;

  &:hover {
    animation: ${({ isBreaking }) => (isBreaking ? "none" : heartbeat)} 1s;
  }

  &::before,
  &::after {
    content: "";
    height: ${({ size }) => size || 100}px;
    width: ${({ size }) => size || 100}px;
    background-color: #ff91af;
    border-radius: 50%;
    position: absolute;
    animation: ${({ isBreaking }) => (isBreaking ? breakAnimation : "none")} 1s
      forwards;
  }

  &::before {
    top: -${({ size }) => (size ? size / 2 : 50)}px;
    left: 0;
  }

  &::after {
    left: -${({ size }) => (size ? size / 2 : 50)}px;
    top: 0;
  }
`;

export default Heart;
