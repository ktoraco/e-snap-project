import { FC, useState } from "react";

type CustomIconProps = {
  isGradient?: boolean;
};

const CustomIcon: FC<CustomIconProps> = ({ isGradient = false }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="40"
      viewBox="0 0 25 32"
      fill="none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // マウスが外れたときもリセット
      style={{ cursor: "pointer" }}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4500" /> {/* 赤色 */}
          <stop offset="50%" stopColor="#FFA500" /> {/* オレンジ */}
          <stop offset="100%" stopColor="#87CEEB" /> {/* ほのかな水色 */}
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={isPressed || isGradient ? "url(#glow)" : undefined}>
        <path
          d="M22.1764 14.35C21.7739 13.825 21.2839 13.37 20.8289 12.915C19.6564 11.865 18.3265 11.1125 17.2065 10.01C14.599 7.455 14.0214 3.2375 15.6839 0C14.0214 0.4025 12.5689 1.3125 11.3264 2.31C6.79395 5.95 5.00895 12.3725 7.14395 17.885C7.21395 18.06 7.28395 18.235 7.28395 18.4625C7.28395 18.8475 7.02145 19.1975 6.67145 19.3375C6.26895 19.5125 5.84895 19.4075 5.51645 19.1275C5.41713 19.0443 5.33406 18.9434 5.27145 18.83C3.29395 16.3275 2.97895 12.74 4.30895 9.87C1.38645 12.25 -0.206051 16.275 0.0214493 20.0725C0.126449 20.9475 0.231449 21.8225 0.528949 22.6975C0.773949 23.7475 1.24645 24.7975 1.77145 25.725C3.66145 28.7525 6.93395 30.9225 10.4514 31.36C14.1965 31.8325 18.204 31.15 21.074 28.56C24.2765 25.655 25.3964 21 23.7514 17.01L23.524 16.555C23.1565 15.75 22.1764 14.35 22.1764 14.35ZM16.6465 25.375C16.1565 25.795 15.3514 26.25 14.7214 26.425C12.7614 27.125 10.8014 26.145 9.64645 24.99C11.7289 24.5 12.9714 22.96 13.3389 21.4025C13.6364 20.0025 13.0765 18.8475 12.849 17.5C12.639 16.205 12.674 15.1025 13.1465 13.895C13.479 14.56 13.829 15.225 14.249 15.75C15.5965 17.5 17.7139 18.27 18.1689 20.65C18.2389 20.895 18.274 21.14 18.274 21.4025C18.3265 22.8375 17.6965 24.4125 16.6465 25.375Z"
          fill={isPressed || isGradient ? "url(#gradient)" : "#FF4F28"}
        />
      </g>
    </svg>
  );
};

export default CustomIcon;
