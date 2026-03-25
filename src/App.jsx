import useTopGames from './hooks/useTopGames'
import GameCard from './components/GameCard';
import './App.css'

const CARACTERISTICAS = [ 
  {title:"RATEA", desc:"Dales tu puntaje a los juegos que jugaste. Tu voz importa." },
  {title:"TOP 5", desc:"Armá y compartí tu lista personal de los mejores juegos." },
  {title:"MOOD FINDER", desc:"Te recomendamos el juego perfecto según cómo te sentís hoy." },
  {title:"PRECIOS", desc:"Compará precios en Steam, Epic, GOG. Comprá donde conviene." },
  {title:"RANKINGS", desc:"Los más valorados por la comunidad en tiempo real." },
  {title:"COMUNIDAD", desc:"Conectá con otros gamers y descubrí joyas ocultas." },
]

function App() {
  const { data: topGames, isLoading, error } = useTopGames();
  return (
    <>
      <div className='scanlines relative min-h-screen w-screen bg-[url(assets/background.avif)] bg-cover bg-center '>
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[rgba(0,255,200,0.15)] z-5" 
            style={{animation:"scanline 4s linear infinite"}}/>
        <div className="absolute inset-0 background-radial " 
            style={{background:"radial-gradient(ellipse at center, transparent 1%, #050508 100%)"}}/>

        <main className='flex pt-[65px] min-h-screen w-screen flex-col items-center justify-center gap-4 relative z-10 text-center px-4'>
          <p className='py-2 px-4 text-xs text-center font-pixel uppercase  bg-[#07bf6633] border border-[#07bf65] text-[#07bf65]'>Insert coin to continue</p>
          <h1 className='text-[3rem] md:text-[4rem] font-pixel uppercase text-primary '
          style={{textShadow:"3px 3px 0 #000, 0 0 20px #ffd70088",
                  animation:"glitch 6s infinite"
          }}>Rate.<br/>Rank.<br/>Play.</h1>
          <p className='max-w-lg text-center font-inter text-secondary'>Rateá tus juegos favoritos, armá tu Top 5, descubrí qué jugar y encontrá los mejores precios.</p>
          <div className='flex gap-6'>
            <button className='py-4 px-8 bg-primary text-[#050508] text-xs font-pixel uppercase hover:bg-[#ffc400] hover:scale-105 transition-transform duration-200 cursor-pointer'
            style={{boxShadow:"4px 4px 0 #aa8800"}}>Empezar</button>
            <button className='py-4 px-8 border-2 border-primary text-primary text-xs font-pixel uppercase hover:bg-[#ffc400] cursor-pointer hover:text-[#050508] hover:scale-105 transition-transform duration-200'
            style={{boxShadow:"4px 4px 0 #aa8800"}}>Ver juegos</button>
          </div>
          <p className='font-pixel text-xs text-secondary mt-6' style={{animation: "blink 1s infinite step-end"}}>▼ SCROLL ▼</p>
          <div className='absolute bottom-0 bg-linear-to-t from-[#050508] to-transparent w-full h-[20%]'/>
        </main>
      </div>

      <section className='min-h-screen w-screen flex flex-col items-center justify-center p-20 bg-black'>
       <h1 className='font-pixel text-[#ff6b6b] text-xl text-shadow-[0_5px_35px_rgba(255,107,107,0.50)]'>{">> " + "CARACTERISTICAS" + " <<"}</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
          {CARACTERISTICAS.map((caracteristica, index) => (
            <div key={index} className='caracteristica flex flex-col items-center text-center p-7 bg-[#050508] border border-[#ffd7004b] hover:scale-102 transition-transform duration-200' >
              <h2 className='font-pixel text-md  text-primary'>{caracteristica.title}</h2>
              <p className='font-inter text-sm text-secondary mt-2'>{caracteristica.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='min-h-screen w-screen flex flex-col items-center justify-center p-20 bg-[#050508]'>
        <h1 className='font-pixel text-[#00ffff] text-xl text-shadow-[0_5px_35px_rgba(0,255,255,0.50)]'>{">> " + "TOP JUEGOS" + " <<"}</h1>
        {isLoading && <div className='w-10 h-10 border-1 border-primary border-t-0 border-r-0 animate-spin mt-10 rounded-full'/>}
        {error && <p className='text-red-500 mt-4'>Error al cargar juegos</p>}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
          {topGames && topGames.map((juego) => (
            
            <GameCard key={juego.id} juego={juego} />
          ))}
        </div>
      </section>

      <section className='relative min-h-[50vh] w-screen bg-[url(assets/background.avif)] bg-cover bg-center '>
        <div className='absolute top-0 bg-linear-to-b from-[#050508] to-transparent w-full h-[10%]'/>  
        <div className="absolute inset-0 background-radial " 
            style={{background:"radial-gradient(ellipse at center, #0505089f 1%, #050508 100%)"}}/>
        <div className='flex flex-col gap-4 items-center justify-center z-5 relative'>
          <h1 className='text-[2rem] font-pixel uppercase text-primary mt-20'
          style={{textShadow:"3px 3px 0 #000, 0 0 20px #ffd70088", animation:"glitch 6s infinite"}}>GAME OVER?</h1>
          <p className='font-pixel text-sm text-[#01fb7a] mt-2'>NO WAY.</p>
          <p className='font-inter text-md w-md text-center text-secondary mt-2'>
            Miles de gamers ya están rankeando sus juegos favoritos. Falta tu opinión
          </p>
          <button className='py-4 px-8 bg-primary text-[#050508] text-xs font-pixel uppercase cursor-pointer hover:bg-[#ffc400] hover:scale-105 transition-transform duration-200 cursor-pointer'
            style={{boxShadow:"4px 4px 0 #aa8800"}}>Play Now</button>
        </div>
      </section>  
    </>
  )
}

export default App
