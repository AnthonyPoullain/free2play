import axios from 'axios';

class Games {
	static async getGames(): Promise<Game[] | null> {
		if (!process.env.API_BASE_URL) console.error('Missing API_BASE_URL');
		try {
			const response = await axios.get(
				process.env.API_BASE_URL + '/games'
			);
			/* const genres = response.data.map((game: Game) =>
game.platform.trim()
);
console.log([...new Set(genres)]); */
			return response.data;
		} catch (error) {
			console.error('An error occured while fetching');
		}
		return null;
	}

	static async getGamesByCategory(category: string): Promise<Game[] | null> {
		let categoryName = category.trim().toLowerCase().replaceAll(' ', '-');
		if (!process.env.API_BASE_URL) console.error('Missing API_BASE_URL');
		try {
			const response = await axios.get(
				process.env.API_BASE_URL + `/games?category=${categoryName}`
			);
			return response.data;
		} catch (error) {
			console.error(
				'An error occured while fetching. Possibly invalid category or tag name.'
			);
		}
		return null;
	}

	static async getGame(id: string): Promise<Game | null> {
		if (!process.env.API_BASE_URL) console.error('Missing API_BASE_URL');
		try {
			const response = await axios.get(
				process.env.API_BASE_URL + `/game?id=${id}`
			);
			return response.data;
		} catch (error) {
			console.error('An error occured while fetching');
		}
		return null;
	}
}

export { Games };
