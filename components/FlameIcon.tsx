import { FC } from "react";

const FlameIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="flame-icon"
      width="64"
      height="64"
    >
      <path
        d="M32 2C20 14 24 24 24 32c0 8-4 12-4 16s4 8 12 8 12-4 12-8-4-8-4-16c0-8 4-18-8-30z"
        fill="orange"
      />
    </svg>
  );
};

export default FlameIcon;

<style jsx>{`
  .flame-icon path {
    animation: flame-flicker 1.5s infinite alternate;
  }

  @keyframes flame-flicker {
    0% {
      fill: orange;
      filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.8));
    }
    100% {
      fill: red;
      filter: drop-shadow(0 0 20px rgba(255, 69, 0, 1));
    }
  }
`}</style>
