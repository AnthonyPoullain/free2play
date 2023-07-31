import { SkeletonImage, SkeletonTitle } from '@/src/components';

export default async function Loading() {
  const games = Array(36).fill(null);
  return (
    <div>
      <div>
        <SkeletonTitle />
      </div>
      <div className="sm:grid-cols-3 grid w-full grid-cols-1 gap-1 mx-auto">
        {games?.map(() =>
          Array(36)
            .fill(null)
            .map(() => (
              <div
                key={crypto.randomUUID()}
                className="overflow-hidden rounded-md"
              >
                <SkeletonImage />
              </div>
            ))
        )}
      </div>
    </div>
  );
}
