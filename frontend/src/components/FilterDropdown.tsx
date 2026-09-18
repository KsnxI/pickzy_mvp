import { useState } from 'react'

type FilterDropdownProps = {
    category: string
    price: string
    rating: string
    onCategoryChange: (value: string) => void
    onPriceChange: (value: string) => void
    onRatingChange: (value: string) => void
    onReset: () => void
}

export default function FilterDropdown({
                                           category,
                                           price,
                                           rating,
                                           onCategoryChange,
                                           onPriceChange,
                                           onRatingChange,
                                           onReset,
                                       }: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((value) => !value)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
            >
                Фильтры
                <span
                    className={`transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                >
                    ▾
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-30 mt-3 w-[min(92vw,380px)] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-slate-800">
                                Фильтры
                            </h3>

                            <p className="mt-1 text-xs text-slate-400">
                                Настройте подборку мест
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        >
                            ×
                        </button>
                    </div>

                    <div className="mt-6">
                        <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                            Категория
                        </p>

                        <select
                            value={category}
                            onChange={(event) =>
                                onCategoryChange(event.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        >
                            <option value="">Все категории</option>
                            <option value="Кофейня">Кофейни</option>
                            <option value="Ресторан">Рестораны</option>
                            <option value="Бар">Бары</option>
                            <option value="Парк">Парки</option>
                            <option value="Кино">Кино</option>
                        </select>
                    </div>

                    <div className="mt-5">
                        <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                            Рейтинг
                        </p>

                        <select
                            value={rating}
                            onChange={(event) =>
                                onRatingChange(event.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        >
                            <option value="">Любой рейтинг</option>
                            <option value="4">4.0+</option>
                            <option value="4.5">4.5+</option>
                            <option value="4.8">4.8+</option>
                        </select>
                    </div>

                    <div className="mt-5">
                        <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                            Цена
                        </p>

                        <select
                            value={price}
                            onChange={(event) =>
                                onPriceChange(event.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        >
                            <option value="">Любая цена</option>
                            <option value="₽">₽</option>
                            <option value="₽₽">₽₽</option>
                            <option value="₽₽₽">₽₽₽</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={onReset}
                        className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                    >
                        Сбросить фильтры
                    </button>
                </div>
            )}
        </div>
    )
}