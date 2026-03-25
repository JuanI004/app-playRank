import { useQuery } from '@tanstack/react-query'
 
export default function useTopGames () {
    return useQuery({
      queryKey: ['top-games'],
      queryFn: async () => {
        const today = new Date().toISOString().split('T')[0];
        const params = new URLSearchParams({
          key: import.meta.env.VITE_RAWG_API_KEY,
          metacritic: '95,100',
          dates: `2015-01-01,${today}`,
          page_size: '6',
          ordering: "-metacritic",
        });
        const response = await fetch(`https://api.rawg.io/api/games?${params}`);
        if (!response.ok) {
          throw new Error('Error fetching top games');
        }
        const data = await response.json();
        return data.results;
        }
      })};