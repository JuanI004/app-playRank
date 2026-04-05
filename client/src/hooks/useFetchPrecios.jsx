import { useQuery } from "@tanstack/react-query";

export default function useFetchPrecios({nombreJuego}) {
    const games = useQuery({
        queryKey: ['precios', nombreJuego],
        queryFn: async () => {
          const params = new URLSearchParams({
            title: nombreJuego,
            exact: 0,
            limit: 5,
          });
          const response = await fetch(`https://www.cheapshark.com/api/1.0/games?${params}`);
          if (!response.ok) throw new Error('Error fetching prices');
          const data = await response.json();
          return data;
        },
        enabled: !!nombreJuego,
    });

    const id = games.data?.[0]?.gameID;

    const precios = useQuery({
        queryKey: ['precios-detalles', id],
        queryFn: async () => {
          if (!id) return null;
          const response = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${id}`);
          if (!response.ok) throw new Error('Error fetching price details');
          const data = await response.json();
          return data;
        },
        enabled: !!id,
    });

    const tiendas = useQuery({
        queryKey: ['tiendas'],
        queryFn: async () => {
          const response = await fetch(`https://www.cheapshark.com/api/1.0/stores`);
          if (!response.ok) throw new Error('Error fetching stores');
          const data = await response.json();
          return data;
        },
    });

    const cheapestPrice = precios.data?.deals ? Math.min(...precios.data.deals.map(deal => parseFloat(deal.price))) : null;

    return {
        precios: precios.data,
        tiendas: tiendas.data,
        info: precios.data?.info,
        cheapestPrice,
        isLoading: games.isLoading || precios.isLoading || tiendas.isLoading,
        error: games.error || precios.error,
    };

}