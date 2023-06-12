import axios from 'axios';

class Games {
	static async getGames(): Promise<Game[] | null> {
		if (!process.env.API_BASE_URL) console.error('Missing API_BASE_URL');
		try {
			const response = await axios.get(
				process.env.API_BASE_URL + '/games'
			);
			return response.data;
		} catch (error) {
			console.error('An error occured while fetching');
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
