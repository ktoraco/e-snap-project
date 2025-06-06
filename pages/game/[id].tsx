import { GetServerSideProps } from "next";
import { fetchGames, fetchPhotos } from "../../lib/api";
import PhotoViewer from "../../components/PhotoViewer";
import PhotoInfoText from "../../components/PhotoInfoText";
import InfoTerminal from "../../components/InfoTerminal";
import PhotoGallery from "../../components/PhotoGallery";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const games = await fetchGames();
  const photos = await fetchPhotos();

  const selectedGame = games.find((game) => game.id === id);

  if (!selectedGame) {
    return {
      notFound: true, // 404ページ
    };
  }

  // `photo.game` がオブジェクトなので、`photo.game.id` を使用してフィルタリング
  const relatedPhotos = photos.filter((photo) => photo.game.id === id).flatMap((photo) => photo.url.map((urlObj) => urlObj.url)); // `url` 配列を展開して取得

  return {
    props: {
      selectedGame,
      photos: relatedPhotos,
    },
  };
};

type GamePageProps = {
  selectedGame: {
    id: string;
    title: string;
    description: string;
    icon: string;
  };
  photos: {
    id: string;
    url: string;
    game: string;
  }[];
};

const GamePage = ({ selectedGame, photos }: GamePageProps) => {
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState("");

  useEffect(() => {
    if( photos && photos.length > 0) {
      const firstPhoto = typeof photos[0] === "string" ? photos[0] : photos[0].url;
      setSelectedPhotoUrl(firstPhoto);
    }
  },[selectedGame.id, photos]); //selectedGame.idが変わったときにだけ初期化

  const handlePhotoSelect = (photoUrl: string) => {
    console.log("Selected photo:", photoUrl);
    setSelectedPhotoUrl(photoUrl); // 選択された写真のURLを状態として保存
  };

  return (
    <div className="flex flex-col bg-stone-800 gap-4 p-4 min-h-screen">
      <h1 className="text-xl font-extrabold text-stone-400">{selectedGame.title}</h1>
      <PhotoViewer photoUrl={selectedPhotoUrl} />
      <PhotoInfoText photoDescription={selectedGame.description} />
      <InfoTerminal gameTitle={selectedGame.title} />
      <PhotoGallery photos={photos} onPhotoSelect={handlePhotoSelect} selectedPhotoUrl={selectedPhotoUrl} />
    </div>
  );
};

export default GamePage;
