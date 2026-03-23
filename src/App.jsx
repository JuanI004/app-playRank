import Header from './components/Header'
import './App.css'

function App() {


  return (
    <>
      <div className='scanlines absolute h-screen w-screen bg-[url(assets/background.avif)] bg-cover bg-center brightness-40 -z-1'/>
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[rgba(0,255,200,0.15)] z-5" 
          style={{animation:"scanline 4s linear infinite"}}/>
      <Header />
      <main className='flex h-screen w-screen flex-col items-center justify-center gap-4'>
        <p className='py-2 px-4 text-xs text-center font-pixel uppercase  bg-[#07bf6633] border border-[#07bf65] text-[#07bf65]'>Insert coin to continue</p>
        <h1 className='text-[4rem] font-pixel uppercase text-primary '
        style={{textShadow:"3px 3px 0 #000, 0 0 20px #ffd70088",
                animation:"glitch 6s infinite"
        }}>Rate.<br/>Rank.<br/>Play.</h1>
        <p className='max-w-lg text-center font-inter text-secondary'>Rateá tus juegos favoritos, armá tu Top 5, descubrí qué jugar y encontrá los mejores precios.</p>
        <div className='flex gap-6'>
          <button className='py-4 px-8 bg-[#ffd700] text-[#050508] text-xs font-pixel uppercase hover:bg-[#ffc400]'
          style={{boxShadow:"4px 4px 0 #aa8800"}}>Empezar</button>
          <button className='py-4 px-8 border-2 border-[#ffd700] text-[#ffd700] text-xs font-pixel uppercase hover:bg-[#ffc400]'
          style={{boxShadow:"4px 4px 0 #aa8800"}}>Ver juegos</button>
        </div>
      </main>
    </>
  )
}

export default App
