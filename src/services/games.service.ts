class Games {
  static async getGames(): Promise<Game[] | null> {
    const res = await fetch(process.env.API_BASE_URL + '/games');
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    /* const p1 = await new Promise((res) => setTimeout(() => res('p1'), 5000)); */
    return data;
  }

  static async getGamesByCategory(category: string): Promise<Game[] | null> {
    let categoryName = category.trim().toLowerCase().replaceAll(' ', '-');
    const res = await fetch(
      process.env.API_BASE_URL + `/games?category=${categoryName}`
    );
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data;
  }

  static async getGame(id: string): Promise<Game | null> {
    const res = await fetch(process.env.API_BASE_URL + `/game?id=${id}`);
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data;
  }
}

export { Games };
