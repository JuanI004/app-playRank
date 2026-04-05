import { useQuery } from "@tanstack/react-query";

export default function useFetchJuegos({
  search,
  genero,
  plataforma,
  orden,
  page,
  page_size,
}) {
  return useQuery({
    queryKey: ["juegos", search, genero, plataforma, orden, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        key: import.meta.env.VITE_RAWG_API_KEY,
        page_size: page_size ?? "20",
        page: page ?? 1,
        ordering: orden ?? "-metacritic",
      });
      if (search) params.set("search", search);
      if (genero) params.set("genres", genero);
      if (plataforma) params.set("platforms", plataforma);

      const res = await fetch(`https://api.rawg.io/api/games?${params}`);
      if (!res.ok) throw new Error("Error fetching games");
      return res.json();
    },
    keepPreviousData: true,
  });
}
