import { useNavigate } from "react-router";

export default function GameCard({ juego }) {
  const metacriticColor =
    juego.metacritic >= 90 ? "text-[#00ff88] border-[#00ff88]" :
    juego.metacritic >= 75 ? "text-[#ffd700] border-[#ffd700]" :
                             "text-[#ff6b6b] border-[#ff6b6b]";

  const navigate = useNavigate();

  return (
    <div key={juego.id} onClick={() => navigate(`/juegos/${juego.id}`)} className='relative bg-[#050508] border border-[#ffd7004b]  hover:scale-102 hover:border-primary cursor-pointer transition-transform duration-200'>
        <div className="relative w-full">
             <img src={juego.background_image} alt={juego.name} className='w-full h-48 object-cover' />
             <div className='absolute bottom-0 bg-linear-to-t from-[#050508] to-transparent w-full h-[50%]'/>
        </div>

        {juego.metacritic && (
            <p className={`absolute top-2 right-2 px-2 py-1 bg-[#050508] font-pixel text-[0.7rem] leading-relaxed border ${metacriticColor}`}>{juego.metacritic}</p>
        )}

        <div className='p-3 flex flex-col gap-3'>
            <h2 className='font-pixel text-[0.7rem] leading-relaxed text-primary'>{juego.name}</h2>
            <div className="flex items-center gap-2">
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
            {juego.genres?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                        {juego.genres.map((genre) => (
                            <span key={genre.id} className="border-1 border-[#333] text-secondary  text-[0.6rem] font-pixel px-2 py-1">
                                {genre.name}
                            </span>
                        ))}
                </div>
            )}

            <p className="font-inter text-xs text-secondary"> {new Date(juego.released).toLocaleDateString()}</p>
            
             <div className="flex flex-wrap gap-1">
                {juego.platforms?.map((p) => (
                    <span key={p.platform.id} className="text-secondary text-[0.6rem] font-Inter px-2 py-1 border-1 border-[#333]">
                        {p.platform.name}
                    </span>
                ))}
             </div>
        </div>
        
       
    </div>
  );
}