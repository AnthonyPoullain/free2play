import { SectionWithTitle } from '@/src/components';

export default async function loading() {
	return (
		<div className="md:text-left md:items-start flex flex-col items-center text-center">
			<h1 className="md:text-left mt-4 mb-12 text-3xl font-bold text-center"></h1>
			<div className="w-96 h-52 mb-4 rounded-md"></div>
			<SectionWithTitle title="Screenshots" border={true}>
				<div className="grid grid-cols-4 gap-2">
					{Array(4)
						.fill(null)
						.map(() => null)}
				</div>
			</SectionWithTitle>
			<SectionWithTitle title="About..."></SectionWithTitle>
			<SectionWithTitle title={`More Free games...`} border={true}>
				<div className="grid grid-cols-4 gap-2">
					{Array(4)
						.fill(null)
						.map(() => null)}
				</div>
			</SectionWithTitle>
		</div>
	);
}
