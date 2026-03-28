import { useParams } from "react-router"
import { useState } from "react"
import useFetchPrecios from "../hooks/useFetchPrecios"

export default function Precios() {
  const { nombreJuego } = useParams()
  const [orden, setOrden] = useState("PRECIO ↑")
  const { precios, info, tiendas, cheapestPrice, isLoading, error } = useFetchPrecios({ nombreJuego })

  const preciosOrdenados = precios?.deals ? [...precios.deals].sort((a, b) => {
    if (orden === "PRECIO ↑") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (orden === "PRECIO ↓") {
      return parseFloat(b.price) - parseFloat(a.price);
    } else if (orden === "TIENDA A-Z") {
      const tiendaA = tiendas?.find(t => t.storeID === a.storeID)?.storeName || "";
      const tiendaB = tiendas?.find(t => t.storeID === b.storeID)?.storeName || "";
      return tiendaA.localeCompare(tiendaB);
    }
  }) : [];

  const normalPrice = precios?.deals ? Math.max(...precios.deals.map(deal => parseFloat(deal.retailPrice))) : null;
  
  return (
    <div className="w-screen min-h-screen bg-bg pt-[65px] pb-20">

      <main className="relative max-w-[1200px] mx-auto flex flex-col gap-4">
        <div className="flex w-full justify-between mt-10 p-4">
          <div className="flex flex-col gap-4"> 
            <button onClick={() => window.history.back()} className="font-pixel text-primary text-xs border border-primary py-4 w-30 cursor-pointer hover:bg-[#ffd90023] cursor pointer transition-colors">VOLVER</button>
            <h1 className='font-pixel text-[#00ffff] text-md text-shadow-[0_5px_35px_rgba(0,255,255,0.50)]'>{">> " + "PRECIOS" + " <<"}</h1>
            <h1 className="text-lg font-pixel uppercase text-white ">{nombreJuego}</h1>
          </div>

          {cheapestPrice && normalPrice && 
            <div className="flex flex-col gap-2 bg-[#0a0a14] border p-2 border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.2)] flex justify-center items-center">
              <p className="font-pixel text-secondary text-xs p-2 ">Mejor Precio</p>
              <h1 className="text-xl font-pixel text-[#00ff88]">${cheapestPrice?.toFixed(2)}</h1>
              <p className="text-md font-pixel font-Inter text-[#525252] line-through">${normalPrice?.toFixed(2)}</p>
            </div>
          }
          
        </div>
        {precios?.deals.length > 0 && !error ? 
          <>
            <div className="flex flex-wrap mt-2 gap-4 p-4">
              <p className="font-Inter text-secondary">Ordenar:</p>
              {["PRECIO ↑", "PRECIO ↓", "TIENDA A-Z"].map(option => (
                <button key={option} 
                onClick={() => setOrden(option)}
                className="font-pixel text-[12px] px-3 py-1.5 border cursor-pointer border-secondary text-secondary hover:bg-secondary hover:text-bg transition-colors">
                  {option}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 p-4">
              {preciosOrdenados.map((deal, index) => {
                const tienda = tiendas?.find(t => t.storeID === deal.storeID);
                const descuento = deal.retailPrice ? ((deal.retailPrice - parseFloat(deal.price)) / normalPrice) * 100 : 100;
                const mejorPrecio = deal.price - cheapestPrice === 0;
                
                return (
                  <div key={deal.dealID} className={`flex flex-col md:h-30 md:flex-row  gap-4 hover:-translate-x-2 transition-all items-center border ${mejorPrecio ? "border-[#00ff88] bg-[#00ff8810]" : "border-[#ffffff08] bg-[#0a0a14] hover:border-[#ffd9004d]"} p-4`}>
                    <div className="flex items-center gap-4 ">
                      <p className={`font-pixel  ${mejorPrecio ? "text-[#00ff88]" : "text-secondary"}`}>{index + 1}.</p>
                      <img src={`https://www.cheapshark.com${tienda?.images?.logo}`} alt={tienda?.storeName} className="w-12" />
                      <h2 className="font-pixel text-secondary text-sm">{tienda?.storeName}</h2>
                    </div>
                    <div className="flex w-[40%] flex-col  md:ml-auto items-center md:items-baseline gap-1">

                      <div className="flex items-center gap-2">
                        <h1 className={`text-lg font-pixel ${mejorPrecio ? "text-[#00ff88]" : "text-primary"}`}>${parseFloat(deal.price).toFixed(2)}</h1>
                       {descuento > 0 && ( 
                          <>
                            <p className="text-md font-pixel font-Inter text-[#525252] line-through">${parseFloat(deal.retailPrice).toFixed(2)}</p>
                            <p className="text-xs border text-center p-1 border-[#00ff88] bg-[#00ff8810] font-pixel text-[#00ff88]">-{descuento.toFixed(0)}%</p>
                          </>
                        )}
                      </div>
                      
                      <div className="w-full h-2 bg-[#ffffff08] mt-1.5">
                      <div className={`h-full ${mejorPrecio ? "bg-[#00ff88]" : "bg-[#ffd700]"} transition-all duration-500`}
                        style={{ width: `${100 - descuento}%` }} />
                      </div>

                    </div>
                    <a href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`} target="_blank" rel="noopener noreferrer" 
                    className={`py-2 px-6 h-[46px] flex justify-center items-center border-2 ${mejorPrecio ? "border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]" : "border-primary text-primary hover:bg-[#ffc400]"} text-xs  hover:text-bg font-pixel uppercase  cursor-pointer   duration-200`}
                    style={{boxShadow:`4px 4px 0 ${mejorPrecio ? "#00ff8845" : "#aa8800"}`}}
                    >
                      IR
                    </a>
                  </div>
                )
              })}

            </div>
          </>
          
        : isLoading ? <>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex animate-pulse items-center gap-4 border border-[#ffffff08] bg-[#0a0a14] p-4">
              <div className="h-12 w-12 bg-[#ffffff08]" />
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-1/3 bg-[#ffffff08]" />
                <div className="h-6 w-1/4 bg-[#ffffff08]" />
                <div className="h-2 w-full bg-[#ffffff08] mt-1.5" />
              </div>
              <div className="h-[46px] w-[80px] bg-[#ffffff08]" />
            </div>
          ))}
        </>
        
        :<p className="font-pixel text-secondary p-4">No se encontraron precios para este juego.</p>
        }  

      </main>

      
    </div>
  )
}