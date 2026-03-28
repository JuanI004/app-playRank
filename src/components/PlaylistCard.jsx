import { useNavigate } from "react-router";


export default function PlaylistCard({ juego, rating = 0 }) {
  const metacriticColor =
    juego.metacritic >= 90 ? "text-[#00ff88] border-[#00ff88]" :
    juego.metacritic >= 75 ? "text-[#ffd700] border-[#ffd700]" :
                             "text-[#ff6b6b] border-[#ff6b6b]";

  const navigate = useNavigate();

  const esDePC = juego.platforms?.some(p => p.platform.name.toLowerCase().includes("pc") || p.platform.name.toLowerCase().includes("steam"))

  return (
    <div key={juego.id} className='relative bg-[#050508] border border-[#ffd7004b]  hover:scale-102 transition-transform duration-200 flex flex-col'>
        <div className="relative w-full">
             <img src={juego.background_image} alt={juego.name} className='w-full h-48 object-cover' />
             <div className='absolute bottom-0 bg-linear-to-t from-[#050508] to-transparent w-full h-[50%]'/>
        </div>

        {juego.metacritic && (
            <p className={`absolute top-2 right-2 px-2 py-1 bg-[#050508] font-pixel text-[0.7rem] leading-relaxed border ${metacriticColor}`}>{juego.metacritic}</p>
        )}
        <div className="flex flex-col gap-3 p-3 flex-1">
            <div className=' flex flex-col gap-3'>
                <h2 className='font-pixel text-[0.7rem] leading-relaxed text-primary'>{juego.name}</h2>

                {juego.genres?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                            {juego.genres.map((genre) => (
                                <span key={genre.id} className="border-1 border-[#333] text-secondary  text-[0.6rem] font-pixel px-2 py-1">
                                    {genre.name}
                                </span>
                            ))}
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <p className="font-pixel text-[0.5rem] text-secondary">COMUNIDAD</p>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                        <span
                            key={s}
                            className="text-sm"
                            style={{ color: s <= Math.round(juego.rating) ? "#ffd700" : "#333" }}
                        >★</span>
                        ))}
                    </div>
                    <span className="font-inter text-xs text-secondary">
                        {juego.rating?.toFixed(1)} ({juego.ratings_count?.toLocaleString()} votos)
                    </span>
                </div>

                {rating > 0 ? (
                    <div className="flex items-center gap-2">
                    <p className="font-pixel text-[0.5rem] text-secondary">MI RATING</p>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                        <span
                            key={s}
                            className="text-sm"
                            style={{ color: s <= rating ? "#ffd700" : "#333" }}
                        >★</span>
                        ))}
                    </div>
                </div>
                ): 
                <p className="font-pixel text-[0.5rem] text-[#5c5c5c]">SIN RATING</p>  
                }           
            </div>
        
            <div className="flex gap-2 w-full mt-auto ">
                <button onClick={() => navigate(`/juegos/${juego.id}`)} className="w-full font-pixel text-primary  text-[0.6rem] border  py-2 cursor-pointer border-primary  ursor hover:bg-[#ffd90023] pointer transition-colors">
                    VER
                </button>
                {esDePC &&
                    <button onClick={() => navigate(`/precios/${encodeURIComponent(juego.name)}`)} className="w-full font-pixel text-[#00ffff] text-[0.6rem] border border-[#00ffff]  py-2  cursor-pointer hover:bg-[#00ffff1c]  cursor pointer transition-colors">
                         PRECIOS
                    </button>
                }
                <button onClick={() => window.history.back()} className="w-[40%] font-pixel text-[#ff6b6b] text-xs border border-[#ff6b6b] py-2  cursor-pointer hover:bg-[#ff6b6b23] cursor pointer transition-colors">
                    X
                </button>
            </div>
        
        </div>
        
    </div>
  );
}