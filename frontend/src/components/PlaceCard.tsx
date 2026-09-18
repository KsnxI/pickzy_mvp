import type { Place } from '../data/places'

type PlaceCardProps = {
    place: Place
}

export default function PlaceCard({ place }: PlaceCardProps) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-52 overflow-hidden">
                <img
                    src={place.image}
                    alt={place.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
                    {place.category}
                </div>

                <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
                    ★ {place.rating}
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold tracking-tight text-slate-800">
                        {place.name}
                    </h3>

                    <span className="shrink-0 text-sm font-semibold text-slate-500">
                        {place.price}
                    </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    {place.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-500">
                    <span>📍</span>
                    <span>{place.address}</span>
                </div>

                <button
                    type="button"
                    className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                    Подробнее
                </button>
            </div>
        </article>
    )
}