import { useRouter } from 'next/router';

const GamePage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Details</h1>
      <p>ID: {id}</p>
    </div>
  );
};

export default GamePage;
