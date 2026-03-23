export default function Header() {
    return (
        <header className="fixed py-5 px-10 bg-[#060509d7] top-0 left-0 right-0 flex items-center justify-between border-b border-[#ffd90079]">
            <h1 className="text-md font-pixel text-primary">PlayRank</h1>
                <nav className="text-xs">
                    <ul className="flex font-pixel  gap-10">
                        <li><a href="#" className="text-secondary hover:text-primary uppercase">Explorar</a></li>
                        <li><a href="#" className="text-secondary hover:text-primary uppercase">PlayList</a></li>
                        <li><a href="#" className="text-secondary hover:text-primary uppercase">Top 5</a></li>
                    </ul>
                </nav>
        </header>
    )
}