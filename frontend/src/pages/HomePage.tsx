import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { logout } from '../api'
import FilterDropdown from '../components/FilterDropdown'
import Header from '../components/Header'
import PlaceCard from '../components/PlaceCard'
import { places } from '../data/places'
import type { User } from '../api'

type HomePageProps = {
    user: User
    onLogout: () => void
}

export default function HomePage({
                                     user,
                                     onLogout,
                                 }: HomePageProps) {
    const navigate = useNavigate()

    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState('')

    const filteredPlaces = useMemo(() => {
        return places.filter((place) => {
            const matchesCategory =
                !category || place.category === category

            const matchesPrice =
                !price || place.price === price

            const matchesRating =
                !rating || place.rating >= Number(rating)

            return (
                matchesCategory &&
                matchesPrice &&
                matchesRating
            )
        })
    }, [category, price, rating])

    function handleLogout() {
        logout()
        onLogout()
        navigate('/auth')
    }

    function resetFilters() {
        setCategory('')
        setPrice('')
        setRating('')
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Header onLogout={handleLogout} />

            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <section>
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-blue-600">
                                PICKZY
                            </p>

                            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                Рекомендации для вас
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                                Места и идеи для отдыха, которые можно
                                посмотреть прямо сейчас.
                            </p>

                            <p className="mt-2 text-sm font-medium text-slate-400">
                                Вы вошли как {user.email}
                            </p>
                        </div>

                        <FilterDropdown
                            category={category}
                            price={price}
                            rating={rating}
                            onCategoryChange={setCategory}
                            onPriceChange={setPrice}
                            onRatingChange={setRating}
                            onReset={resetFilters}
                        />
                    </div>
                </section>

                <section className="mt-8">
                    {filteredPlaces.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredPlaces.map((place) => (
                                <PlaceCard
                                    key={place.id}
                                    place={place}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                            <h2 className="text-xl font-bold text-slate-800">
                                Ничего не найдено
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Попробуйте изменить параметры фильтра.
                            </p>

                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                            >
                                Сбросить фильтры
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}