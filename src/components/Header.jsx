export default function Header() {
    return (
        <header className="fixed py-5 px-10 bg-[#060509d7] top-0 left-0 right-0 flex items-center justify-between border-b border-[#ffd90079] z-30">
            <a href="/" className="text-md hover:scale-105 hover:text-shadow-[0_0_15px_#ffd9005b] transition-all font-pixel text-primary">PlayRank</a>
                <nav className="text-xs">
                    <ul className="flex font-pixel  gap-10">
                        <li><a href="/juegos" className="text-secondary hover:text-primary uppercase">Explorar</a></li>
                        <li><a href="/playlist" className="text-secondary hover:text-primary uppercase">PlayList</a></li>
                        <li><a href="/top-5" className="text-secondary hover:text-primary uppercase">Top 5</a></li>
                    </ul>
                </nav>
        </header>
    )
}