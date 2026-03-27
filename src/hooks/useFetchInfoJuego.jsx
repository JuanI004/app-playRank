import { useQuery } from "@tanstack/react-query";


async function fetcher(url) {
    const res = await fetch(`${url}?key=${import.meta.env.VITE_RAWG_API_KEY}`);
    if (!res.ok) throw new Error('Error fetching data');
    return res.json();
}
export default function useFetchInfoJuego({ idJuego }) {
    const juego =  useQuery({
        queryKey: ['juego', idJuego],
        queryFn: () => fetcher(`https://api.rawg.io/api/games/${idJuego}`)
    })

    const screenshots = useQuery({
        queryKey: ['screenshots', idJuego],
        queryFn: () => fetcher(`https://api.rawg.io/api/games/${idJuego}/screenshots`)
    })

    return { juego, screenshots: screenshots.data?.results ?? [],  isLoading: juego.isLoading || screenshots.isLoading, error: juego.error || screenshots.error  };

}