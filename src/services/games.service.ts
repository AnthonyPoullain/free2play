type SortBy = 'release-date' | 'popularity' | 'alphabetical' | 'relevance';

const opts = { next: { revalidate: 3600 } };

class Games {
  static async getGames(filter: SortBy = 'relevance'): Promise<Game[] | null> {
    try {
      const res = await fetch(
        `${process.env.API_BASE_URL}/games${filter && '?sort-by=' + filter}`,
        opts
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getGamesByCategory(category: string): Promise<Game[] | null> {
    let categoryName = category.trim().toLowerCase().replaceAll(' ', '-');
    try {
      const res = await fetch(
        process.env.API_BASE_URL + `/games?category=${categoryName}`,
        opts
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getGame(id: string): Promise<Game | null> {
    try {
      const res = await fetch(
        process.env.API_BASE_URL + `/game?id=${id}`,
        opts
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return null;
    }
  }
}

export { Games };
