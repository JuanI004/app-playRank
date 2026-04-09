import Game from "../models/GameModel.js";

export const cacheJuego = async (gameId, gameData) => {
  const existingGame = await Game.findOne({ gameId });

  if (existingGame) {
    const tiempoDesdeCache = Date.now() - existingGame.cachedAt.getTime();
    const sieteDias = 7 * 24 * 60 * 60 * 1000;

    if (tiempoDesdeCache < sieteDias) {
      return existingGame;
    }
  }

  const res = await fetch(
    `https://api.rawg.io/api/games/${gameId}?key=${process.env.RAWG_API_KEY}`,
  );
  if (!res.ok) {
    throw new Error(
      `Error al obtener datos del juego con ID ${gameId}: ${res.statusText}`,
    );
  }
  const data = await res.json();

  return await Game.findOneAndUpdate(
    { gameId },
    {
      gameId: data.id,
      name: data.name,
      background_image: data.background_image,
      metacritic: data.metacritic,
      rating: data.rating,
      ratings_count: data.ratings_count,
      released: data.released,
      genres: data.genres.map((g) => ({ id: g.id, name: g.name })),
      platforms: data.platforms.map((p) => ({
        platform: { id: p.platform.id, name: p.platform.name },
      })),
      cachedAt: Date.now(),
    },
    { upsert: true, returnDocument: "after" },
  );
};
