import { ReactNode } from 'react';

export type SectionWithTitleProps = {
	title?: string | ReactNode;
	children?: ReactNode;
	border?: boolean;
};

function SectionWithTitle({ title, children }: SectionWithTitleProps) {
	return (
		<section
			className={`w-full relative mx-auto py-4 ${title ? 'mt-8 ' : 'mt-6'
				} mb-6`}
		>
			{children}
			{title && (
				<h2 className="uppercase translate-y-[-80%] bg-zinc-900 whitespace-nowrap sm:pl-0 pl-4 translate-x-[-50%] sm:translate-x-0 absolute top-0 sm:left-0 left-1/2 text-xl font-bold">
					{title}
					<span className="text-sky-600 px-2 text-2xl">▾</span>
				</h2>
			)}
		</section>
	);
}

export default SectionWithTitle;
