//選択中の写真コンポーネント
import { FC } from 'react';

type PhotoViewerProps = {
    photoUrl: string;
};

const PhotoViewer: FC<PhotoViewerProps> = ({ photoUrl }) => {
    return <img src={photoUrl} alt="Selected Game Screenshot" style="{{ width: '100%' }}"/>
};

export default PhotoViewer;