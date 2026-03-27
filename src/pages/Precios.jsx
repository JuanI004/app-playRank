import { useParams } from "react-router"
import useFetchPrecios from "../hooks/useFetchPrecios"

export default function Precios() {
  const { nombreJuego } = useParams()
  const { precios, info, tiendas, cheapestPrice, isLoading, error } = useFetchPrecios({ nombreJuego })

  const normalPrice = precios?.deals ? Math.max(...precios.deals.map(deal => parseFloat(deal.retailPrice))) : null;
  
  return (
    <div className="w-screen min-h-screen bg-bg pt-[65px] pb-20">

      <main className="relative max-w-[1200px] mx-auto flex flex-col gap-4">
        <div className="flex w-full justify-between mt-10 p-4">
          <div className="flex flex-col gap-4"> 
            <button onClick={() => window.history.back()} className="font-pixel text-primary text-xs border border-primary py-4 w-30 hover:bg-[#ffd90023] cursor pointer transition-colors">VOLVER</button>
            <h1 className='font-pixel text-[#00ffff] text-md text-shadow-[0_5px_35px_rgba(0,255,255,0.50)]'>{">> " + "PRECIOS" + " <<"}</h1>
            <h1 className="text-lg font-pixel uppercase text-white ">{nombreJuego}</h1>
          </div>

          <div className="flex flex-col gap-2 bg-[#0a0a14] border p-2 border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.2)] flex justify-center items-center">
            <p className="font-pixel text-secondary text-xs p-2 ">Mejor Precio</p>
            <h1 className="text-xl font-pixel text-[#00ff88]">${cheapestPrice?.toFixed(2)}</h1>
            <p className="text-md font-pixel font-Inter text-[#525252] line-through">${normalPrice?.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex flex-wrap mt-2 gap-4 p-4">
        <p className="font-Inter text-secondary">Ordenar:</p>
        <button className="font-pixel text-[12px] px-3 py-1.5 border cursor-pointer border-secondary text-secondary transition-colors">PRECIO ↑</button>
        <button className="font-pixel text-[12px] px-3 py-1.5 border cursor-pointer border-secondary text-secondary transition-colors">DESCUENTO ↓</button>
        <button className="font-pixel text-[12px] px-3 py-1.5 border cursor-pointer border-secondary text-secondary transition-colors">TIENDA A-Z</button>
      </div>

      <div className="flex flex-col gap-2">
        {precios?.deals.map((deal) => {
          const tienda = tiendas?.find(t => t.storeID === deal.storeID);
          return (
            <div key={deal.dealID} className="flex flex-col md:flex-row md:justify-between gap-2 items-center bg-[#0a0a14] border border-[#ffffff08] p-4">
              <div className="flex items-center gap-4">
                <img src={`https://www.cheapshark.com${tienda?.images?.logo}`} alt={tienda?.storeName} className="w-12" />
                <h2 className="font-pixel text-primary text-sm">{tienda?.storeName}</h2>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="font-pixel text-secondary text-xs">Precio</p>
                <h1 className="text-lg font-pixel text-[#00ff88]">${parseFloat(deal.price).toFixed(2)}</h1>
                <p className="text-md font-pixel font-Inter text-[#525252] line-through">${parseFloat(deal.retailPrice).toFixed(2)}</p>
              </div>
              <a href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`} target="_blank" rel="noopener noreferrer" className='py-2 px-6 border-2 bg-primary text-bg text-xs font-pixel uppercase hover:bg-[#ffc400] cursor-pointer hover:text-bg  duration-200'
              style={{boxShadow:"4px 4px 0 #aa8800"}}
              >
                IR A LA TIENDA
              </a>
            </div>
          )
        })}

      </div>

      </main>

      
    </div>
  )
}