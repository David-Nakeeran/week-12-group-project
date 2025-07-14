export default async function GamesDetailPage({ params }) {
  const { gameId } = await params;
  console.log(gameId);
  return (
    <>
      <h1>Games Detail Page</h1>
    </>
  );
}
