import { FC } from "react";

type PhotoInfoTextProps = {
  photoDescription: string;
};

const PhotoInfoText: FC<PhotoInfoTextProps> = ({ photoDescription }) => {
  return <div className="text-white">{photoDescription}</div>;
};

export default PhotoInfoText;
