import { FC } from "react";

type PhotoViewerProps = {
  photoUrl: string;
};

const PhotoViewer: FC<PhotoViewerProps> = ({ photoUrl }) => {
  return (
    <div
      className="w-full relative bg-red-200 rounded-lg overflow-hidden"
      style={{ height: "500px" }} // Changed from padding-bottom to fixed height
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt="Selected Game Screenshot"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 flex items-center justify-center text-white">
          No Image Available
        </div>
      )}
    </div>
  );
};

export default PhotoViewer;
