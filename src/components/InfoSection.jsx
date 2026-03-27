export default function InfoSection({ label, value }) {
    return (
        <div className="flex justify-between items-center border-b border-[#2b2b42] py-4">
                <p className="font-inter text-secondary text-sm">{label}</p>
                <p className="font-pixel text-secondary text-xs">{value}</p>
        </div>
    )
}