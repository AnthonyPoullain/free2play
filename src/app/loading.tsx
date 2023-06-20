export default async function Loading() {
  const games = Array(36).fill(null);
  return (
    <div>
      <div>
        <h1 className="md:text-left mb-12 text-3xl font-bold text-center">
          <strong className="text-teal-600">Loading</strong> Free to Play
          Games...
        </h1>
      </div>
      <div className="sm:grid-cols-3 grid w-full grid-cols-1 gap-1 mx-auto">
        {games?.map(() => (
          <div
            key={crypto.randomUUID()}
            className="animate-pulse h-44 relative w-full bg-gray-400 bg-opacity-25"
          ></div>
        ))}
      </div>
    </div>
  );
}
