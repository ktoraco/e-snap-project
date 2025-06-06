import { FC, useState, useEffect } from 'react';
import MainContent from '../components/MainContent';
import { fetchGames, fetchPhotos } from '../lib/api'; 
import 'dotenv/config';

type Game = {
  id: number;
  name: string;
  icon: string;
  description?: string;
};
type Photo = {
  id: string;
  url: string;
  game: string;//関連するgameのid
}

const Home: FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const gameData = await fetchGames();
      const photoData = await fetchPhotos();
      setGames(gameData);
      setPhotos(photoData);
    };
    loadData();
  },[]);

  const getPhotoForGame = (gameId: string) => {
    return photos.filter((photo) => photo.game === gameId);
  };

  return (
    <div className="h-full">
      <MainContent selectedGame={selectedGame} />
    </div>
  );
};

export default Home;
