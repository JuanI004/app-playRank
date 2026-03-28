import usePlaylist from "../hooks/usePlaylist"
import useRatings from "../hooks/useRatings"
import PlaylistCard from "../components/PlaylistCard";
import { useNavigate } from "react-router";

export default function Playlist() {
    const {playlist} = usePlaylist();
    const {getRating} = useRatings()
    const navigate = useNavigate()

    const cantRateados = playlist.filter((g) => getRating(g.id) > 0).length
    const ratingProm = cantRateados > 0 ? (playlist.filter((g) => 
        getRating(g.id) > 0)
        .reduce((prom, g) => prom + getRating(g.id), 0) / cantRateados).toFixed(1)
        : "-";
    const metacriticProm = (playlist.reduce((prom, g) => prom + g.metacritic, 0) / playlist.length).toFixed(0)


    const SECCIONES = [
        {
            label: "JUEGOS", 
            value: playlist.length,
            color: "#ffd700"
        },
        {
            label: "RATEADOS",
            value: cantRateados,
            color: "#00ff88"
        },
        {
            label: "METACRITIC PROMEDIO",
            value: metacriticProm,
            color: "#00ffff"
        },
        {
            label: "RATING PROMEDIO",
            value: ratingProm,
            color: "#ff6b6b"
        }
    ]

    return (
        <div className="w-screen min-h-screen bg-bg pt-[65px] pb-20">

            <main className="relative max-w-[1200px] mx-auto flex gap-10 flex-col p-4">
                <div className="flex w-full justify-between mt-10  ">
                    <div className="flex flex-col gap-4"> 
                        <h1 className='font-pixel text-[#00ffff] text-md text-shadow-[0_5px_35px_rgba(0,255,255,0.50)]'>{">> " + "PLAYLIST" + " <<"}</h1>
                        <h1 className="text-xs font-pixel uppercase text-secondary ">{playlist.length === 1 ? "1 JUEGO GUARDADO" : playlist.length + " JUEGOS GUARDADOS"}</h1>
                    </div>
                        <button onClick={() => navigate("/juegos")} className="font-pixel text-primary text-xs border border-primary py-4 w-50 cursor-pointer hover:bg-[#ffd90023] cursor pointer transition-colors"
                        style={{boxShadow:"4px 4px 0 #aa8800"}}
                        >+ AGREGAR MAS</button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
                    {SECCIONES.map((s) => (
                        <div className="bg-[#0a0a14] border p-6 border-[#202020a6]">
                            <h3 className="text-secondary font-pixel mb-4 text-xs">{s.label}</h3>
                            <h2 className={`font-pixel text-[1.6rem] text-[${s.color}]`}>{s.value}</h2>
                        </div>
                    ))}
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {playlist.map((g) => (
                        <PlaylistCard key={g.id} juego={g} rating={getRating(g.id)}/>
                    ))} 
                </div>
                
            </main>

        </div>
    )
}