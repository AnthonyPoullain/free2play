type SortBy = 'release-date' | 'popularity' | 'alphabetical' | 'relevance';

class Games {
  static async getGames(filter: SortBy = 'relevance'): Promise<Game[] | null> {
    try {
      const res = await fetch(
        `${process.env.API_BASE_URL}/games${filter && '?sort-by=' + filter}`
      );
      const data = await res.json();
      /* const p1 = await new Promise((res) => setTimeout(() => res('p1'), 10000)); */
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getGamesByCategory(category: string): Promise<Game[] | null> {
    let categoryName = category.trim().toLowerCase().replaceAll(' ', '-');
    try {
      const res = await fetch(
        process.env.API_BASE_URL + `/games?category=${categoryName}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getGame(id: string): Promise<Game | null> {
    try {
      const res = await fetch(process.env.API_BASE_URL + `/game?id=${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return null;
    }
  }
}

export { Games };
