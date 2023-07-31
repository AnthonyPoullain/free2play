/* eslint-disable react/jsx-no-undef */
import {
  SectionWithTitle,
  SkeletonImage,
  SkeletonParagraph,
  SkeletonTitle,
} from '@/src/components';
import Link from 'next/link';
import { BsFillPlayFill, BsTwitch, BsYoutube } from 'react-icons/bs';

export default async function loading() {
  return (
    <div className="md:text-left md:items-start flex flex-col items-center text-center">
      <SkeletonTitle />
      <section className="flex flex-col w-full gap-2 mb-4 text-sm max-w-[365px]">
        <div className="overflow-hidden rounded-md">
          <SkeletonImage />
        </div>
        <Link
          href=""
          target="_blank"
          className="border-sky-600 hover:bg-gray-700 focus:bg-gray-700 flex items-center justify-center w-full h-12 gap-2 p-2 font-bold bg-gray-800 border-2 rounded-md"
        >
          Play Now
          <BsFillPlayFill className="text-sky-600 inline text-2xl" />
        </Link>
        <div className="sm:flex-row flex flex-col gap-2">
          <Link
            href=""
            target="_blank"
            className="hover:bg-gray-700 focus:bg-gray-700 flex items-center justify-center w-full h-12 gap-2 p-2 bg-gray-800 rounded-md"
          >
            <span>
              Watch on <strong className="font-bold">Twitch</strong>
            </span>
            <BsTwitch className="inline text-lg text-purple-700" />
          </Link>
          <Link
            href="https://www.youtube.com/results?search_query=hello"
            target="_blank"
            className="hover:bg-gray-700 focus:bg-gray-700 flex items-center justify-center w-full h-12 gap-2 p-2 bg-gray-800 rounded-md"
          >
            <span>
              Watch on <strong className="font-bold">YouTube</strong>
            </span>
            <BsYoutube className="inline text-2xl text-red-700" />
          </Link>
        </div>
      </section>
      <SectionWithTitle title="Screenshots" border={true}>
        <div className="sm:grid-cols-4 grid gap-2">
          {Array(4)
            .fill(null)
            .map(() => (
              <SkeletonImage key={crypto.randomUUID()} />
            ))}
        </div>
      </SectionWithTitle>
      <SectionWithTitle title="About...">
        <SkeletonParagraph />
      </SectionWithTitle>
      <SectionWithTitle title={`More Free...`} border={true}>
        <div className="grid grid-cols-4 gap-2">
          {Array(8)
            .fill(null)
            .map(() => (
              <SkeletonImage key={crypto.randomUUID()} />
            ))}
        </div>
      </SectionWithTitle>
    </div>
  );
}
