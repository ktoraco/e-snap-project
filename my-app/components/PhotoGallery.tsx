import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type PhotoGalleryProps = {
    photos: string[];
    onPhotoSelect: (photoUrl: string) => void;
};

const PhotoGallery: FC<PhotoGalleryProps> = ({ photos, onPhotoSelect}) => {
    return (
        <Swiper slidePreview={3} spaceBetweeen={8}>
            {photos.map((photo, index) => (
                <swiperSlide key={index} onClick={() => onPhotoSelect(photo)}>
                    <img src={photo} alt={`Screenshot ${index + 1}`} style={{ width: '100%'}} />
                </swiperSlide>
            ))}
        </Swiper>
    );   
};

export default PhotoGallery;
