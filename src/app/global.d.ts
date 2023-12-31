type SystemRequirements = {
	os: string;
	processor: string;
	memory: string;
	graphics: string;
	storage: string;
};

type Screenshot = {
	id: number;
	image: string;
};

type Genre =
	| 'Anime'
	| 'Shooter'
	| 'MMOARPG'
	| 'Sci-fi'
	| 'Card'
	| 'ARPG'
	| 'Strategy'
	| 'MMORPG'
	| 'Fighting'
	| 'Action RPG'
	| 'Battle Royale'
	| 'MOBA'
	| 'Sports'
	| 'Racing'
	| 'MMO'
	| 'Social'
	| 'Fantasy';

type Game = {
	id: number;
	title: string;
	thumbnail: string;
	status?: string;
	short_description: string;
	description?: string;
	game_url: string;
	genre: Genre;
	platform: string;
	publisher: string;
	developer: string;
	release_date: string;
	freetogame_profile_url: string;
	minimum_system_requirements?: {
		os: string;
		processor: string;
		memory: string;
		graphics: string;
		storage: string;
	};
	screenshots?: [{ id: number; image: string }];
};
