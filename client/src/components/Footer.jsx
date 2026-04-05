export default function Footer() {
    return (
        <footer className='flex flex-col items-center justify-center gap-6 w-full py-8 bg-[#050508] text-center border-t border-[#ffd90079] text-secondary font-inter text-xs'>
            <h1 className="font-pixel text-primary">PlayRank</h1>
            <p className="font-pixel text-[0.6rem]">&copy; {new Date().getFullYear()} PLAYRANK. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4 font-pixel">
                <a href="#" className="text-secondary text-[0.6rem] hover:text-[#aaaaaa96]">
                    Privacidad
                </a>
                <a href="#" className="text-secondary text-[0.6rem] hover:text-[#aaaaaa96]">
                    Terminos
                </a>
                <a href="#" className="text-secondary text-[0.6rem] hover:text-[#aaaaaa96]">
                    Contacto
                </a>
            </div>
        </footer>
    );
}

