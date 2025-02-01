import React, { useState } from "react";
import { styled, keyframes } from "@mui/system";

// Define the heartbeat animation
const heartbeat = keyframes`
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.25);
  }
  45% {
    transform: scale(1.5);
  }
`;

// Create the styled component
const Heart = styled("div")<{ isBreaking?: boolean; size?: number }>`
  height: ${({ size }) => size || 100}px;
  width: ${({ size }) => size || 100}px;
  background-color: #ff91af;
  rotate: 45deg;
  position: relative;
  cursor: pointer;

  &:hover {
    animation: ${heartbeat} 1s;
  }

  &::before,
  &::after {
    content: "";
    height: ${({ size }) => size || 100}px;
    width: ${({ size }) => size || 100}px;
    background-color: #ff91af;
    border-radius: 50%;
    position: absolute;
  }

  &::before {
    top: -${({ size }) => (size ? size / 2 : 15)}px;
    left: 0;
  }

  &::after {
    left: -${({ size }) => (size ? size / 2 : 15)}px;
    top: 0;
  }
`;

// Heart component with click handler
const HeartComponent: React.FC = () => {
  const [isBeating, setIsBeating] = useState(false);

  const handleClick = () => {
    setIsBeating(true);
    setTimeout(() => setIsBeating(false), 1000); // Reset after animation ends
  };

  return (
    <Heart
      size={100}
      onClick={handleClick}
      style={{
        animation: isBeating ? `${heartbeat} 1s` : "none",
      }}
    />
  );
};

export default HeartComponent;
