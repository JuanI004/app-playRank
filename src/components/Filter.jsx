export default function Filter({label, items, onSelect}) {
    return (
    <div className="flex items-center gap-2">
        <p className="font-pixel text-[9px] uppercase text-secondary">{label}:</p>
        <select className="bg-[#0a0a14] border border-[#ffd70033] text-[#aaa]  px-4 py-2 outline-none focus:border-[#ffd700] transition-colors">
            {items.map((item) => (
                <option key={item.label} value={item.value} onClick={() => onSelect(item.value)}>
                    {item.label}
                </option>
            ))}
        </select>
    </div>
        
    )
}