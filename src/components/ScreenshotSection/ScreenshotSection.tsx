'use client';

import { SectionWithTitle } from '..';
import Image from 'next/image';

type Screenshot = {
  id: number;
  image: string;
};

function ScreenshotSection({ screenshots }: { screenshots: Screenshot[] }) {
  return (
    <SectionWithTitle title="Screenshots" border={true}>
      <div className={`sm:grid-cols-${screenshots?.length} grid gap-2`}>
        {screenshots.map((screen) => (
          <div
            className="h-fit max-h-32 w-full overflow-hidden rounded-md"
            key={screen.id}
          >
            <Image
              className="transition-opacity duration-1000 opacity-0"
              src={screen.image}
              alt="screenshot"
              width={600}
              height={80}
              onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            />
          </div>
        ))}
      </div>
    </SectionWithTitle>
  );
}

export default ScreenshotSection;
