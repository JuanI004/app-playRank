import { useRef } from "react";

export default function SearchBar({onSearch}) {
    const inputRef = useRef(null);

    return (
        <div className="flex items-center justify-center">
            <input type="text" placeholder="BUSCAR JUEGO..."
                className="bg-[#0a0a14] border border-[#ffd70033] border-r-0 text-[#aaa] font-pixel text-[8px] px-4 py-2 outline-none focus:border-[#ffd700] transition-colors w-72 placeholder:text-[#333]" ref={inputRef}/>
            <button onClick={() => onSearch(inputRef.current.value)} className="bg-primary hover:bg-[#ffd900a8] border border-[#ffd70033] border-l-0 cursor-pointer text-black font-pixel text-[8px] px-4 py-2 outline-none focus:border-[#ffd700] transition-colors">
                BUSCAR
            </button>
        </div>
    );
}