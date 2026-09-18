type HeaderProps = {
    onLogout: () => void
}

export default function Header({ onLogout }: HeaderProps) {
    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex min-h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-700 text-lg font-extrabold text-white shadow-lg shadow-blue-900/15">
                        P
                    </div>

                    <span className="text-xl font-extrabold tracking-tight text-slate-800">
                        Pickzy
                    </span>
                </div>

                <button
                    type="button"
                    onClick={onLogout}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                >
                    Выйти
                </button>
            </div>
        </header>
    )
}