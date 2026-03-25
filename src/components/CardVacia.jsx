export default function CardVacia() {
    return (
    <div className="flex flex-col bg-[#0a0a14] border border-[#ffffff08] animate-pulse">
      <div className="h-44 bg-[#ffffff06]" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 bg-[#ffffff06] w-3/4 rounded"/>
        <div className="h-3 bg-[#ffffff06] w-1/2 rounded"/>
        <div className="flex gap-1">
          <div className="h-4 w-12 bg-[#ffffff06] rounded"/>
          <div className="h-4 w-14 bg-[#ffffff06] rounded"/>
        </div>
      </div>
    </div>)
}