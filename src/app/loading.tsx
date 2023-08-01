import { SectionWithTitle, SkeletonImage } from '../components';

export default async function Loading() {
  return (
    <div>
      <h1 className="md:text-left mt-4 mb-12 text-3xl font-bold text-center">
        Welcome to Free2Play!
      </h1>
      <SectionWithTitle title="Recently Added" border={true}>
        <div className="grid grid-cols-4 gap-2">
          {Array(4)
            .fill(null)
            .map(() => (
              <div
                key={crypto.randomUUID()}
                className="overflow-hidden h-[155px]"
              >
                <SkeletonImage />
              </div>
            ))}
        </div>
      </SectionWithTitle>
      <SectionWithTitle title="Popular Games">
        <div className="grid grid-cols-4 gap-2">
          {Array(36)
            .fill(null)
            .map(() => (
              <div
                key={crypto.randomUUID()}
                className="overflow-hidden h-[155px]"
              >
                <SkeletonImage />
              </div>
            ))}
        </div>
      </SectionWithTitle>
    </div>
  );
}
