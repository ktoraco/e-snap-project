import { useRouter } from "next/router";
import PhotoViewer from "../../components/PhotoViewer";
import PhotoInfoText from "../../components/PhotoInfoText";
import InfoTerminal from "../../components/InfoTerminal";
import PhotoGallery from "../../components/PhotoGallery";

const GamePage = ({ games }) => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <div>Loading...</div>;

  const selectedGame = games.find((game) => game.id === parseInt(id as string));
  if (!selectedGame) return <div>Game not found</div>;

  const photoUrl = `/path/to/images/${selectedGame.id}.jpg`; // URLを生成
  const photoDescription = selectedGame.description; // 適切な説明を取得

  const handlePhotoSelect = (photoUrl) => {
    console.log("Selected photo:", photoUrl);
  };

  return (
    <div className="flex flex-col bg-stone-800 gap-4 p-4">
      <h1>{selectedGame.name}</h1>
      <PhotoViewer photoUrl={photoUrl} />
      <PhotoInfoText photoDescription={photoDescription} />
      <InfoTerminal />
      <PhotoGallery />
    </div>
  );
};

export default GamePage;
