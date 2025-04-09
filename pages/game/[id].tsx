import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { fetchGames, fetchPhotos } from "../../lib/api";
import PhotoViewer from "../../components/PhotoViewer";
import PhotoInfoText from "../../components/PhotoInfoText";
import InfoTerminal from "../../components/InfoTerminal";
import PhotoGallery from "../../components/PhotoGallery";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const games = await fetchGames();
  const photos = await fetchPhotos();

  console.log("Games Data:", games); // デバッグ用ログ
  console.log("Photos Data:", photos); // デバッグ用ログ

  const selectedGame = games.find((game) => game.id === id);

  if (!selectedGame) {
    return {
      notFound: true, // 404ページを表示
    };
  }

  // `photo.game` がオブジェクトなので、`photo.game.id` を使用してフィルタリング
  const relatedPhotos = photos
    .filter((photo) => photo.game.id === id)
    .flatMap((photo) => photo.url.map((urlObj) => urlObj.url)); // `url` 配列を展開して取得

  console.log("Selected Game:", selectedGame); // デバッグ用ログ
  console.log("Related Photos:", relatedPhotos); // デバッグ用ログ


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
  console.log("Photos in Component:", photos); // デバッグ用ログ
  

  const handlePhotoSelect = (photoUrl: string) => {
    console.log("Selected photo:", photoUrl);
  };


  return (
    <div className="flex flex-col bg-stone-800 gap-4 p-4 min-h-screen">
      <h1 className="text-xl font-extrabold">{selectedGame.title}</h1>
      <PhotoViewer photoUrl={typeof photos[0] === "string" ? photos[0] : photos[0]?.url || ""} />
      <PhotoInfoText photoDescription={selectedGame.description} />
      <InfoTerminal />
      <PhotoGallery photos={photos.map(photo => photo.url)} onPhotoSelect={handlePhotoSelect} />
    </div>
  );
};

export default GamePage;
