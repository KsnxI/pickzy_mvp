import { useNavigate, useParams } from 'react-router-dom'

import { places } from '../data/places'

export default function PlacePage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const place = places.find((item) => item.id === Number(id))

    if (!place) {
        return (
            <div className="min-h-screen bg-slate-50 px-4 py-10">
                <div className="mx-auto max-w-4xl">
                    <button
                        type="button"
                        onClick={() => navigate('/home')}
                        className="mb-6 text-sm font-bold text-blue-600 hover:text-blue-800"
                    >
                        ← Вернуться к рекомендациям
                    </button>

                    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Место не найдено
                        </h1>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <button
                    type="button"
                    onClick={() => navigate('/home')}
                    className="mb-6 text-sm font-bold text-slate-600 transition hover:text-blue-700"
                >
                    ← Вернуться к рекомендациям
                </button>

                <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="h-72 overflow-hidden sm:h-96">
                        <img
                            src={place.image}
                            alt={place.name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="text-sm font-bold text-blue-600">
                                    {place.category}
                                </p>

                                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                    {place.name}
                                </h1>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                                    ★ {place.rating}
                                </span>

                                <span className="text-lg font-bold text-slate-500">
                                    {place.price}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-500">
                            <span>📍</span>
                            <span>{place.address}</span>
                        </div>

                        <div className="mt-8 border-t border-slate-100 pt-8">
                            <h2 className="text-xl font-bold text-slate-900">
                                О месте
                            </h2>

                            <p className="mt-3 text-base leading-7 text-slate-500">
                                {place.description}
                            </p>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    )
}